import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Memory", specification: "4096 × 16", quantity: "1" },
    {
      name: "Common bus",
      specification: "One driver at a time",
      quantity: "1",
    },
    {
      name: "Processor registers",
      specification: "AR, PC, DR, AC, IR",
      quantity: "1",
    },
    { name: "I/O registers", specification: "INPR and OUTR", quantity: "1" },
    {
      name: "Control unit",
      specification: "Sequence counter and decoder",
      quantity: "1",
    },
  ],
};
