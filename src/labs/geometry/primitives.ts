import * as THREE from 'three';
import { M } from './materials';

// ── Solid box with black wireframe edges ──────────────────────────────────
export function solidBox(w: number, h: number, d: number, mat: THREE.Material): THREE.Group {
  const g   = new THREE.Group();
  const geo = new THREE.BoxGeometry(w, h, d);
  g.add(new THREE.Mesh(geo, mat));
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), M.edge()));
  return g;
}

// ── Solid cylinder with black wireframe edges ────────────────────────────
export function solidCyl(r: number, h: number, mat: THREE.Material, seg = 14): THREE.Group {
  const g   = new THREE.Group();
  const geo = new THREE.CylinderGeometry(r, r, h, seg);
  g.add(new THREE.Mesh(geo, mat));
  g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), M.edge()));
  return g;
}

// ── Canvas text label (client-side only) ─────────────────────────────────
// Returns a PlaneGeometry mesh with the text rendered via CanvasTexture.
// Returns null during SSR.
export function textLabel(
  text: string,
  planeW: number,
  planeH: number,
  opts: { textColor?: string; fontSize?: number; bold?: boolean } = {},
): THREE.Mesh | null {
  if (typeof document === 'undefined') return null;

  const { textColor = '#c8d0c0', fontSize = 44, bold = true } = opts;
  const RES  = 256;
  const cvs  = document.createElement('canvas');
  cvs.width  = RES;
  cvs.height = Math.max(32, Math.round(RES * (planeH / planeW)));
  const ctx  = cvs.getContext('2d')!;
  ctx.font         = `${bold ? '700' : '400'} ${fontSize}px Helvetica,Arial,sans-serif`;
  ctx.fillStyle    = textColor;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cvs.width / 2, cvs.height / 2);

  const mat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(cvs),
    transparent: true,
    depthWrite: false,
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(planeW, planeH), mat);
}

// ── Centre a group at origin (useful for standalone display) ─────────────
export function centreAtOrigin(g: THREE.Group): THREE.Group {
  const box = new THREE.Box3().setFromObject(g);
  const centre = new THREE.Vector3();
  box.getCenter(centre);
  g.position.sub(centre);
  return g;
}
