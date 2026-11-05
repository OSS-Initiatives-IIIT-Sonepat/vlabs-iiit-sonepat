import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Subroutine entry", specification: "Address 108, holds the return address", quantity: "1" },
    { name: "Input flag FGI", specification: "1 when a character is ready", quantity: "1" },
    { name: "INPR", specification: "The input character, here 0101", quantity: "1" },
  ],
};
