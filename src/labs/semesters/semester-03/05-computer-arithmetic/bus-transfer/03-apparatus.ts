import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
  {
    "name": "Breadboard",
    "specification": "Long solderless breadboard, 60 columns",
    "quantity": "1"
  },
  {
    "name": "DC Power Supply",
    "specification": "5 V regulated",
    "quantity": "1"
  },
  {
    "name": "74HC74 D flip-flop IC",
    "specification": "DIP-14, one flip-flop used in each package",
    "quantity": "2"
  },
  {
    "name": "74HC153 multiplexer IC",
    "specification": "DIP-16, one 4-to-1 mux used as the bus",
    "quantity": "1"
  },
  {
    "name": "LED",
    "specification": "5 mm, the bus bit",
    "quantity": "1"
  },
  {
    "name": "330 ohm resistor",
    "specification": "0.25 W, LED current limit",
    "quantity": "1"
  },
  {
    "name": "Jumper wire",
    "specification": "22 AWG solid-core",
    "quantity": "1 set"
  }
],
};
