'use client';

import { useEffect, useRef, useState } from 'react';
import { styled } from '@linaria/react';
import * as THREE from 'three';

import { ALL_CIRCUITS } from '@/labs/circuits/index';
import { buildBreadboard, buildDip14, buildResistor, buildLed, buildWire, buildCapacitor } from '@/labs/geometry/index';
import { hole, railHole, COLS } from '@/labs/coords';
import { type Circuit, type ComponentInstance, type PinRef, type TiePin, type RailPin, type IcPin, type PassivePin, type LedPin } from '@/labs/types';

// ── Styles ────────────────────────────────────────────────────────────────
const Card = styled.div`
  background: #ffffff;
  border: 1.5px solid #e8e4e0;
  border-radius: 20px;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.12),
    0 0 0 1px rgba(0,0,0,0.04) inset;
  display: grid;
  grid-template-columns: 116px 1px 1fr;
  height: 420px;
  overflow: hidden;
  width: 100%;
`;

const Sidebar = styled.div`
  background: #faf9f7;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding: 10px 8px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Thumb = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(0,0,0,0.14)' : 'rgba(0,0,0,0.06)'};
  border-radius: 7px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 5px 6px 6px;
  transition: background 0.12s, border-color 0.12s;
  width: 100%;

  &:hover {
    background: rgba(0,0,0,0.05);
    border-color: rgba(0,0,0,0.10);
  }
`;

const ThumbIllustration = styled.div<{ $active: boolean }>`
  background: ${({ $active }) => $active ? '#f0ead8' : '#f7f5f2'};
  border-radius: 3px;
  height: 38px;
  overflow: hidden;
  position: relative;
  width: 100%;
  &::before {
    background: #c84040;
    content: '';
    height: 4px;
    left: 4px;
    position: absolute;
    right: 4px;
    top: 6px;
  }
  &::after {
    background: #2060a0;
    bottom: 6px;
    content: '';
    height: 4px;
    left: 4px;
    position: absolute;
    right: 4px;
  }
`;

const ThumbHoles = styled.div`
  bottom: 14px;
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(10, 4px);
  grid-template-rows: repeat(4, 4px);
  left: 50%;
  position: absolute;
  top: 14px;
  transform: translateX(-50%);
  & > span {
    background: #c8bfae;
    border-radius: 1px;
    display: block;
    height: 4px;
    width: 4px;
  }
`;

const ThumbLabel = styled.span<{ $active: boolean }>`
  color: ${({ $active }) => $active ? '#1a1816' : '#9a9694'};
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 9.5px;
  font-weight: 500;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.12s;
  white-space: nowrap;
`;

const Divider = styled.div`
  background: linear-gradient(to bottom, transparent, #e8e4e0 15%, #e8e4e0 85%, transparent);
  flex-shrink: 0;
  width: 1px;
`;

const Display = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  position: relative;
`;

const DisplayCanvas = styled.canvas`
  background: #ffffff;
  cursor: grab;
  display: block;
  height: 100%;
  overscroll-behavior: contain;
  touch-action: none;
  width: 100%;
  &:active { cursor: grabbing; }
`;

const DisplayFooter = styled.div`
  bottom: 0;
  left: 0;
  padding: 14px 20px;
  pointer-events: none;
  position: absolute;
  right: 0;
`;

const CircuitName = styled.p`
  color: #6a6460;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.10em;
  margin: 0;
  text-transform: uppercase;
`;

const CircuitGates = styled.p`
  color: #b0aaa4;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 10px;
  margin: 3px 0 0;
