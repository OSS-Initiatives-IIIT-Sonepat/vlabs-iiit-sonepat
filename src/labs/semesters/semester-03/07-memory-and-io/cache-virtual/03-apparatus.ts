import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
  {
    "name": "Tag comparator",
    "specification": "Compared with one line, or with every line",
    "quantity": "1"
  },
  {
    "name": "Cache line",
    "specification": "Tag plus the stored word",
    "quantity": "1"
  },
  {
    "name": "Page table",
    "specification": "Page number to frame number",
    "quantity": "1"
  }
],
};
