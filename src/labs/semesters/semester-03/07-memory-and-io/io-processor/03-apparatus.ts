import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Command", specification: "Write a block", quantity: "1" },
    { name: "Channel program", specification: "In memory, fetched by the IOP", quantity: "1" },
    { name: "Status", specification: "Written when the IOP finishes", quantity: "1" },
  ],
};
