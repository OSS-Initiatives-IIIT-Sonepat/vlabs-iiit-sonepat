import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Breadboard", specification: "Long, with 5 V rails", quantity: "1" },
    { name: "4-bit adder", specification: "74HC283, four full adders in one package", quantity: "1" },
    { name: "Augend A", specification: "Tied to 1 1 0 1", quantity: "1" },
    { name: "Addend B", specification: "Tied to 0 1 1 1", quantity: "1" },
    { name: "LED", specification: "330 Ω, carry C4 and sum bits S3 to S0", quantity: "5" },
  ],
};
