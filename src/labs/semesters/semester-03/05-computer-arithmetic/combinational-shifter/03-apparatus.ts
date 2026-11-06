import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Breadboard",
      specification: "Long, with 5 V rails",
      quantity: "1",
    },
    {
      name: "4×1 multiplexer",
      specification: "74HC153, two muxes per chip, S1 tied to 0",
      quantity: "2",
    },
    {
      name: "Select and serial inputs",
      specification: "S, IR, and IL",
      quantity: "3",
    },
    { name: "LED", specification: "330 Ω, H0 through H3", quantity: "4" },
  ],
};
