import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    { name: "Breadboard", specification: "Wide, 100 columns, with 5 V rails", quantity: "1" },
    { name: "4-bit adder", specification: "74HC283", quantity: "1" },
    { name: "Quad AND, OR, and XOR", specification: "74HC08, 74HC32, and 74HC86", quantity: "1 each" },
    { name: "Hex inverter", specification: "74HC04, complement of A", quantity: "1" },
    { name: "4×1 multiplexer", specification: "74HC153, Y, the logic function, and F", quantity: "6" },
    { name: "Select lines", specification: "S3, S2, S1, S0, and Cin", quantity: "5" },
    { name: "LED", specification: "330 Ω, F0 through F3", quantity: "4" },
  ],
};
