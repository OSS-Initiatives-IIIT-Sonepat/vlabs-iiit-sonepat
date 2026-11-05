import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Sequence counter",
      specification: "SC, cleared to 0 so the cycle begins at T0",
      quantity: "1",
    },
    {
      name: "Flip-flops",
      specification: "R, IEN, and the instruction bit I",
      quantity: "3",
    },
    {
      name: "Registers",
      specification: "PC, AR, IR, and the temporary register TR",
      quantity: "4",
    },
    {
      name: "Decoder outputs",
      specification: "D0 through D7, from IR(12-14)",
      quantity: "8",
    },
    {
      name: "Memory",
      specification: "location 0 holds a saved return address",
      quantity: "1",
    },
  ],
};