`;

// ── Pin resolver (same logic as LabScene, self-contained) ─────────────────
function resolvePin(pin: PinRef, all: ComponentInstance[]): THREE.Vector3 | null {
  if ('col' in pin && 'row' in pin && 'board' in pin)
    return hole((pin as TiePin).col, (pin as TiePin).row);

  if ('rail' in pin) {
    const rp = pin as RailPin;
    const m = { vcc_top: 'top_red', gnd_top: 'top_blue', vcc_bot: 'bot_red', gnd_bot: 'bot_blue' } as const;
    return railHole(rp.col, m[rp.rail]);
  }

  if ('ic' in pin) {
    const ip = pin as IcPin;
    const inst = all.find(c => c.id === ip.ic);
    if (!inst || !('mountedAt' in inst)) return null;
    const col = inst.mountedAt.col;
    if (ip.pin === 'A' || ip.pin === '1A') return hole(col,     'e');
    if (ip.pin === 'B' || ip.pin === '1B') return hole(col + 1, 'e');
    if (ip.pin === 'Y' || ip.pin === '1Y') return hole(col + 2, 'e');
    if (ip.pin === '2A') return hole(col + 3, 'e');
    if (ip.pin === '2B') return hole(col + 4, 'e');
    if (ip.pin === '2Y') return hole(col + 5, 'e');
    return null;
  }

  if ('component' in pin) {
    const pp = pin as PassivePin;
    const inst = all.find(c => c.id === pp.component);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return pp.end === 'p1' ? hole(col, row) : hole(col + 3, row);
  }

  if ('led' in pin) {
    const lp = pin as LedPin;
    const inst = all.find(c => c.id === lp.led);
    if (!inst || !('mountedAt' in inst)) return null;
    const { col, row } = inst.mountedAt;
    return lp.end === 'anode' ? hole(col, row) : hole(col + 1, row);
  }

  return null;
}

// ── Build all circuit components into a pivot group ───────────────────────
function buildCircuitScene(circuit: Circuit): THREE.Group {
  const pivot = new THREE.Group();
  pivot.rotation.x = 0.30;

  for (const inst of circuit.components) {
    let g: THREE.Group | null = null;

    switch (inst.type) {
      case 'breadboard':
        g = buildBreadboard(COLS);
        break;
      case 'xor-gate': g = buildDip14(inst.mountedAt.col, 'XOR'); break;
      case 'and-gate': g = buildDip14(inst.mountedAt.col, 'AND'); break;
      case 'or-gate':  g = buildDip14(inst.mountedAt.col, 'OR');  break;
      case 'not-gate': g = buildDip14(inst.mountedAt.col, 'NOT'); break;
      case 'nand-gate':g = buildDip14(inst.mountedAt.col, 'NAND');break;
      case 'nor-gate': g = buildDip14(inst.mountedAt.col, 'NOR'); break;
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
        const to   = resolvePin(inst.to,   circuit.components);
        if (from && to) g = buildWire(from, to, inst.color);
        break;
      }
    }

    if (g) pivot.add(g);
  }

  return pivot;
}

// ── Three.js display renderer ──────────────────────────────────────────────
// Rebuilds the scene completely whenever activeId changes.
function useDisplayRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  circuit: Circuit,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

      const scene  = new THREE.Scene();
      const pivot  = buildCircuitScene(circuit);
      scene.add(pivot);

      const camera = new THREE.PerspectiveCamera(26, width / height, 0.1, 100);
      camera.position.set(0.6, 4.0, 4.6);
      camera.lookAt(0, 0, 0);

      roResize = new ResizeObserver(() => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h || !renderer) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      roResize.observe(canvas);

      let dragging = false, lx = 0, ly = 0, ry = -0.3, rx = 0.30;
      const onDown = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; };
      const onUp   = () => { dragging = false; };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        ry += (e.clientX - lx) * 0.010;
        rx += (e.clientY - ly) * 0.006;
        rx = Math.max(-0.05, Math.min(0.75, rx));
        lx = e.clientX; ly = e.clientY;
      };

      // Scroll / pinch to zoom — scale camera distance
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY * 0.005;
        const dir   = camera.position.clone().normalize();
        const dist  = camera.position.length();
        const next  = Math.max(2.0, Math.min(14.0, dist + delta * dist * 0.3));
        camera.position.copy(dir.multiplyScalar(next));
      };

      canvas.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup',   onUp);
      window.addEventListener('pointermove', onMove);
      canvas.addEventListener('wheel', onWheel, { passive: false });

      function loop() {
        raf = requestAnimationFrame(loop);
        if (!dragging) ry += 0.0018;
        pivot.rotation.y = ry;
        pivot.rotation.x = rx;
        renderer!.render(scene, camera);
      }
      loop();

      (canvas as any).__cleanup = () => {
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('wheel',       onWheel);
        window.removeEventListener('pointerup',   onUp);
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
  // circuit.id changes → full rebuild
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuit.id]);
}

// ── CSS-only breadboard thumbnail ─────────────────────────────────────────
const HOLES = Array.from({ length: 40 });
function BreadboardThumb({ active }: { active: boolean }) {
  return (
    <ThumbIllustration $active={active}>
      <ThumbHoles>{HOLES.map((_, i) => <span key={i} />)}</ThumbHoles>
    </ThumbIllustration>
  );
}

// ── Gate count summary ────────────────────────────────────────────────────
function gatesSummary(circuit: Circuit): string {
  const counts: Record<string, number> = {};
  for (const c of circuit.components) {
    if (c.type.endsWith('-gate')) {
      const label = c.type.replace('-gate', '').toUpperCase();
      counts[label] = (counts[label] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([k, v]) => `${v}× ${k}`)
    .join('  ·  ');
}

// ── Component ─────────────────────────────────────────────────────────────
export function HeroPreview() {
  const [activeId, setActiveId] = useState(ALL_CIRCUITS[0].id);
  const displayRef = useRef<HTMLCanvasElement>(null);
  const active = ALL_CIRCUITS.find(c => c.id === activeId)!;

  useDisplayRenderer(displayRef, active);

  return (
    <Card>
      <Sidebar>
        {ALL_CIRCUITS.map((circuit) => (
          <Thumb
            key={circuit.id}
            $active={circuit.id === activeId}
            onClick={() => setActiveId(circuit.id)}
            title={circuit.title}
          >
            <BreadboardThumb active={circuit.id === activeId} />
            <ThumbLabel $active={circuit.id === activeId}>
              {circuit.title}
            </ThumbLabel>
          </Thumb>
        ))}
      </Sidebar>

      <Divider />

      <Display>
        <DisplayCanvas ref={displayRef} />
        <DisplayFooter>
          <CircuitName>{active.title}</CircuitName>
          <CircuitGates>{gatesSummary(active)}</CircuitGates>
        </DisplayFooter>
      </Display>
    </Card>
  );
}
