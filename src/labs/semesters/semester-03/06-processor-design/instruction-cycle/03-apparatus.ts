import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Program counter",
      specification: "PC, 12 bits, address of the next instruction",
      quantity: "1",
    },
    {
      name: "Address register",
      specification: "AR, 12 bits, the address sent to memory",
      quantity: "1",
    },
    {
      name: "Instruction register",
      specification: "IR, 16 bits",
      quantity: "1",
    },
    {
      name: "Sequence counter",
      specification: "SC, 4 bits, decoded into T0 through T15",
      quantity: "1",
    },
    {
      name: "Opcode decoder",
      specification: "3 × 8, IR(12-14) into D0 through D7",
      quantity: "1",
    },
    {
      name: "Mode flip-flop",
      specification: "I, loaded from IR(15)",
      quantity: "1",
    },
  ],
};
