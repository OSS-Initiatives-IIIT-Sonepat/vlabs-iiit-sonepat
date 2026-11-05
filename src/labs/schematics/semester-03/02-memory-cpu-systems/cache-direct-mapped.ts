import { frames, hop, icBox, ledChain, stub } from "../diagram";

export const cacheDirectStepSchematics = frames([
  {
    title: "Index selects the line. Tag must match.",
    elements: [
      ...icBox("dec", 40, 70, 120, 100, "index"),
      ...icBox("tag", 200, 70, 110, 100, "tag"),
      ...icBox("and", 360, 75, 100, 90, "AND"),
      hop("a", 160, 200, 120),
      hop("b", 310, 360, 120),
    ],
    notes: ["Hit = line selected AND tag equal"],
  },
  {
    title: "Index 0 selects Y0",
    elements: [
      ...icBox("dec", 140, 60, 180, 140, "74HC138", true),
      ...stub("i", "index", 110, 140, true),
      ...stub("a", "A1 = A2 = 0", 155, 140),
    ],
    notes: ["Y0 is active-low", "A NOT turns it into an active-high line LED"],
  },
  {
    title: "Tag XOR stored 1",
    elements: [
      ...icBox("xor", 150, 70, 160, 110, "XOR", true),
      ...stub("t", "tag", 110, 150, true),
      ...stub("s", "stored 1", 155, 150),
    ],
    notes: ["XOR is 0 when the tag matches", "A second NOT makes match = 1"],
  },
  {
    title: "AND them for the hit",
    elements: [
      ...icBox("line", 50, 80, 110, 80, "line"),
      ...icBox("match", 200, 80, 110, 80, "match"),
      ...icBox("hit", 370, 75, 100, 90, "HIT", true),
      hop("a", 160, 200, 120),
      hop("b", 310, 370, 120, true),
    ],
    notes: ["Both have to be 1"],
  },
  {
    title: "Index 0, tag 1: hit",
    elements: [
      ...icBox("line", 50, 80, 120, 80, "line 0", true),
      ...icBox("hit", 240, 75, 120, 90, "HIT", true),
      hop("h", 170, 240, 120, true),
      ...ledChain("hit", 360, 120, "HIT", true),
    ],
    notes: ["Line LED and hit LED are both on"],
  },
  {
    title: "Index 1, same tag: conflict miss",
    elements: [
      ...icBox("line", 50, 80, 140, 90, "line 0 off", true),
      ...icBox("tag", 250, 80, 140, 90, "tag still 1"),
      ...ledChain("hit", 390, 125, "miss"),
    ],
    notes: ["The tag matches and the line does not", "Direct mapping allows that block in only one line"],
  },
]);

export const cacheDirectTheoryDiagram = cacheDirectStepSchematics[0];
