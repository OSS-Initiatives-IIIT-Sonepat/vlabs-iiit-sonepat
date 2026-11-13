import { devBoardCentre, devPinWorld } from "@/components/dev-boards/pinouts";
import { ESP_PARTS, ESP_TOP_Y } from "@/components/dev-boards/esp32-devkit";
import { type StepMarker } from "@/labs/LabScene";

// Pointers for the ESP32 tour: an arrow down onto a part or a header pin of
// the DevKitC on the right of the breadboard.

export function pointAt(part: keyof typeof ESP_PARTS, lift = 0.22): StepMarker {
  const c = devBoardCentre("esp32-devkit", "right");
  const p = ESP_PARTS[part];
  return {
    pos: [c.x + p.x, c.y + ESP_TOP_Y + lift, c.z + p.z],
    dir: [0, -1, 0],
  };
}

export function pointAtPin(name: string): StepMarker {
  const p = devPinWorld("esp32-devkit", "right", name);
  if (!p) throw new Error(`ESP32 has no pin ${name}`);
  return { pos: [p.x, p.y + 0.04, p.z], dir: [0, -1, 0] };
}
