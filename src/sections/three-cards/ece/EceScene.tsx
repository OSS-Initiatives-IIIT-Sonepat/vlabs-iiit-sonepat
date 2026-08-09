'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type EceKind = 'breadboard' | 'led' | 'resistor';

// ── geometry helpers (bob-the-builder style) ──────────────────────────────
const WHITE = new THREE.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1 });
const BLACK = new THREE.LineBasicMaterial({ color: 0x141414 });
const DARK  = new THREE.MeshBasicMaterial({ color: 0x141414 });
const RED   = new THREE.MeshBasicMaterial({ color: 0xd63b2a });
const BLUE  = new THREE.MeshBasicMaterial({ color: 0x2563a8 });
const GOLD  = new THREE.MeshBasicMaterial({ color: 0xc8922a });
const DGRAY = new THREE.MeshBasicMaterial({ color: 0x444444 });

function box(w: number, h: number, d: number, mat = WHITE): THREE.Group {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(w, h, d);
  g.add(new THREE.Mesh(geo, mat));
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), BLACK));
  return g;
}

function cyl(r: number, h: number, seg = 16, mat = WHITE): THREE.Group {
  const g = new THREE.Group();
  const geo = new THREE.CylinderGeometry(r, r, h, seg);
  g.add(new THREE.Mesh(geo, mat));
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), BLACK));
  return g;
}

// ── Breadboard ─────────────────────────────────────────────────────────────
// Real proportions: 30 columns × 10 rows (5+5 across centre gap), 4 power
// rail rows (2 top, 2 bottom). 1 unit = ~2.54 mm pitch.
function buildBreadboard(): THREE.Group {
  const root = new THREE.Group();

  // Pitch and counts
  const PITCH  = 0.18;   // distance between hole centres
  const COLS   = 30;     // tie-point columns (1..30)
  const ROWS   = 5;      // rows each side of centre gap (a-e / f-j)
  const BODY_W = (COLS + 1) * PITCH;
  const BODY_D = 3.2;

  // Off-white body — characteristic cream colour of a real breadboard
  const creamMat = new THREE.MeshBasicMaterial({ color: 0xf4efe4 });
  const base = box(BODY_W, 0.14, BODY_D, creamMat);
  root.add(base);

  // ── Power-rail strips (top & bottom, red + blue lines) ────────────────
  const railW = BODY_W - 0.12;
  const railH = 0.015;
  const railD = 0.05;

  // top pair
  const rT = box(railW, railH, railD, RED);
  rT.position.set(0, 0.078, -BODY_D / 2 + 0.22);
  root.add(rT);
  const bT = box(railW, railH, railD, BLUE);
  bT.position.set(0, 0.078, -BODY_D / 2 + 0.34);
  root.add(bT);

  // bottom pair
  const rB = box(railW, railH, railD, RED);
  rB.position.set(0, 0.078, BODY_D / 2 - 0.22);
  root.add(rB);
  const bB = box(railW, railH, railD, BLUE);
  bB.position.set(0, 0.078, BODY_D / 2 - 0.34);
  root.add(bB);

  // ── Centre gap (slightly darker stripe) ──────────────────────────────
  const gapMat = new THREE.MeshBasicMaterial({ color: 0xd8d0c0 });
  const gap = box(BODY_W, 0.016, 0.15, gapMat);
  gap.position.set(0, 0.078, 0);
  root.add(gap);

  // ── Tie-point hole grid ───────────────────────────────────────────────
  // Square holes: small dark recessed squares sitting flush on top
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x2a2218 });
  const holeGeo = new THREE.BoxGeometry(0.08, 0.02, 0.08);

  const startX = -((COLS - 1) / 2) * PITCH;
  // Two banks: top bank rows a-e, bottom bank rows f-j
  // Row centres: top bank centred at z = -0.62 to -0.34 (5 rows)
  //              bottom bank at z = 0.34 to 0.62

  const topBankCenterZ  = -(BODY_D / 2) + 0.72; // starts after top power rails
  const botBankCenterZ  =  (BODY_D / 2) - 0.72;

  for (let col = 0; col < COLS; col++) {
    const x = startX + col * PITCH;

    for (let row = 0; row < ROWS; row++) {
      // Top bank (a-e)
      const zTop = topBankCenterZ + row * PITCH;
      const hTop = new THREE.Mesh(holeGeo, holeMat);
      hTop.position.set(x, 0.072, zTop);
      root.add(hTop);

      // Bottom bank (f-j)
      const zBot = botBankCenterZ - (ROWS - 1 - row) * PITCH;
      const hBot = new THREE.Mesh(holeGeo, holeMat);
      hBot.position.set(x, 0.072, zBot);
      root.add(hBot);
    }
  }

  // ── Power-rail hole dots (2 rows × 25 cols each side) ─────────────────
  const railHoleMat = new THREE.MeshBasicMaterial({ color: 0x2a2218 });
  const railHoleGeo = new THREE.BoxGeometry(0.06, 0.02, 0.06);
  const RAIL_COLS   = 25;
  const railStartX  = -((RAIL_COLS - 1) / 2) * PITCH;

  const powerRowZs = [
    -BODY_D / 2 + 0.22,  // red top
    -BODY_D / 2 + 0.34,  // blue top
     BODY_D / 2 - 0.22,  // red bottom
     BODY_D / 2 - 0.34,  // blue bottom
  ];
  for (const rz of powerRowZs) {
    for (let col = 0; col < RAIL_COLS; col++) {
      const rh = new THREE.Mesh(railHoleGeo, railHoleMat);
      rh.position.set(railStartX + col * PITCH, 0.072, rz);
      root.add(rh);
    }
  }

  // ── Edge ticks — short column-number notches along the long edges ──────
  const tickMat = new THREE.MeshBasicMaterial({ color: 0x888070 });
  const tickGeo = new THREE.BoxGeometry(0.02, 0.016, 0.06);
  for (let col = 0; col < COLS; col++) {
    const x = startX + col * PITCH;
    // top edge tick
    const tT = new THREE.Mesh(tickGeo, tickMat);
    tT.position.set(x, 0.074, -BODY_D / 2 + 0.08);
    root.add(tT);
    // bottom edge tick
    const tB = new THREE.Mesh(tickGeo, tickMat);
    tB.position.set(x, 0.074, BODY_D / 2 - 0.08);
    root.add(tB);
  }

  // ── Row-label area — thin strips on left & right sides ────────────────
  const labelMat = new THREE.MeshBasicMaterial({ color: 0xe0dace });
  const labelStrip = (zc: number) => {
    const ls = box(0.12, 0.016, ROWS * PITCH + 0.06, labelMat);
    ls.position.set(-BODY_W / 2 - 0.07, 0.075, zc);
    root.add(ls);
    const ls2 = box(0.12, 0.016, ROWS * PITCH + 0.06, labelMat);
    ls2.position.set(BODY_W / 2 + 0.07, 0.075, zc);
    root.add(ls2);
  };
  labelStrip(topBankCenterZ + (ROWS - 1) * PITCH / 2);
  labelStrip(botBankCenterZ - (ROWS - 1) * PITCH / 2);

  return root;
}

