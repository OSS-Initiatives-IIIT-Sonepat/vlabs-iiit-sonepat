import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Count word", specification: "CNT starts at 2", quantity: "1" },
    { name: "NEG1", specification: "All ones, the value −1", quantity: "1" },
    {
      name: "SZA and BUN",
      specification: "The test and the branch",
      quantity: "1",
    },
  ],
};
