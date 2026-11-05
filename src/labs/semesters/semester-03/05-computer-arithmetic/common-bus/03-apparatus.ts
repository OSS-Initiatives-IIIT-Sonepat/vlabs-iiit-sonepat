import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Breadboard", specification: "Long, with 5 V rails", quantity: "1" },
    { name: "4×1 multiplexer", specification: "74HC153, one per bus line", quantity: "4" },
    { name: "Register A", specification: "Tied to 1 0 0 1, input 0 of each mux", quantity: "1" },
    { name: "Register B", specification: "Tied to 0 1 1 0, input 1", quantity: "1" },
    { name: "Register C", specification: "Tied to 1 1 0 0, input 2", quantity: "1" },
    { name: "Register D", specification: "Tied to 0 0 1 1, input 3", quantity: "1" },
    { name: "LED", specification: "330 Ω, bits 3 and 2 red, bits 1 and 0 green", quantity: "4" },
  ],
};
