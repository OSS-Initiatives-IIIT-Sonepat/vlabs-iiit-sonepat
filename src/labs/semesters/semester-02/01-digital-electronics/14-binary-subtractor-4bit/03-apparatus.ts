import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "4-bit binary full adder IC",
      specification: "74HC283, DIP-16",
      quantity: "1",
    },
    {
      name: "Quad XOR IC",
      specification: "74HC86, DIP-14 (all four gates as inverters: B ⊕ 1 = B')",
      quantity: "1",
    },
    {
      name: "Input switches",
      specification: "8 poles (4 for A, 4 for B), e.g. two 4-pole DIP switches",
      quantity: "2",
    },
    {
      name: "LED",
      specification: "Green for S3-S0, yellow for carry/borrow",
      quantity: "5",
    },
    {
      name: "Resistor",
      specification: "330 ohm, 1/4 W (LED series)",
      quantity: "5",
    },
    { name: "DC power supply", specification: "+5 V regulated", quantity: "1" },
    { name: "Breadboard", specification: "830-point", quantity: "1" },
    {
      name: "Connecting wires",
      specification: "22 AWG single-core",
      quantity: "As required",
    },
  ],
};
