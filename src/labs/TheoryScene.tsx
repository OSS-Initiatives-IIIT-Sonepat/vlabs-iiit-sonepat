'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ── Theory schematic scene ─────────────────────────────────────────────────
// 2D circuit schematic rendered in Three.js with an orthographic camera.
// All symbols are built from line geometry — no SVG, no sprites for symbols.
// Labels use CanvasTexture sprites (the only exception).

export type SchematicWire    = { type: 'wire';      x1: number; y1: number; x2: number; y2: number; color?: string };
export type SchematicRes     = { type: 'resistor';  cx: number; cy: number; angle?: number; label?: string };
export type SchematicZener   = { type: 'zener';     cx: number; cy: number };
export type SchematicBattery = { type: 'battery';   cx: number; cy: number; label?: string };
export type SchematicMeter   = {
  type: 'meter';
  cx: number; cy: number;
  symbol: 'V' | 'A';
  /** 'h' = leads exit left/right (series, horizontal), 'v' = leads exit top/bottom (parallel, vertical) */
  orient?: 'h' | 'v';
  label?: string;
};
export type SchematicNode    = { type: 'node';      x: number; y: number };
export type SchematicLabel   = { type: 'label';     x: number; y: number; text: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' };
export type SchematicGnd     = { type: 'gnd';       cx: number; cy: number };
export type SchematicArrowC  = { type: 'current';   x1: number; y1: number; x2: number; y2: number; label?: string };

export type SchematicElement =
  | SchematicWire | SchematicRes | SchematicZener | SchematicBattery
  | SchematicMeter | SchematicNode | SchematicLabel | SchematicGnd | SchematicArrowC;

export type SchematicSpec = { elements: SchematicElement[] };

// ── Colours ────────────────────────────────────────────────────────────────
const INK  = 0x141414;
const RED  = 0xd63b2a;
const BLUE = 0x2563a8;

// ── Line helpers ───────────────────────────────────────────────────────────
function lmat(hex = INK, w = 1) {
  return new THREE.LineBasicMaterial({ color: hex, linewidth: w });
}

function polyline(parent: THREE.Object3D, pts: [number, number][], color = INK) {
  const verts = new Float32Array(pts.length * 3);
  pts.forEach(([x, y], i) => { verts[i*3]=x; verts[i*3+1]=y; verts[i*3+2]=0; });
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  parent.add(new THREE.Line(geo, lmat(color)));
}

function circle(parent: THREE.Object3D, cx: number, cy: number, r: number, color = INK, segs = 48) {
  const pts = Array.from({length: segs+1}, (_, i) => {
    const a = (i/segs)*Math.PI*2;
    return new THREE.Vector3(cx + Math.cos(a)*r, cy + Math.sin(a)*r, 0);
  });
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  parent.add(new THREE.Line(geo, lmat(color)));
}

function filledCircle(parent: THREE.Object3D, cx: number, cy: number, r: number, color = INK) {
  const geo = new THREE.CircleGeometry(r, 32);
  parent.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color })));
}

// ── Text sprite ────────────────────────────────────────────────────────────
function addText(
  parent: THREE.Object3D,
  text: string,
  x: number, y: number,
  size = 0.13,
  color = '#141414',
  anchor: 'left' | 'center' | 'right' = 'center',
) {
  const cw = 512, ch = 96;
  const cv = document.createElement('canvas');
  cv.width = cw; cv.height = ch;
  const ctx = cv.getContext('2d')!;
  ctx.clearRect(0, 0, cw, ch);
  ctx.font = '500 44px "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = anchor === 'left' ? 'left' : anchor === 'right' ? 'right' : 'center';
  ctx.fillText(text, anchor === 'left' ? 12 : anchor === 'right' ? cw-12 : cw/2, ch/2);
  const tex = new THREE.CanvasTexture(cv);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sp  = new THREE.Sprite(mat);
  sp.scale.set(size * (cw/ch) * 1.0, size, 1);
  sp.position.set(x, y, 0.02);
  parent.add(sp);
}

// ── Symbol builders ────────────────────────────────────────────────────────

