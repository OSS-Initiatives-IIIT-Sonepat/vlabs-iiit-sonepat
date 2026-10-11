import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Supply voltage VCC = +5 V DC was maintained across the solderless breadboard. All logic gate ICs (74HC04, 74HC08, 74HC32, and 74HC86) operated from the common +5 V rail and 0 V ground reference.",
    "Output states were recorded using four current-limited LED indicators (W = Red, X = Yellow, Y = Green, Z = Blue with 330 Ω series resistors). Logic HIGH (1) corresponds to illuminated LED (~2.0–3.0 V) and logic LOW (0) corresponds to extinguished LED (~0 V).",
    "All ten valid BCD input combinations (0000₂ to 1001₂) were applied and verified against the theoretical Excess-3 code (XS-3 = BCD + 0011₂). Binary patterns 1010₂ through 1111₂ are don't-care states not present in BCD encoding.",
  ],
  table: {
    headers: [
      "Decimal",
      "BCD Input (A B C D)",
      "Output W (Red)",
      "Output X (Yellow)",
      "Output Y (Green)",
      "Output Z (Blue)",
      "Excess-3 Code",
      "XS-3 Decimal",
    ],
    rows: [
      ["0", "0 0 0 0", "0", "0", "1", "1", "0011", "3"],
      ["1", "0 0 0 1", "0", "1", "0", "0", "0100", "4"],
      ["2", "0 0 1 0", "0", "1", "0", "1", "0101", "5"],
      ["3", "0 0 1 1", "0", "1", "1", "0", "0110", "6"],
      ["4", "0 1 0 0", "0", "1", "1", "1", "0111", "7"],
      ["5", "0 1 0 1", "1", "0", "0", "0", "1000", "8"],
      ["6", "0 1 1 0", "1", "0", "0", "1", "1001", "9"],
      ["7", "0 1 1 1", "1", "0", "1", "0", "1010", "10"],
      ["8", "1 0 0 0", "1", "0", "1", "1", "1011", "11"],
      ["9", "1 0 0 1", "1", "1", "0", "0", "1100", "12"],
    ],
  },
};
