import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    {
      name: "Digital IC trainer / +5 V DC supply",
      specification: "Regulated 5 V",
      quantity: "1",
    },
    { name: "Breadboard", specification: "Long, 60 columns", quantity: "1" },
    { name: "NOT gate IC", specification: "74HC04", quantity: "1" },
    { name: "AND gate IC", specification: "74HC08", quantity: "1" },
    { name: "OR gate IC", specification: "74HC32", quantity: "1" },
    { name: "NAND gate IC", specification: "74HC00", quantity: "1" },
    { name: "NOR gate IC", specification: "74HC02", quantity: "1" },
    { name: "EX-OR gate IC", specification: "74HC86", quantity: "1" },
    { name: "EX-NOR gate IC", specification: "74HC266", quantity: "1" },
    { name: "Resistor", specification: "330 Ω, 1/4 W", quantity: "7" },
    { name: "LED", specification: "5 mm, assorted colours", quantity: "7" },
    {
      name: "Connecting wires",
      specification: "Single-core, jumper type",
      quantity: "As required",
    },
  ],
};
