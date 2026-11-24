import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "analogRead() gives a count from 0 to 1023 that maps to 0 to 5 V. A voltage divider turns one known voltage into a smaller measurable one. Sensors use exactly this method, with one resistor replaced by the sensor.",
  ],
};
