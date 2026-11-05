import { type SchematicData } from "@/labs/CircuitSchematic";
import { arrow, block, decision, frames } from "../diagram";

const X = 320;

function box(id: string, y: number, name: string, on = false) {
  return block(id, X, y, 240, 44, name, on);
}

function ask(id: string, y: number, name: string, on = false) {
  return decision(id, X, y, name, on);
}

/** Bottom pin of a 44px-tall box, top pin of the next shape. */
const down = (id: string, y0: number, y1: number, on = false) =>
  arrow(
    id,
    [
      [X, y0],
      [X, y1],
    ],
    on,
  );

const signs = box("signs", 72, "Read As and Bs");
const same = ask("same", 168, "As = Bs?");
const add = box("add", 276, "Same sign: EA = A + B");
const comp = box("comp", 360, "Different: EA = A + B'");
const carry = ask("carry", 456, "E = 1?");

export const signedAdditionStepSchematics: SchematicData[] = frames([
  {
    title: "The two signs",
    height: 560,
    elements: [signs],
    notes: ["As is the sign of A. Bs is the sign of B. 0 is positive."],
  },
  {
    title: "Do the signs match?",
    height: 560,
    elements: [signs, down("a1", 94, 136), same],
    notes: ["Same signs are added. Different signs are subtracted."],
  },
  {
    title: "Same sign: add the magnitudes",
    height: 560,
    elements: [signs, down("a1", 94, 136), same, down("a2", 200, 254), add],
    notes: ["EA is the magnitude sum. The result sign will be As."],
  },
  {
    title: "Different signs: add the complement",
    height: 560,
    elements: [
      signs,
      down("a1", 94, 136),
      same,
      down("a2", 200, 254),
      add,
      down("a3", 298, 338),
      comp,
    ],
    notes: ["B' is the two's complement of the magnitude of B."],
  },
  {
    title: "The end carry E",
    height: 560,
    elements: [
      signs,
      down("a1", 94, 136),
      same,
      down("a2", 200, 254),
      add,
      down("a3", 298, 338),
      comp,
      down("a4", 382, 424),
      carry,
    ],
    notes: ["E is the carry out of the magnitude adder."],
  },
  {
    title: "+6 + +3 = +9",
    height: 640,
    elements: [
      signs,
      down("a1", 94, 136),
      same,
      down("a2", 200, 254, true),
      box("add", 276, "Same sign: EA = A + B", true),
      down("a3", 298, 338),
      comp,
      down("a4", 382, 424),
      carry,
      down("a5", 488, 508),
      box("out", 530, "As = 0, EA = 1001, AVF = 0", true),
    ],
    notes: ["0110 + 0011 = 1001. E = 0, so AVF stays 0. The result is +9."],
  },
]);

export const signedAdditionTheoryDiagram = signedAdditionStepSchematics[5];
