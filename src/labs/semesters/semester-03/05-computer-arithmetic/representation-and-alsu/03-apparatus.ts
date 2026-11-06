import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Register R1", specification: "Holds 0110", quantity: "1" },
    {
      name: "Register R2",
      specification: "Holds 0011, then receives R1",
      quantity: "1",
    },
    {
      name: "Three-state buffer",
      specification: "Enable E puts R1 on the bus",
      quantity: "1",
    },
    {
      name: "Arithmetic logic shift unit",
      specification: "Add, xor, or shift",
      quantity: "1",
    },
  ],
};
