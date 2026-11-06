import { frames, hop, icBox, ledChain, stub } from "../diagram";

export const arrayMultiplierStepSchematics = frames([
  {
    title: "Partial products, then one adder row",
    elements: [
      ...icBox("pp", 60, 80, 140, 90, "AND array"),
      ...icBox("add", 250, 80, 150, 90, "74HC283"),
      hop("h", 200, 250, 125),
    ],
    notes: [
      "Each AND is one bit of a partial product",
      "The adder sums a column, the shift is in the wiring",
    ],
  },
  {
    title: "Four AND gates",
    elements: [
      ...icBox("p0", 40, 70, 90, 70, "A0·B0", true),
      ...icBox("p1", 150, 70, 90, 70, "A1·B0", true),
      ...icBox("p2", 260, 70, 90, 70, "A0·B1", true),
      ...icBox("p3", 370, 70, 90, 70, "A1·B1", true),
    ],
    notes: ["11 × 11 will make every product 1"],
  },
  {
    title: "Shift the products into the adder",
    elements: [
      ...icBox("p0", 40, 90, 90, 70, "P0"),
      ...icBox("add", 280, 70, 160, 120, "74HC283", true),
      ...stub("a", "A1", 100, 280, true),
      ...stub("b", "B1", 130, 280, true),
      ...stub("c", "B2", 160, 280, true),
    ],
    notes: [
      "A1 is A1·B0, B1 is A0·B1, B2 is A1·B1",
      "P0 is already the least significant bit",
    ],
  },
  {
    title: "Product LEDs",
    elements: [
      ...icBox("add", 80, 70, 160, 120, "74HC283"),
      ...ledChain("p0", 240, 100, "P0", true),
      ...ledChain("s", 240, 155, "S", true),
    ],
    notes: ["P0, S1, S2, S3 — S3 is the high bit of a 2-bit multiply"],
  },
  {
    title: "3 × 3 = 9, which is 1001",
    elements: [
      ...icBox("add", 70, 70, 160, 110, "74HC283", true),
      ...stub("ab", "A=11 B=11", 120, 70, true),
      ...ledChain("p", 230, 110, "1001", true),
    ],
    notes: ["P0 on, S1 off, S2 off, S3 on"],
  },
  {
    title: "Same product, row by row",
    elements: [
      ...icBox("row", 140, 70, 200, 120, "adder row"),
      ...stub("c1", "col1: 1+1", 110, 140),
      ...stub("c2", "col2: 1+carry", 150, 140),
    ],
    notes: [
      "Column 1 sums to 0 and sends a carry",
      "Column 2 plus that carry sums to 0 and sends the 1 in S3",
    ],
  },
]);

export const arrayMultiplierTheoryDiagram = arrayMultiplierStepSchematics[2];
