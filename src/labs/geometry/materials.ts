import * as THREE from 'three';

// ── Single set of material factories for the entire lab system ─────────────
// Called as functions (not constants) so each component gets a fresh instance
// — shared materials cause disposal bugs when one component is removed.

export const M = {
  cream:   () => new THREE.MeshBasicMaterial({ color: 0xf0ead8, polygonOffset: true, polygonOffsetFactor: 2 }),
  dark:    () => new THREE.MeshBasicMaterial({ color: 0x1a1a1a }),
  hole:    () => new THREE.MeshBasicMaterial({ color: 0x181410, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
  gray:    () => new THREE.MeshBasicMaterial({ color: 0x888888 }),
  red:     () => new THREE.MeshBasicMaterial({ color: 0xd63b2a }),
  blue:    () => new THREE.MeshBasicMaterial({ color: 0x2563a8 }),
  green:   () => new THREE.MeshBasicMaterial({ color: 0x22a84a }),
  yellow:  () => new THREE.MeshBasicMaterial({ color: 0xdda000 }),
  orange:  () => new THREE.MeshBasicMaterial({ color: 0xe07020 }),
  gold:    () => new THREE.MeshBasicMaterial({ color: 0xc89020 }),
  silver:  () => new THREE.MeshBasicMaterial({ color: 0xb0b8c0 }),
  white:   () => new THREE.MeshBasicMaterial({ color: 0xffffff, polygonOffset: true, polygonOffsetFactor: 1 }),
  ic:      () => new THREE.MeshBasicMaterial({ color: 0x1c1c28 }),
  capblue: () => new THREE.MeshBasicMaterial({ color: 0x1a2a4a }),
  pcbgreen:() => new THREE.MeshBasicMaterial({ color: 0x1a4a1a, polygonOffset: true, polygonOffsetFactor: 3 }),
  edge:    () => new THREE.LineBasicMaterial({ color: 0x141414 }),
  hex:     (c: number) => new THREE.MeshBasicMaterial({ color: c }),
};

// ── Wire colour lookup ─────────────────────────────────────────────────────
export const WIRE_HEX: Record<string, number> = {
  red: 0xd63b2a, black: 0x202020, yellow: 0xdda000,
  green: 0x22a84a, blue: 0x2563a8, orange: 0xe07020, white: 0xeeeeee,
};
