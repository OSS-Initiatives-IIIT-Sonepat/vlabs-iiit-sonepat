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
      name: "4-bit adder",
      specification: "74HC283, the parallel adder",
      quantity: "1",
    },
    {
      name: "4×1 multiplexer",
      specification: "74HC153, one per bit, Y from B, B', 0, or 1",
      quantity: "4",
    },
    {
      name: "Select and carry",
      specification: "S1, S0, and Cin",
      quantity: "3",
    },
    { name: "LED", specification: "330 Ω, Cout and D3 to D0", quantity: "5" },
  ],
};
