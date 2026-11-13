import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: ["Change the divider and compare the ADC output with the calculated code."],
  table: {
    headers: ["VIN+", "Calculated code", "Binary (DB7 to DB0)", "Measured"],
    rows: [
      ["1.25 V", 64, "0100 0000", "-"],
      ["2.50 V", 128, "1000 0000", "128"],
      ["3.75 V", 192, "1100 0000", "-"],
    ],
  },
};
