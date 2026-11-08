import * as THREE from "three";
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * A plain drag still orbits. Holding Ctrl and dragging slides the model
 * across the view instead of turning it.
 */
export function bindCtrlPan(
  controls: OrbitControls,
  canvas: HTMLElement,
): () => void {
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  const usePan = (pan: boolean) => {
    controls.mouseButtons.LEFT = pan ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
  };
  const onPointerDown = (event: PointerEvent) => {
    if (event.button === 0) usePan(event.ctrlKey);
  };
  const onPointerUp = (event: PointerEvent) => {
    usePan(event.ctrlKey);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "Control") return;
    usePan(event.type === "keydown");
  };
  canvas.addEventListener("pointerdown", onPointerDown, true);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("keydown", onKey);
  window.addEventListener("keyup", onKey);
  return () => {
    canvas.removeEventListener("pointerdown", onPointerDown, true);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("keyup", onKey);
    usePan(false);
  };
}