// ── LED ────────────────────────────────────────────────────────────────────
function buildLed(): THREE.Group {
  const root = new THREE.Group();

  // Dome (hemisphere look — full sphere, lower half hidden by base)
  const domeGeo = new THREE.SphereGeometry(0.38, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, RED);
  dome.position.y = 0.18;
  root.add(dome);
  root.add(new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 15), BLACK));

  // Flat base rim
  const rim = cyl(0.38, 0.08, 20, WHITE);
  rim.position.y = 0.12;
  root.add(rim);

  // Body cylinder
  const body = cyl(0.28, 0.5, 20, DGRAY);
  body.position.y = -0.12;
  root.add(body);

  // Anode lead (longer)
  const anode = cyl(0.025, 0.9, 8, GOLD);
  anode.position.set(-0.1, -0.72, 0);
  root.add(anode);

  // Cathode lead (shorter, flat mark side)
  const cathode = cyl(0.025, 0.75, 8, GOLD);
  cathode.position.set(0.1, -0.65, 0);
  root.add(cathode);

  // Flat on the cathode side of the rim (dark notch)
  const flat = box(0.04, 0.1, 0.18, DARK);
  flat.position.set(0.35, 0.12, 0);
  root.add(flat);

  return root;
}

// ── Resistor ───────────────────────────────────────────────────────────────
function buildResistor(): THREE.Group {
  const root = new THREE.Group();

  // Body
  const body = cyl(0.22, 1.1, 16, WHITE);
  body.rotation.z = Math.PI / 2;
  root.add(body);

  // Colour bands (4-band: orange, orange, brown, gold)
  const bands: [number, THREE.Material][] = [
    [-0.32, RED],           // 1st band
    [-0.14, new THREE.MeshBasicMaterial({ color: 0xe07000 })],  // 2nd
    [ 0.04, DARK],          // 3rd (multiplier)
    [ 0.28, GOLD],          // tolerance gold
  ];
  for (const [x, mat] of bands) {
    const band = cyl(0.23, 0.1, 16, mat);
    band.rotation.z = Math.PI / 2;
    band.position.x = x;
    root.add(band);
  }

  // Left lead
  const leadL = cyl(0.03, 0.8, 8, GOLD);
  leadL.rotation.z = Math.PI / 2;
  leadL.position.x = -1.0;
  root.add(leadL);

  // Right lead
  const leadR = cyl(0.03, 0.8, 8, GOLD);
  leadR.rotation.z = Math.PI / 2;
  leadR.position.x = 1.0;
  root.add(leadR);

  return root;
}

function buildScene(kind: EceKind): THREE.Group {
  switch (kind) {
    case 'breadboard': return buildBreadboard();
    case 'led':        return buildLed();
    case 'resistor':   return buildResistor();
  }
}

// ── React component ────────────────────────────────────────────────────────
type Props = { kind: EceKind };

export function EceScene({ kind }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    // Camera angle & distance tuned per component
    let cx: number, cy: number, cz: number;
    if (kind === 'breadboard') {
      // slightly top-down isometric view — shows the hole grid clearly
      cx = 1.8; cy = 3.2; cz = 3.0;
    } else if (kind === 'led') {
      cx = 2.4; cy = 1.8; cz = 2.4;
    } else {
      cx = 2.6; cy = 1.6; cz = 2.6;
    }
    camera.position.set(cx, cy, cz);
    camera.lookAt(0, 0, 0);

    const model = buildScene(kind);
    scene.add(model);

    // Resize to fill container
    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Drag to rotate
    let dragging = false;
    let lastX = 0, lastY = 0;
    const onDown = (e: PointerEvent) => { dragging = true; lastX = e.clientX; lastY = e.clientY; };
    const onUp   = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      model.rotation.y += (e.clientX - lastX) * 0.012;
      model.rotation.x += (e.clientY - lastY) * 0.012;
      lastX = e.clientX; lastY = e.clientY;
    };
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointermove', onMove);

    // Auto-rotate
    let raf: number;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (!dragging) model.rotation.y += 0.004;
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
  }, [kind]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab' }}
    />
  );
}
