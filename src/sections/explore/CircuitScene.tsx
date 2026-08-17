'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { ALL_CIRCUITS } from '@/labs/circuits/index';
import {
  buildBreadboard,
  buildDip14,
  buildResistor,
  buildLed,
  buildWire,
  buildCapacitor,
} from '@/labs/geometry/index';
import { hole, railHole, COLS } from '@/labs/coords';
import {
  type Circuit,
  type ComponentInstance,
  type PinRef,
  type TiePin,
  type RailPin,
  type IcPin,
  type PassivePin,
  type LedPin,
} from '@/labs/types';

// ── Pin resolver ─────────────────────────────────────────────────────────
function resolvePin(pin: PinRef, all: ComponentInstance[]): THREE.Vector3 | null {
  if ('col' in pin && 'row' in pin && 'board' in pin)
    return hole((pin as TiePin).col, (pin as TiePin).row);

  if ('rail' in pin) {
    const rp = pin as RailPin;
    const m = {
      vcc_top: 'top_red',
      gnd_top: 'top_blue',
      vcc_bot: 'bot_red',
      gnd_bot: 'bot_blue',
    } as const;
    return railHole(rp.col, m[rp.rail]);
  }

  if ('ic' in pin) {
    const ip = pin as IcPin;
    const inst = all.find((c) => c.id === ip.ic);
    if (!inst || !('mountedAt' in inst)) return null;
    const col = inst.mountedAt.col;
    if (ip.pin === 'A' || ip.pin === '1A') return hole(col, 'e');
    if (ip.pin === 'B' || ip.pin === '1B') return hole(col + 1, 'e');
    if (ip.pin === 'Y' || ip.pin === '1Y') return hole(col + 2, 'e');
    if (ip.pin === '2A') return hole(col + 3, 'e');
    if (ip.pin === '2B') return hole(col + 4, 'e');
    if (ip.pin === '2Y') return hole(col + 5, 'e');
    return null;
  }

  if ('component' in pin) {
    const pp = pin as PassivePin;
    const inst = all.find((c) => c.id === pp.component);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return pp.end === 'p1' ? hole(col, row) : hole(col + 3, row);
  }

  if ('led' in pin) {
    const lp = pin as LedPin;
    const inst = all.find((c) => c.id === lp.led);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return lp.end === 'anode' ? hole(col, row) : hole(col + 1, row);
  }

  return null;
}

// ── Build a full circuit group ────────────────────────────────────────────
function buildCircuitGroup(circuit: Circuit): THREE.Group {
  const pivot = new THREE.Group();
  pivot.rotation.x = 0.3;

  for (const inst of circuit.components) {
    let g: THREE.Group | null = null;

    switch (inst.type) {
      case 'breadboard':
        g = buildBreadboard(COLS);
        break;
      case 'xor-gate':
        g = buildDip14(inst.mountedAt.col, 'XOR');
        break;
      case 'and-gate':
        g = buildDip14(inst.mountedAt.col, 'AND');
        break;
      case 'or-gate':
        g = buildDip14(inst.mountedAt.col, 'OR');
        break;
      case 'not-gate':
        g = buildDip14(inst.mountedAt.col, 'NOT');
        break;
      case 'nand-gate':
        g = buildDip14(inst.mountedAt.col, 'NAND');
        break;
      case 'nor-gate':
        g = buildDip14(inst.mountedAt.col, 'NOR');
        break;
      case 'resistor': {
        const { col, row } = inst.mountedAt;
        g = buildResistor(hole(col, row), hole(col + 3, row), inst.ohms);
        break;
      }
      case 'capacitor': {
        const { col, row } = inst.mountedAt;
        g = buildCapacitor(hole(col, row), hole(col + 1, row), inst.capacitance);
        break;
      }
      case 'led': {
        const { col, row } = inst.mountedAt;
        g = buildLed(hole(col, row), hole(col + 1, row), inst.color);
        break;
      }
      case 'wire': {
        const from = resolvePin(inst.from, circuit.components);
        const to = resolvePin(inst.to, circuit.components);
        if (from && to) g = buildWire(from, to, inst.color);
        break;
      }
    }

    if (g) pivot.add(g);
  }

  return pivot;
}

// ── React component ───────────────────────────────────────────────────────
type Props = { circuitId: string };

export function CircuitScene({ circuitId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const circuit = ALL_CIRCUITS.find((c) => c.id === circuitId);
    if (!circuit) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let raf: number;
    let roResize: ResizeObserver | null = null;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (!width || !height) return;
      ro.disconnect();

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0xffffff, 1);

      const scene = new THREE.Scene();
      const pivot = buildCircuitGroup(circuit);
      scene.add(pivot);

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0.6, 5.2, 6.0);
      camera.lookAt(0, 0, 0);

      roResize = new ResizeObserver(() => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (!w || !h || !renderer) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      roResize.observe(canvas);

      let dragging = false;
      let lx = 0;
      let ly = 0;
      let ry = -0.3;
      let rx = 0.3;

      const onDown = (e: PointerEvent) => {
        dragging = true;
        lx = e.clientX;
        ly = e.clientY;
      };
      const onUp = () => {
        dragging = false;
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        ry += (e.clientX - lx) * 0.01;
        rx += (e.clientY - ly) * 0.006;
        rx = Math.max(-0.05, Math.min(0.75, rx));
        lx = e.clientX;
        ly = e.clientY;
      };

      canvas.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointermove', onMove);

      function loop() {
        raf = requestAnimationFrame(loop);
        if (!dragging) ry += 0.002;
        pivot.rotation.y = ry;
        pivot.rotation.x = rx;
        renderer!.render(scene, camera);
      }
      loop();

      (canvas as any).__cleanup = () => {
        canvas.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointermove', onMove);
      };
    });

    ro.observe(canvas);

    return () => {
      ro.disconnect();
      roResize?.disconnect();
      cancelAnimationFrame(raf);
      (canvasRef.current as any)?.__cleanup?.();
      renderer?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuitId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: 'grab',
        display: 'block',
        height: '100%',
        touchAction: 'none',
        width: '100%',
      }}
    />
  );
}
