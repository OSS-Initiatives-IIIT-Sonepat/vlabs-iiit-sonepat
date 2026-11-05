import { type SchematicData } from "@/labs/CircuitSchematic";

import {
  binaryAdder4bitStepSchematics,
  binaryAdder4bitTheoryDiagram,
} from "../01-digital-electronics/13-binary-adder-4bit";

/** Seven frames for the ripple-carry procedure, drawn as full-adder blocks. */
export const fullAdderRippleStepSchematics: SchematicData[] = [
  binaryAdder4bitStepSchematics[0],
  binaryAdder4bitStepSchematics[4],
  binaryAdder4bitStepSchematics[7],
  binaryAdder4bitStepSchematics[8],
  binaryAdder4bitStepSchematics[9],
  binaryAdder4bitStepSchematics[10],
  binaryAdder4bitStepSchematics[11],
];

export const fullAdderRippleTheoryDiagram = binaryAdder4bitTheoryDiagram;
