import { type ComponentInstance } from "@/labs/types";
import {
  ids,
  input,
  lamp,
  power,
  powers,
  stage,
} from "@/labs/semesters/semester-03/_coa/breadboard";

const powerParts = power();
const stages: [string, string, number, number][] = [
  ["if0", "IF", 6, 4],
  ["id0", "ID", 16, 14],
  ["ex0", "EX", 26, 24],
  ["wb0", "WB", 36, 34],
];

const chipParts: ComponentInstance[] = stages.flatMap(
  ([id, name, col, hole]) => [
    stage(id, name, col),
    ...powers(id, col),
    input(
      id === "if0" ? "t0" : id === "id0" ? "t1" : id === "ex0" ? "t2" : "t3",
      id,
      "out",
      hole,
      "yellow",
    ),
  ],
);

const lampParts: ComponentInstance[] = [
  ...lamp("if", "if0", "out", 46, "c", "green"),
  ...lamp("id", "id0", "out", 52, "c", "green"),
  ...lamp("ex", "ex0", "out", 46, "h", "yellow"),
  ...lamp("wb", "wb0", "out", 52, "h", "yellow"),
];

export const shown = {
  power: ids(powerParts),
  chips: ids(chipParts),
  lamps: ids(lampParts),
};

export const components: ComponentInstance[] = [
  ...powerParts,
  ...chipParts,
  ...lampParts,
];
