import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Uniprocessor",
      specification: "One program, one data path",
      quantity: "1",
    },
    {
      name: "Array",
      specification: "One program, many data paths",
      quantity: "1",
    },
  ],
};
