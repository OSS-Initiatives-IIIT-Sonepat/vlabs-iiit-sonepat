import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Compare the ADC reading with the voltage calculated from the divider."],
  table: {
    headers: ["Bottom resistor", "Middle voltage", "Expected ADC", "LED"],
    rows: [
      ["10 kohm", "2.50 V", "512", "Off (at threshold)"],
      ["20 kohm", "3.33 V", "682", "On"],
      ["5 kohm", "1.67 V", "341", "Off"],
    ],
  },
};
