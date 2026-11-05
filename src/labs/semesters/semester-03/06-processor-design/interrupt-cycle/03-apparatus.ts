import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Interrupt enable",
      specification: "IEN starts at 1",
      quantity: "1",
    },
    { name: "Input flag", specification: "FGI, 0 then 1", quantity: "1" },
    { name: "Interrupt flip-flop", specification: "R", quantity: "1" },
    {
      name: "Temporary register",
      specification: "TR holds the return address",
      quantity: "1",
    },
    {
      name: "Memory word 0",
      specification: "Reserved for the return address",
      quantity: "1",
    },
  ],
};
