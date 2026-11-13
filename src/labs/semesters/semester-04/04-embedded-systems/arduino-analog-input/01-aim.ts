import { type TheorySection } from "@/labs/lab-content.types";

export const aim: TheorySection = {
  id: "aim",
  type: "text",
  title: "Aim",
  paragraphs: [
    "To read an analog voltage with analogRead(), convert the 0 to 1023 reading back into volts, and check it against a voltage divider calculated by hand.",
  ],
};
