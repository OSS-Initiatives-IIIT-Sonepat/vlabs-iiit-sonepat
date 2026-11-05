import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Address field", specification: "200, or the immediate value 25", quantity: "1" },
    { name: "Index register", specification: "100", quantity: "1" },
    { name: "Program counter", specification: "400, displacement 20 for relative", quantity: "1" },
  ],
};