// Resistor: rect body, leads extending left/right (or rotated)
function buildResistor(parent: THREE.Object3D, cx: number, cy: number, angleDeg = 0, label?: string) {
  const g = new THREE.Group();
  g.position.set(cx, cy, 0);
  if (angleDeg) g.rotation.z = angleDeg * Math.PI / 180;

  const rw = 0.28, rh = 0.11, leadLen = 0.22;
  polyline(g, [[-rw-leadLen, 0], [-rw, 0]]);           // left lead
  polyline(g, [[ rw, 0], [rw+leadLen, 0]]);             // right lead
  polyline(g, [[-rw, -rh], [rw, -rh], [rw, rh], [-rw, rh], [-rw, -rh]]); // rect
  parent.add(g);

  if (label) addText(parent, label, cx, cy + rh + 0.16, 0.10, '#555');
}

// Zener diode: horizontal, anode=left, cathode=right with wings
// Lead tips at ±0.5 from centre
function buildZener(parent: THREE.Object3D, cx: number, cy: number) {
  const g = new THREE.Group();
  g.position.set(cx, cy, 0);

  const leadLen = 0.20, hh = 0.18;
  polyline(g, [[-leadLen - hh, 0], [-hh, 0]]);          // anode lead
  polyline(g, [[hh, 0], [hh + leadLen, 0]]);             // cathode lead
  polyline(g, [[-hh, hh], [-hh, -hh], [hh, 0], [-hh, hh]]); // triangle
  polyline(g, [[hh, -hh*1.2], [hh, hh*1.2]]);           // cathode bar
  polyline(g, [[hh, hh*1.2],  [hh - 0.08, hh*1.6]]);   // top wing
  polyline(g, [[hh, -hh*1.2], [hh + 0.08, -hh*1.6]]);  // bottom wing

  parent.add(g);

  // Labels
  addText(parent, 'A',  cx - hh - leadLen/2, cy + hh + 0.14, 0.10, '#888');
  addText(parent, 'K',  cx + hh + leadLen/2, cy + hh + 0.14, 0.10, '#888');
  addText(parent, 'Dz', cx, cy - hh - 0.22, 0.10, '#141414');
}

// Battery: vertical symbol, terminals at top (+) and bottom (-)
// Leads extend top and bottom by 0.3
const BAT_LEAD = 0.3;
function buildBattery(parent: THREE.Object3D, cx: number, cy: number, label?: string) {
  const g = new THREE.Group();
  g.position.set(cx, cy, 0);

  // Lead wires
  polyline(g, [[0,  BAT_LEAD], [0,  0.20]]);
  polyline(g, [[0, -BAT_LEAD], [0, -0.20]]);

  // Two cell pairs: long plate (+), short plate (-)
  polyline(g, [[-0.18, 0.20], [0.18, 0.20]]);   // + long
  polyline(g, [[-0.11, 0.08], [0.11, 0.08]]);   // − short
  polyline(g, [[-0.18, -0.08], [0.18, -0.08]]); // + long
  polyline(g, [[-0.11, -0.20], [0.11, -0.20]]); // − short

  parent.add(g);

  // +/− labels
  addText(parent, '+', cx + 0.28, cy + 0.20, 0.12, '#141414');
  addText(parent, '−', cx + 0.28, cy - 0.20, 0.12, '#141414');
  if (label) addText(parent, label, cx - 0.32, cy, 0.10, '#555', 'right');
}

// Meter circle: 'h' orient → leads left/right; 'v' → leads top/bottom
const METER_R = 0.20;
function buildMeter(
  parent: THREE.Object3D,
  cx: number, cy: number,
  sym: 'V' | 'A',
  orient: 'h' | 'v' = 'h',
  label?: string,
  col = BLUE,
) {
  circle(parent, cx, cy, METER_R, col);

  if (orient === 'h') {
    polyline(parent, [[cx - METER_R - 0.0, cy], [cx - METER_R - 0.25, cy]], col);
    polyline(parent, [[cx + METER_R + 0.0, cy], [cx + METER_R + 0.25, cy]], col);
  } else {
    polyline(parent, [[cx, cy + METER_R], [cx, cy + METER_R + 0.25]], col);
    polyline(parent, [[cx, cy - METER_R], [cx, cy - METER_R - 0.25]], col);
  }

  addText(parent, sym, cx, cy, 0.15,
    sym === 'V' ? '#2563a8' : '#141414');
  if (label) addText(parent, label, cx, cy + METER_R + 0.22, 0.10, '#888');
}

// GND: 3-line symbol, connection at top
function buildGnd(parent: THREE.Object3D, cx: number, cy: number) {
  polyline(parent, [[cx, cy], [cx, cy - 0.10]]);
  polyline(parent, [[cx - 0.22, cy - 0.10], [cx + 0.22, cy - 0.10]]);
  polyline(parent, [[cx - 0.14, cy - 0.19], [cx + 0.14, cy - 0.19]]);
  polyline(parent, [[cx - 0.06, cy - 0.28], [cx + 0.06, cy - 0.28]]);
}

