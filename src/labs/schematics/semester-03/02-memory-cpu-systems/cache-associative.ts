import { frames, hop, icBox, ledChain, stub } from "../diagram";

const cmp = (hl = false) => [
  ...icBox("x0", 40, 80, 100, 80, "XOR", hl),
  ...icBox("x1", 180, 80, 100, 80, "XOR", hl),
  ...icBox("nor", 340, 70, 110, 100, "NOR", hl),
];

export const cacheAssociativeStepSchematics = frames([
  {
    title: "A hit is a tag match, in any line",
    elements: [...cmp()],
    notes: ["Stored tag is 10", "NOR is 1 only when both XORs are 0"],
  },
  {
    title: "Compare each tag bit",
    elements: [
      ...icBox("x0", 70, 70, 130, 100, "T0 ⊕ 0", true),
      ...icBox("x1", 250, 70, 130, 100, "T1 ⊕ 1", true),
    ],
    notes: ["S0 is tied to ground", "S1 is tied to +5 V"],
  },
  {
    title: "NOR the two differences",
    elements: [...cmp(true), hop("a", 140, 180, 115), hop("b", 280, 340, 120, true)],
    notes: ["A match on both bits makes both XOR outputs 0"],
  },
  {
    title: "Hit LED",
    elements: [
      ...icBox("nor", 70, 70, 140, 110, "NOR"),
      ...ledChain("hit", 210, 125, "HIT", true),
    ],
    notes: ["330 ohm from the NOR output to the LED"],
  },
  {
    title: "Tag 10 hits. Tag 11 misses.",
    elements: [
      ...icBox("tag", 60, 70, 160, 110, "tag", true),
      ...stub("t", "10", 120, 60, true),
      ...ledChain("hit", 220, 125, "HIT", true),
    ],
    notes: ["Change T0 to 1 and the LED goes out", "There is no index. The compare is the whole address check."],
  },
]);

export const cacheAssociativeTheoryDiagram = cacheAssociativeStepSchematics[0];
