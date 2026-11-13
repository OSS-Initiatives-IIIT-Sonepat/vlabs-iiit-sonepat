import { devBoardCentre } from "@/components/dev-boards/pinouts";
import {
  UNO_PART_TOP,
  UNO_PARTS,
  UNO_TOP_Y,
} from "@/components/dev-boards/arduino-uno";
import { type StepMarker } from "@/labs/LabScene";

// Pointer over a part of the Uno. The arrow comes down onto the top of the
// part, so the student sees exactly which part the step describes.
type PartName = keyof typeof UNO_PARTS;

export function pointAt(part: PartName): StepMarker {
  const c = devBoardCentre("arduino-uno", "right");
  const p = UNO_PARTS[part];
  return {
    pos: [c.x + p.x, c.y + UNO_TOP_Y + UNO_PART_TOP[part] + 0.02, c.z + p.z],
    dir: [0, -1, 0],
  };
}
