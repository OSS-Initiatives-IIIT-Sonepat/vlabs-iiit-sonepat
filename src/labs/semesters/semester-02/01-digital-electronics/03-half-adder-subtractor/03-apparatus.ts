import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  title: "Apparatus",
  type: "apparatus",
  items: [
    {
      name: "Long breadboard",
      specification: "60 columns, with power rails",
      quantity: "1",
    },
    { name: "XOR gate IC", specification: "74HC86", quantity: "1" },
    {
      name: "AND gate IC",
      specification: "74HC08 (gate 1 Carry, gate 2 Borrow)",
      quantity: "1",
    },
    { name: "NOT gate IC", specification: "74HC04", quantity: "1" },
    { name: "Resistor", specification: "330 Ω", quantity: "3" },
    { name: "LED", specification: "Green, yellow and red", quantity: "3" },
    { name: "DC power supply", specification: "5 V regulated", quantity: "1" },
    {
      name: "Jumper wires",
      specification: "Red, blue, white, green, yellow, orange, purple, black",
      quantity: "As required",
    },
  ],
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/03_apparatus_english.mp3",
};
