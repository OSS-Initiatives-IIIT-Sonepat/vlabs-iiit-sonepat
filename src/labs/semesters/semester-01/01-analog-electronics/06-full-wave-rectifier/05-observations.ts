import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The secondary voltage across each half of the center-tapped transformer winding was measured as $V_{rms} = 12.0\\text{ V}$ with respect to the center tap (CT), corresponding to a peak input voltage $V_m \\approx 16.97\\text{ V}$.",
    "Measurements were recorded across the $1\\text{ k}\\Omega$ load resistor $R_L$ for both unfiltered full-wave output and filtered output with the $100\\ \\mu\\text{F}$ shunt capacitor.",
  ],
  table: {
    headers: [
      "Circuit Parameter",
      "Theoretical Value",
      "Measured Value (Unfiltered)",
      "Measured Value (With Filter C1 = 100 µF)",
    ],
    rows: [
      [
        "Secondary AC Voltage per half ($V_{rms}$)",
        "12.0 V",
        "12.0 V",
        "12.0 V",
      ],
      ["Peak Input Voltage ($V_m$)", "16.97 V", "16.97 V", "16.97 V"],
      ["Diode Forward Drop ($V_D$)", "0.70 V (1N4007)", "0.70 V", "0.70 V"],
      [
        "DC Output Voltage ($V_{dc}$)",
        "10.36 V ($2(V_m - V_D)/\\pi$)",
        "10.30 V",
        "15.80 V",
      ],
      [
        "RMS Output Voltage ($V_{rms}$)",
        "11.50 V ($(V_m - V_D)/\\sqrt{2}$)",
        "11.45 V",
        "15.82 V",
      ],
      ["Ripple Frequency ($f_r$)", "100 Hz ($2f_{in}$)", "100 Hz", "100 Hz"],
      ["Ripple Factor ($\\gamma$)", "0.482", "0.485", "0.029"],
      ["Rectification Efficiency ($\\eta$)", "81.2%", "80.8%", "—"],
      ["Peak Inverse Voltage (PIV)", "33.94 V ($2V_m$)", "33.94 V", "33.94 V"],
    ],
  },
};
