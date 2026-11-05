import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "PC and AR are 12 bits, because the memory has 4096 words. IR, TR, DR, and AC are 16 bits, the width of one memory word. INPR and OUTR are 8 bits, the width of one character.",
    "The common bus carries one word at a time. S2 S1 S0 = 100 places AC on the bus, and LD of DR completes DR ← AC. S2 S1 S0 = 011 places DR on the bus, and LD of AC completes AC ← DR.",
  ],
  table: {
    headers: ["Select", "S2 S1 S0", "Unit on the bus"],
    rows: [
      ["1", "001", "AR"],
      ["2", "010", "PC"],
      ["3", "011", "DR"],
      ["4", "100", "AC"],
      ["5", "101", "IR"],
      ["6", "110", "TR"],
      ["7", "111", "Memory"],
    ],
  },
};
