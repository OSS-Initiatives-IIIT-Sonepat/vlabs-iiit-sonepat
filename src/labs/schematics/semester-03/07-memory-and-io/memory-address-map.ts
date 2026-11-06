import { block, frames } from "../diagram";

export const memoryMapStepSchematics = frames([
  {
    title: "The memory hierarchy",
    height: 340,
    elements: [
      block("tape", 320, 50, 160, 32, "tape"),
      block("disk", 320, 100, 160, 32, "disk"),
      block("main", 320, 150, 160, 32, "main", true),
      block("cache", 320, 200, 160, 32, "cache"),
      block("regs", 320, 250, 160, 32, "registers"),
    ],
    notes: ["Closer to the CPU is faster and smaller."],
  },
  {
    title: "SRAM and DRAM",
    elements: [
      block("sram", 180, 120, 180, 56, "SRAM: a latch", true),
      block("dram", 460, 120, 180, 56, "DRAM: a capacitor"),
    ],
    notes: [
      "SRAM keeps a bit in a latch. DRAM keeps it on a capacitor and must be refreshed.",
    ],
  },
  {
    title: "High address bit selects the ROM",
    elements: [
      block("dec", 160, 120, 140, 56, "74HC138", true),
      block("r0", 400, 80, 140, 40, "ROM 0  0011"),
      block("r1", 400, 160, 140, 40, "ROM 1  1100", true),
    ],
    notes: [
      "Four 1K×8 PROMs make a 4K×8 map. This board uses two ROMs and one select bit.",
    ],
  },
  {
    title: "Select 0 lights 0011",
    elements: [
      block("r0", 220, 120, 180, 48, "ROM 0 = 0011", true),
      block("r1", 460, 120, 180, 48, "ROM 1 off"),
    ],
    notes: [
      "The decoder's Y0 enables ROM 0. ROM 1 must not drive the data lamps.",
    ],
  },
  {
    title: "Select 1 lights 1100",
    elements: [
      block("r0", 220, 120, 180, 48, "ROM 0 off"),
      block("r1", 460, 120, 180, 48, "ROM 1 = 1100", true),
    ],
    notes: ["Y1 enables ROM 1. The shared data pins now show 1100."],
  },
]);

export const memoryMapTheoryDiagram = memoryMapStepSchematics[2];
