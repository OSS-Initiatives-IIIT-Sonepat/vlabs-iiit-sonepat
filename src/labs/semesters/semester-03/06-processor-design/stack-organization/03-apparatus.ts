import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Register stack",
      specification: "64 words, 6-bit SP, FULL and EMTY",
      quantity: "1",
    },
    {
      name: "Data register",
      specification: "Word pushed or popped",
      quantity: "1",
    },
    {
      name: "Memory stack",
      specification: "Grows down from address 4000",
      quantity: "1",
    },
  ],
};
