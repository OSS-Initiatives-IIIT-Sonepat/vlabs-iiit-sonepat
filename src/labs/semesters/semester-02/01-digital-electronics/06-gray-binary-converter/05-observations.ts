import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Supply voltage VCC = +5 V DC was maintained across the solderless breadboard. The 74HC86 Quad 2-Input XOR IC operated from the common +5 V rail and 0 V ground reference.",
    "Logic HIGH (1) corresponds to illuminated LED (~2.0–3.0 V) and logic LOW (0) corresponds to extinguished LED (~0 V). The four output bits are monitored by color-coded LEDs: G₃ = Red, G₂ = Yellow, G₁ = Green, G₀ = Blue with 330 Ω series current-limiting resistors.",
    "All sixteen 4-bit binary input combinations (0000₂ to 1111₂) were applied and verified. Notice the unit-distance property: each successive Gray code word differs from the previous one in exactly one bit position, eliminating transitional switching ambiguity.",
  ],
  table: {
    headers: [
      "Decimal",
      "Binary Input (B₃ B₂ B₁ B₀)",
      "Output G₃ (Red)",
      "Output G₂ (Yellow)",
      "Output G₁ (Green)",
      "Output G₀ (Blue)",
      "Gray Code",
    ],
    rows: [
      ["0", "0 0 0 0", "0", "0", "0", "0", "0000"],
      ["1", "0 0 0 1", "0", "0", "0", "1", "0001"],
      ["2", "0 0 1 0", "0", "0", "1", "1", "0011"],
      ["3", "0 0 1 1", "0", "0", "1", "0", "0010"],
      ["4", "0 1 0 0", "0", "1", "1", "0", "0110"],
      ["5", "0 1 0 1", "0", "1", "1", "1", "0111"],
      ["6", "0 1 1 0", "0", "1", "0", "1", "0101"],
      ["7", "0 1 1 1", "0", "1", "0", "0", "0100"],
      ["8", "1 0 0 0", "1", "1", "0", "0", "1100"],
      ["9", "1 0 0 1", "1", "1", "0", "1", "1101"],
      ["10", "1 0 1 0", "1", "1", "1", "1", "1111"],
      ["11", "1 0 1 1", "1", "1", "1", "0", "1110"],
      ["12", "1 1 0 0", "1", "0", "1", "0", "1010"],
      ["13", "1 1 0 1", "1", "0", "1", "1", "1011"],
      ["14", "1 1 1 0", "1", "0", "0", "1", "1001"],
      ["15", "1 1 1 1", "1", "0", "0", "0", "1000"],
    ],
  },
};
