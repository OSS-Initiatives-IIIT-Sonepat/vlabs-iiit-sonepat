import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "Long breadboard", specification: "60 columns", quantity: 1 },
    { name: "D flip-flop IC", specification: "74HC74 (dual)", quantity: 2 },
    { name: "XOR gate IC", specification: "74HC86", quantity: 1 },
    { name: "AND gate IC", specification: "74HC08", quantity: 1 },
    { name: "OR gate IC", specification: "74HC32", quantity: 1 },
    { name: "NAND gate IC", specification: "74HC00", quantity: 1 },
    { name: "Resistor", specification: "330 Ω", quantity: 3 },
    { name: "LED", specification: "Red, yellow, green", quantity: 3 },
    { name: "DC power supply", specification: "5 V", quantity: 1 },
    { name: "Function generator", specification: "1 Hz square wave, 0–5 V", quantity: 1 },
    { name: "Connecting wires", quantity: 1 },
  ],
};
