import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Count", specification: "Starts at 3", quantity: "1" },
    { name: "Address", specification: "Starts at 200", quantity: "1" },
    { name: "Bus", specification: "Granted by the CPU", quantity: "1" },
  ],
};
