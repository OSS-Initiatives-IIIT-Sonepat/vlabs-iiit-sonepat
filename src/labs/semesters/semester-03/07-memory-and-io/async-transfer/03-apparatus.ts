import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Data", specification: "0101", quantity: "1" },
    {
      name: "Strobe",
      specification: "One pulse from the source",
      quantity: "1",
    },
    {
      name: "Handshake wires",
      specification: "Data valid and acknowledge",
      quantity: "1",
    },
  ],
};
