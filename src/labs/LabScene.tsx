'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { hole, railHole, COLS, PITCH } from './coords';
import {
  buildBreadboard,
  buildDip14,
  buildLed,
  buildResistor,
  buildCapacitor,
  buildWire,
} from './geometry/index';
import {
  type Circuit,
  type ComponentInstance,
  type PinRef,
  type TiePin,
  type RailPin,
  type IcPin,
  type PassivePin,
  type LedPin,
} from './types';

// ── PinRef → THREE.Vector3 ────────────────────────────────────────────────
// Typed dispatch — no regex, no string parsing.
function resolvePin(pin: PinRef, all: ComponentInstance[]): THREE.Vector3 | null {

  // Tie point: exact hole position
  if ('col' in pin && 'row' in pin && 'board' in pin) {
    return hole((pin as TiePin).col, (pin as TiePin).row);
  }

  // Rail
  if ('rail' in pin) {
    const rp = pin as RailPin;
    const railMap = {
      vcc_top: 'top_red', gnd_top: 'top_blue',
      vcc_bot: 'bot_red', gnd_bot: 'bot_blue',
    } as const;
    return railHole(rp.col, railMap[rp.rail]);
  }

  // IC pin — resolve from the IC's mountedAt column
  if ('ic' in pin) {
    const ip   = pin as IcPin;
    const inst = all.find(c => c.id === ip.ic);
    if (!inst || !('mountedAt' in inst)) return null;
    const col  = inst.mountedAt.col;
    // Standard gate pinout (pin 1=A, 2=B, 3=Y for each gate)
    if (ip.pin === 'A' || ip.pin === '1A') return hole(col,     'e');
    if (ip.pin === 'B' || ip.pin === '1B') return hole(col + 1, 'e');
    if (ip.pin === 'Y' || ip.pin === '1Y') return hole(col + 2, 'e');
    if (ip.pin === '2A') return hole(col + 3, 'e');
    if (ip.pin === '2B') return hole(col + 4, 'e');
    if (ip.pin === '2Y') return hole(col + 5, 'e');
    return null;
  }

  // Passive pin (resistor, capacitor): p1=left lead, p2=right lead (+3 cols)
  if ('component' in pin) {
    const pp   = pin as PassivePin;
    const inst = all.find(c => c.id === pp.component);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return pp.end === 'p1' ? hole(col, row) : hole(col + 3, row);
  }

  // LED pin
  if ('led' in pin) {
    const lp   = pin as LedPin;
    const inst = all.find(c => c.id === lp.led);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return lp.end === 'anode' ? hole(col, row) : hole(col + 1, row);
  }

  return null;
}

// ── Component placement ───────────────────────────────────────────────────
function buildInstance(inst: ComponentInstance, all: ComponentInstance[]): THREE.Group | null {
  switch (inst.type) {

    case 'breadboard':
      return buildBreadboard(COLS);

    case 'xor-gate':
    case 'and-gate':
    case 'or-gate':
    case 'not-gate':
    case 'nand-gate':
    case 'nor-gate': {
      const label = inst.type === 'xor-gate'  ? 'XOR'
                  : inst.type === 'and-gate'   ? 'AND'
                  : inst.type === 'or-gate'    ? 'OR'
                  : inst.type === 'not-gate'   ? 'NOT'
                  : inst.type === 'nand-gate'  ? 'NAND' : 'NOR';
      return buildDip14(inst.mountedAt.col, label);
    }

    case 'resistor': {
      const { col, row } = inst.mountedAt;
      return buildResistor(hole(col, row), hole(col + 3, row), inst.ohms);
    }

    case 'capacitor': {
      const { col, row } = inst.mountedAt;
      return buildCapacitor(hole(col, row), hole(col + 1, row), inst.capacitance);
    }

    case 'led': {
      const { col, row } = inst.mountedAt;
      return buildLed(hole(col, row), hole(col + 1, row), inst.color);
    }

    case 'wire': {
      const from = resolvePin(inst.from, all);
      const to   = resolvePin(inst.to,   all);
      if (!from || !to) return null;
      return buildWire(from, to, inst.color);
    }

    // Not yet rendered — return null (handled gracefully)
    case 'potentiometer':
    case 'push-button':
    case 'switch':
    case 'battery':
    case 'dc-jack':
      return null;

    default:
      return null;
  }
}

// ── React component ───────────────────────────────────────────────────────
type Props = { circuit: Circuit; activeStepIndex: number };

export function LabSceneCanvas({ circuit, activeStepIndex }: Props) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const meshMapRef = useRef<Map<string, THREE.Group>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xf7f6f3, 1);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 6.0, 6.0);
    camera.lookAt(0, 0, 0);

    const pivot = new THREE.Group();
    pivot.rotation.x = 0.35;
    scene.add(pivot);

    const map = new Map<string, THREE.Group>();
    for (const inst of circuit.components) {
      const g = buildInstance(inst, circuit.components);
      if (g) {
        g.visible = false;
        pivot.add(g);
        map.set(inst.id, g);
      }
    }
    meshMapRef.current = map;

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let dragging = false, lx = 0, ly = 0, ry = 0, rx = 0.35;
    const onDown = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      ry += (e.clientX - lx) * 0.010;
      rx += (e.clientY - ly) * 0.006;
      rx = Math.max(-0.1, Math.min(1.0, rx));
      lx = e.clientX; ly = e.clientY;
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);

    let raf: number;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (!dragging) ry += 0.003;
      pivot.rotation.y = ry;
      pivot.rotation.x = rx;
      renderer.render(scene, camera);
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuit.id]);

  useEffect(() => {
    const step = circuit.steps[activeStepIndex];
    if (!step) return;
    const visible = new Set(step.show);
    for (const [id, g] of meshMapRef.current) g.visible = visible.has(id);
  }, [circuit, activeStepIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
    />
  );
}
