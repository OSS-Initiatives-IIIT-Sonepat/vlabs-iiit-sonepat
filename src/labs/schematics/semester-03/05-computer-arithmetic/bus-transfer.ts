import { block, frames } from "../diagram";

const bus = (on = false) => block("bus", 320, 130, 200, 48, "common bus", on);
const r0 = (on = false) => block("r0", 140, 130, 80, 40, "R0", on);
const r1 = (on = false) => block("r1", 500, 130, 80, 40, "R1", on);

export const busTransferStepSchematics = frames([
  {
    title: "Two registers, one set of wires",
    elements: [r0(true), bus(), r1()],
    notes: ["A bus is a set of muxes, not a wire from every register to every other."],
  },
  {
    title: "Select R0 onto the lamps",
    elements: [r0(true), bus(true), r1()],
    notes: ["Select 0 connects R0. The other register stays off the bus."],
  },
  {
    title: "Select R1 onto the lamps",
    elements: [r0(), bus(true), r1(true)],
    notes: ["Select 1 connects R1. R0 is no longer driving the lamps."],
  },
  {
    title: "Logical shift",
    elements: [block("sh", 320, 120, 260, 48, "1011 → 0110", true)],
    notes: ["A logical shift moves every bit and fills the vacant end with 0."],
  },
  {
    title: "Circular shift",
    elements: [block("sh", 320, 120, 260, 48, "1011 → 0111", true)],
    notes: ["A circular shift puts the bit that falls off back in at the other end."],
  },
  {
    title: "Arithmetic shift",
    elements: [block("sh", 320, 120, 260, 48, "1101 → 1110", true)],
    notes: ["An arithmetic right shift copies the sign bit into the vacant place."],
  },
  {
    title: "A normalised mantissa",
    elements: [block("sh", 320, 120, 300, 48, "0.001011 → 0.101100", true)],
    notes: ["Shift until the leading digit is not zero. That is a normalised mantissa."],
  },
]);

export const busTransferTheoryDiagram = busTransferStepSchematics[1];
