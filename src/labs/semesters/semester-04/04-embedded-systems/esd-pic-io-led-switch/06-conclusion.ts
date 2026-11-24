import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "TRIS sets each pin's direction, PORT reads an input, and LAT drives an output. A pull-down keeps an open input defined, and a sketch-style loop maps the button onto the LED.",
  ],
};
