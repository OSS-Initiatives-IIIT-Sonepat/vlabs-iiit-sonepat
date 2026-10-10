import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Record the actual readings obtained from the virtual instruments. The sample values below illustrate the expected format; they are not intended to replace the readings taken during the experiment.",
  ],
  table: {
    headers: ["Condition", "Diode Voltage V_D (V)", "Diode Current I_D (mA)"],
    rows: [
      ["Forward bias", "0.50", "0.00"],
      ["Forward bias", "0.60", "0.20"],
      ["Forward bias", "0.65", "0.80"],
      ["Forward bias", "0.70", "2.00"],
      ["Forward bias", "0.75", "5.00"],
      ["Reverse bias", "5.00", "0.01"],
      ["Reverse bias", "10.00", "0.02"],
    ],
  },
};
