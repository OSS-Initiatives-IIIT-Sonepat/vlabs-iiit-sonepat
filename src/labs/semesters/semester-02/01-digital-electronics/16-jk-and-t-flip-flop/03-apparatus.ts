import { type LabSection } from "@/labs/lab-content.types";

export const apparatus: LabSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus",
  items: [
    { name: "Digital breadboard", specification: "Virtual 60-column breadboard", quantity: 1 },
    { name: "JK flip-flop IC", specification: "74HC76-equivalent virtual JK flip-flop", quantity: 2 },
    { name: "DC power supply", specification: "5 V DC", quantity: 1 },
    { name: "Clock source", specification: "Digital clock", quantity: 1 },
    { name: "Input switches", specification: "J, K and T logic inputs", quantity: 3 },
    { name: "LED indicators", specification: "Q and Q̅ output indication", quantity: 4 },
    { name: "Current-limiting resistors", specification: "330 Ω", quantity: 4 }
  ],
};
