import { type LabSection } from "@/labs/lab-content.types";

export const observations: LabSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Data inputs are held at $I_0 = 0,\\ I_1 = 1,\\ I_2 = 1,\\ I_3 = 0$. Set the select lines and record the output and LED state.",
  ],
  table: {
    headers: [
      "S1",
      "S0",
      "Input selected",
      "Y (expected)",
      "LED state",
      "Y (observed)",
    ],
    rows: [
      ["0", "0", "I0", "0", "OFF", ""],
      ["0", "1", "I1", "1", "ON", ""],
      ["1", "0", "I2", "1", "ON", ""],
      ["1", "1", "I3", "0", "OFF", ""],
    ],
  },
};
