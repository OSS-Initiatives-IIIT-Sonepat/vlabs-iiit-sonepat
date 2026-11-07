import {
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";

import { PINS_8085, PIN_IDS_8085 } from "@/labs/mpu8085/pins";
import { PIN_STEPS, revealedThrough } from "@/labs/mpu8085/steps";

const W = 840;
const H = 860;
const BODY_X = 300;
const BODY_Y = 48;
const BODY_W = 240;
const BODY_H = 760;
const Y0 = 68;
const PITCH = 38;

function yOf(index: number): number {
  return Y0 + index * PITCH;
}

function pinout(
  revealed: ReadonlySet<string>,
  focus: ReadonlySet<string>,
): SchematicData {
  const elements: SchematicElement[] = [
    {
      type: "wire",
      id: "body",
      points: [
        { x: BODY_X, y: BODY_Y },
        { x: BODY_X + BODY_W, y: BODY_Y },
        { x: BODY_X + BODY_W, y: BODY_Y + BODY_H },
        { x: BODY_X, y: BODY_Y + BODY_H },
        { x: BODY_X, y: BODY_Y },
      ],
    },
    {
      type: "label",
      id: "title",
      x: BODY_X + BODY_W / 2,
      y: BODY_Y + BODY_H / 2,
      text: "8085A",
      size: 18,
    },
    {
      type: "label",
      id: "notch",
      x: BODY_X + BODY_W / 2,
      y: 24,
      text: "notch, pin 1 this end",
      size: 11,
      color: "#525252",
    },
  ];

  for (const pin of PINS_8085) {
    const y = yOf(pin.index);
    const hot = focus.has(pin.id);
    const color = hot ? "#2563eb" : "#171717";
    const numX = pin.side === "L" ? BODY_X - 50 : BODY_X + BODY_W + 50;
    const nameX = pin.side === "L" ? 148 : 692;
    elements.push({
      type: "label",
      id: `n_${pin.id}`,
      x: numX,
      y,
      text: String(pin.n),
      size: hot ? 13 : 11,
      color: hot ? "#2563eb" : "#525252",
    });
    if (revealed.has(pin.id)) {
      elements.push({
        type: "label",
        id: `name_${pin.id}`,
        x: nameX,
        y,
        text: pin.name,
        size: hot ? 13 : 11,
        color,
      });
    }
  }

  return { width: W, height: H, gallery: true, elements };
}

export const pinLabellingStepSchematics: SchematicData[] = PIN_STEPS.map(
  (step, i) => pinout(new Set(revealedThrough(i)), new Set(step.focus)),
);

export const pinLabellingTheoryDiagram: SchematicData = pinout(
  new Set(PIN_IDS_8085),
  new Set(),
);