// Current direction arrow on a wire
function buildCurrentArrow(parent: THREE.Object3D, x1: number, y1: number, x2: number, y2: number, label?: string) {
  const dx = x2-x1, dy = y2-y1, len = Math.sqrt(dx*dx+dy*dy);
  const ux = dx/len, uy = dy/len;
  const mx = (x1+x2)/2, my = (y1+y2)/2;
  const sz = 0.10;
  const perp = 0.06;
  // Arrow head at midpoint
  polyline(parent, [
    [mx, my],
    [mx - ux*sz - uy*perp, my - uy*sz + ux*perp],
  ], RED);
  polyline(parent, [
    [mx, my],
    [mx - ux*sz + uy*perp, my - uy*sz - ux*perp],
  ], RED);
  if (label) addText(parent, label, mx + uy*0.22, my - ux*0.22, 0.09, '#d63b2a');
}

// ── Scene builder ──────────────────────────────────────────────────────────
function buildSchematic(spec: SchematicSpec, scene: THREE.Scene) {
  const root = new THREE.Group();

  for (const el of spec.elements) {
    switch (el.type) {
      case 'wire': {
        const col = el.color === 'red' ? RED : el.color === 'blue' ? BLUE : INK;
        polyline(root, [[el.x1, el.y1], [el.x2, el.y2]], col);
        break;
      }
      case 'resistor': buildResistor(root, el.cx, el.cy, el.angle ?? 0, el.label); break;
      case 'zener':    buildZener(root, el.cx, el.cy);    break;
      case 'battery':  buildBattery(root, el.cx, el.cy, el.label); break;
      case 'meter':    buildMeter(root, el.cx, el.cy, el.symbol, el.orient ?? 'h', el.label); break;
      case 'gnd':      buildGnd(root, el.cx, el.cy);      break;
      case 'node':     filledCircle(root, el.x, el.y, 0.045); break;
      case 'label':    addText(root, el.text, el.x, el.y, el.size ?? 0.12, el.color ?? '#141414', el.anchor === 'start' ? 'left' : el.anchor === 'end' ? 'right' : 'center'); break;
      case 'current':  buildCurrentArrow(root, el.x1, el.y1, el.x2, el.y2, el.label); break;
    }
  }

  scene.add(root);
  return root;
}

// ── React component ────────────────────────────────────────────────────────
type Props = { spec: SchematicSpec };

export function TheoryScene({ spec }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoomRef   = useRef(1);
  const [zoomPct, setZoomPct] = useState(100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xf7f6f3, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 2.8, -2.8, -10, 10);

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      const aspect = w / Math.max(h, 1);
      const Z = 2.8 / zoomRef.current;
      camera.left = -Z * aspect; camera.right = Z * aspect;
      camera.top  =  Z;          camera.bottom= -Z;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    buildSchematic(spec, scene);

    // Pan
    let dragging = false, lx = 0, ly = 0, panX = 0, panY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const scaleX = (camera.right - camera.left) / canvas.clientWidth;
      const scaleY = (camera.top - camera.bottom) / Math.max(canvas.clientHeight, 1);
      panX -= (e.clientX - lx) * scaleX; panY += (e.clientY - ly) * scaleY;
      camera.position.set(panX, panY, 0);
      lx = e.clientX; ly = e.clientY;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomRef.current = Math.max(0.25, Math.min(6, zoomRef.current * (e.deltaY > 0 ? 0.88 : 1.14)));
      setZoomPct(Math.round(zoomRef.current * 100));
      resize();
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    let raf: number;
    const loop = () => { raf = requestAnimationFrame(loop); renderer.render(scene, camera); };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
      />
      <div style={{
        position: 'absolute', bottom: 12, right: 14,
        background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 5, padding: '2px 9px', fontFamily: 'monospace', fontSize: 11, color: '#666',
        pointerEvents: 'none',
      }}>
        {zoomPct}%
      </div>
      <div style={{
        position: 'absolute', bottom: 12, left: 14, fontSize: 10, color: 'rgba(0,0,0,0.22)',
        pointerEvents: 'none', fontFamily: 'sans-serif',
      }}>
        drag to pan · scroll to zoom
      </div>
    </div>
  );
}
