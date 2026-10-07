import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "Breadboard", specification: "830-point", quantity: 1 },
    { name: "DC power supply", specification: "+5 V", quantity: 1 },
    { name: "74HC74 dual D flip-flop IC", specification: "DIP-14, positive-edge triggered", quantity: 1 },
    { name: "Resistor", specification: "330 Ω", quantity: 2 },
    { name: "LED", specification: "Green (Q) and Yellow (Q\u0305)", quantity: 2 },
    { name: "Connecting wires", specification: "Single-core jumper", quantity: 1 },
  ],
};
