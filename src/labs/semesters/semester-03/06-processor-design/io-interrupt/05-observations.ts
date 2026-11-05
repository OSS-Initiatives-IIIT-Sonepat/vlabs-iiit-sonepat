import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A key sets FGI and fills INPR. The computer copies that character into AC(0-7) and clears FGI. FGO starts at 1. The computer copies AC(0-7) into OUTR, clears FGO, and the printer sets FGO again when the character has been printed.",
    "INP, OUT, SKI, SKO, ION, and IOF are the six input-output instructions. An interrupt with IEN set and either flag set makes R = 1. The interrupt cycle then stores PC at location 0, forces PC to 1, and clears IEN, R, and SC. In the demonstration, 256 is the saved return address.",
  ],
  table: {
    headers: ["What", "Condition", "Transfer"],
    rows: [
      ["INP", "pB11", "AC(0-7) ← INPR, FGI ← 0"],
      ["OUT", "pB10", "OUTR ← AC(0-7), FGO ← 0"],
      ["SKI", "pB9", "If (FGI = 1) then (PC ← PC + 1)"],
      ["SKO", "pB8", "If (FGO = 1) then (PC ← PC + 1)"],
      ["ION", "pB7", "IEN ← 1"],
      ["IOF", "pB6", "IEN ← 0"],
      ["R ← 1", "T0' T1' T2' IEN (FGI + FGO)", "R ← 1"],
      ["RT0", "R = 1", "AR ← 0, TR ← PC"],
      ["RT1", "R = 1", "M[0] ← TR, PC ← 0"],
      ["RT2", "R = 1", "PC ← 1, IEN ← 0, R ← 0, SC ← 0"],
    ],
  },
};
