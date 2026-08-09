'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import {
  buildBreadboardStandalone,
  buildDip14Standalone,
  buildLedStandalone,
  buildResistorStandalone,
  buildWireStandalone,
  buildCapacitorStandalone,
  buildPotentiometerStandalone,
  buildPushButtonStandalone,
  buildSwitchStandalone,
  buildBatteryStandalone,
  buildDcJackStandalone,
  buildIcMeterStandalone,
  buildDcPowerSupplyStandalone,
  buildMcuTrainerStandalone,
} from '@/labs/geometry/index';

// ── Component kind type ───────────────────────────────────────────────────
export type EceComponentKind =
  | 'breadboard' | 'led' | 'resistor' | 'capacitor' | 'potentiometer'
  | 'push-button' | 'switch' | 'battery' | 'dc-jack'
  | 'xor-gate' | 'and-gate'
  | 'ic-meter' | 'dc-power-supply' | 'mcu-trainer';

// ── Builder dispatch ──────────────────────────────────────────────────────
// All geometry comes from labs/geometry/ — no local duplication.
function buildStandalone(kind: EceComponentKind): THREE.Group {
  switch (kind) {
    case 'breadboard':       return buildBreadboardStandalone();
    case 'led':              return buildLedStandalone('green');
    case 'resistor':         return buildResistorStandalone(330);
    case 'capacitor':        return buildCapacitorStandalone(100);
    case 'potentiometer':    return buildPotentiometerStandalone();
    case 'push-button':      return buildPushButtonStandalone();
    case 'switch':           return buildSwitchStandalone();
    case 'battery':          return buildBatteryStandalone();
    case 'dc-jack':          return buildDcJackStandalone();
    case 'xor-gate':         return buildDip14Standalone('XOR');
    case 'and-gate':         return buildDip14Standalone('AND');
    case 'ic-meter':         return buildIcMeterStandalone();
    case 'dc-power-supply':  return buildDcPowerSupplyStandalone();
    case 'mcu-trainer':      return buildMcuTrainerStandalone();
  }
}

// ── Camera presets ────────────────────────────────────────────────────────
const CAM: Record<EceComponentKind, [number, number, number]> = {
  breadboard:         [1.5, 2.2, 2.5],
  led:                [1.2, 1.6, 2.0],
  resistor:           [1.5, 1.2, 1.8],
  capacitor:          [1.2, 1.8, 2.2],
  potentiometer:      [1.4, 2.0, 2.2],
  'push-button':      [1.2, 1.6, 2.0],
  switch:             [1.4, 1.6, 2.2],
  battery:            [1.4, 2.4, 2.8],
  'dc-jack':          [1.4, 1.6, 2.2],
  'xor-gate':         [1.6, 1.8, 2.4],
  'and-gate':         [1.6, 1.8, 2.4],
  'ic-meter':         [1.4, 0.6, 3.2],
  'dc-power-supply':  [2.2, 2.2, 3.2],
  'mcu-trainer':      [2.0, 2.4, 3.2],
};

// Initial X tilt — upright components get a front-facing angle
const TILT: Partial<Record<EceComponentKind, number>> = {
  'ic-meter':        0.10,
  'dc-power-supply': 0.10,
};

// ── Component ─────────────────────────────────────────────────────────────
type Props = {
  kind: EceComponentKind;
  background?: string;
  autoRotate?: boolean;
};

export function EceComponentViewer({ kind, background = '#f7f6f3', autoRotate = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(background, 1);

    const scene  = new THREE.Scene();
    const [cx, cy, cz] = CAM[kind];
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(cx, cy, cz);
    camera.lookAt(0, 0, 0);

    const pivot = new THREE.Group();
    pivot.rotation.x = TILT[kind] ?? 0.3;
    scene.add(pivot);
    pivot.add(buildStandalone(kind));

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let dragging = false, lx = 0, ly = 0, ry = 0, rx = TILT[kind] ?? 0.3;
    const onDown = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      ry += (e.clientX - lx) * 0.012;
      rx += (e.clientY - ly) * 0.007;
      rx = Math.max(-0.8, Math.min(1.4, rx));
      lx = e.clientX; ly = e.clientY;
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);

    let raf: number;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (!dragging && autoRotate) ry += 0.005;
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
  }, [kind, background]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
    />
  );
}
