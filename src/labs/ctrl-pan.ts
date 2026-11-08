import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * A plain drag still orbits. Ctrl+drag slides the model.
 *
 * OrbitControls already pans when Ctrl is held and the left button means
 * rotate. Switching that button to pan while Ctrl is down makes it rotate
 * instead, so this only turns panning on.
 */
export function bindCtrlPan(controls: OrbitControls): () => void {
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  if (!controls.panSpeed || controls.panSpeed < 1) controls.panSpeed = 1.4;
  return () => {
    controls.enablePan = false;
  };
}
