import { block, frames, memword } from "../diagram";

export const cacheVirtualStepSchematics = frames([
  {
    title: "Associative cache",
    elements: [
      block("tag", 200, 120, 160, 56, "tag compare", true),
      block("data", 460, 120, 160, 56, "cache word"),
    ],
    notes: ["Every line is compared. A hit is any tag that matches."],
  },
  {
    title: "Direct mapping, 32K words, 15-bit address",
    elements: [
      memword("addr", 140, 120, "15 bit", "index", "tag", true),
      block("line", 500, 120, 120, 48, "one line"),
    ],
    notes: [
      "32K words need 15 address bits. The index picks the only line that may hold this address.",
    ],
  },
  {
    title: "Set-associative cache",
    elements: [
      block("s0", 180, 120, 120, 48, "way 0", true),
      block("s1", 360, 120, 120, 48, "way 1", true),
      block("idx", 520, 120, 100, 48, "set"),
    ],
    notes: [
      "The index picks a set. The tag is compared with each way in that set.",
    ],
  },
  {
    title: "One page is in memory, one is not",
    height: 300,
    elements: [
      memword("p0", 160, 100, "page 0", "frame 3", "in memory", true),
      memword("p1", 160, 160, "page 1", "—", "on disk"),
    ],
    notes: [
      "The page table says where the page is. A missing page is a page fault.",
    ],
  },
]);

export const cacheVirtualTheoryDiagram = cacheVirtualStepSchematics[1];
