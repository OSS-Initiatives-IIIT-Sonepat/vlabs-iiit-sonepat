import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Breadboard",
      specification: "30-column solderless breadboard with power rails",
      quantity: "1",
    },
    {
      name: "DC power supply",
      specification:
        "0–15 V, used for V_DD (drain supply) and V_GG (gate bias)",
      quantity: "2",
    },
    {
      name: "N-channel MOSFET",
      specification: "2N7000 (enhancement type)",
      quantity: "1",
    },
    { name: "Resistor R_D", specification: "1 kΩ, 0.25 W", quantity: "1" },
    { name: "Resistor R_G", specification: "100 kΩ, 0.25 W", quantity: "1" },
    { name: "Resistor R_L", specification: "10 kΩ, 0.25 W", quantity: "1" },
    {
      name: "Capacitor C_in, C_out",
      specification: "1 µF electrolytic or ceramic",
      quantity: "2",
    },
    {
      name: "DC ammeter",
      specification: "0–100 mA panel meter",
      quantity: "1",
    },
    {
      name: "DC voltmeter",
      specification: "0–15 V panel meter",
      quantity: "2",
    },
    {
      name: "Function generator",
      specification: "Sine wave, 1 kHz, adjustable amplitude",
      quantity: "1",
    },
    {
      name: "Cathode ray oscilloscope (CRO)",
      specification: "Dual channel, with probes",
      quantity: "1",
    },
    {
      name: "Connecting wires",
      specification: "Single-strand jumper wires",
      quantity: "10",
    },
  ],
};
