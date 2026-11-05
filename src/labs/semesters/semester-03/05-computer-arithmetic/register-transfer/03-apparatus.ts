import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Breadboard", specification: "Long, with 5 V rails", quantity: "1" },
    { name: "Register R1", specification: "4-bit, loaded with 1 1 0 1", quantity: "1" },
    { name: "Register R2", specification: "4-bit destination", quantity: "1" },
    { name: "AND gate", specification: "P AND clock, the load of R2", quantity: "1" },
    { name: "Function generator", specification: "The clock", quantity: "1" },
    { name: "LED", specification: "330 Ω, four red for R1, four green for R2, one for Load", quantity: "9" },
  ],
};
