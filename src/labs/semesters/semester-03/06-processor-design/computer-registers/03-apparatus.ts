import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Memory", specification: "4096 words x 16 bits", quantity: "1" },
    { name: "Address registers", specification: "PC and AR, 12 bits each", quantity: "2" },
    { name: "Data registers", specification: "IR, TR, DR, and AC, 16 bits each", quantity: "4" },
    { name: "Character registers", specification: "INPR and OUTR, 8 bits each", quantity: "2" },
    { name: "Common bus", specification: "16 lines, selected by S2 S1 S0", quantity: "1" },
  ],
};
