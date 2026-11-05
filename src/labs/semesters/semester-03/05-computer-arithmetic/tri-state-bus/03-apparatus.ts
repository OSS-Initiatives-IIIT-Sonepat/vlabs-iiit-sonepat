import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Breadboard", specification: "Long, with 5 V rails", quantity: "1" },
    { name: "Tri-state buffer", specification: "74HC125, A0 B0 C0 D0", quantity: "4" },
    { name: "2×4 decoder", specification: "74HC139, active-low outputs", quantity: "1" },
    { name: "Data ties", specification: "A0 = 1, B0 = 0, C0 = 1, D0 = 0", quantity: "4" },
    { name: "LED", specification: "330 Ω, bus line for bit 0", quantity: "1" },
  ],
};
