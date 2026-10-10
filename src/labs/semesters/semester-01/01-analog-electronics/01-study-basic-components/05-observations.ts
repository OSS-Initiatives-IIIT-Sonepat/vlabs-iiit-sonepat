import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Record the readings taken with each instrument. Calculate the theoretical values and compare.",
  ],
  table: {
    headers: [
      "Instrument",
      "Quantity measured",
      "Observed value",
      "Expected value",
    ],
    rows: [
      ["Regulated power supply", "Output voltage", "5.0 V", "5.0 V"],
      ["Multimeter", "Voltage across 330 Ω resistor", "2.9 V", "(5 - V_LED) V"],
      ["Multimeter", "Resistance of R1", "330 Ω", "330 Ω ± 5%"],
      [
        "Function generator",
        "Set frequency / amplitude",
        "1 kHz / 5 Vpp",
        "1 kHz / 5 Vpp",
      ],
      ["CRO", "Output amplitude across C1", "4.2 Vpp", "4.2 Vpp"],
      ["CRO", "Time period / frequency", "1 ms / 1 kHz", "1 ms / 1 kHz"],
    ],
  },
};
