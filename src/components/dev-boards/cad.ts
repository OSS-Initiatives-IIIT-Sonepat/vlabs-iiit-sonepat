import * as THREE from "three";

// ── CAD-style building blocks for development-board models ─────────────────
// Light, evenly lit colours with dark outlines on every edge, like a CAD
// render of the board. Shared by the Arduino Uno and ESP32 models.

/** Lit material with a share of self-colour, so parts stay light under the
 *  lab's soft lights. */
export function mat(color: number, glow = 0.42, rough = 0.75): THREE.Material {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: rough,
    metalness: 0,
    emissive: color,
    emissiveIntensity: glow,
  });
}

const OUTLINE = new THREE.LineBasicMaterial({ color: 0x1c1e22 });

export function add(
  parent: THREE.Object3D,
  geo: THREE.BufferGeometry,
  material: THREE.Material | THREE.Material[],
  x: number,
  y: number,
  z: number,
): THREE.Mesh {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

/** Box resting on `base` (its bottom at y = base). */
export function block(
  parent: THREE.Object3D,
  x: number,
  z: number,
  base: number,
  sx: number,
  sy: number,
  sz: number,
  color: number,
  glow?: number,
): THREE.Mesh {
  return add(
    parent,
    new THREE.BoxGeometry(sx, sy, sz),
    mat(color, glow),
    x,
    base + sy / 2,
    z,
  );
}

/** Upright cylinder resting on `base`. */
export function post(
  parent: THREE.Object3D,
  x: number,
  z: number,
  base: number,
  r: number,
  h: number,
  color: number,
  seg = 24,
): THREE.Mesh {
  return add(
    parent,
    new THREE.CylinderGeometry(r, r, h, seg),
    mat(color),
    x,
    base + h / 2,
    z,
  );
}

/** Flat artwork drawn on a canvas, laid on a horizontal surface. */
export function decal(
  draw: (ctx: CanvasRenderingContext2D, W: number, H: number) => void,
  worldW: number,
  worldH: number,
  pxPerUnit = 420,
): THREE.Mesh | null {
  if (typeof document === "undefined") return null;
  const cvs = document.createElement("canvas");
  cvs.width = Math.max(16, Math.round(worldW * pxPerUnit));
  cvs.height = Math.max(16, Math.round(worldH * pxPerUnit));
  const ctx = cvs.getContext("2d");
  if (!ctx) return null;
  draw(ctx, cvs.width, cvs.height);
  const tex = new THREE.CanvasTexture(cvs);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(worldW, worldH),
    new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.userData.noOutline = true;
  return mesh;
}

/** Dark edge lines on every mesh not marked `noOutline`. */
export function outline(root: THREE.Object3D) {
  const meshes: THREE.Mesh[] = [];
  root.traverse((o) => {
    if (o instanceof THREE.Mesh && !o.userData.noOutline) meshes.push(o);
  });
  for (const m of meshes) {
    const lines = new THREE.LineSegments(
      new THREE.EdgesGeometry(m.geometry, 28),
      OUTLINE,
    );
    lines.position.copy(m.position);
    lines.rotation.copy(m.rotation);
    lines.scale.copy(m.scale);
    m.parent?.add(lines);
  }
}

/** Rounded rectangle shape centred on the origin. */
export function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.absarc(w / 2 - r, -h / 2 + r, r, -Math.PI / 2, 0, false);
  s.lineTo(w / 2, h / 2 - r);
  s.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2, false);
  s.lineTo(-w / 2 + r, h / 2);
  s.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-w / 2, -h / 2 + r);
  s.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, (3 * Math.PI) / 2, false);
  return s;
}
