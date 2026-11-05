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
    "name": "74HC283 4-bit adder IC",
    "specification": "DIP-16, first adder and correction adder",
    "quantity": "2"
  },
  {
    "name": "74HC08 AND gate IC",
    "specification": "DIP-14 quad AND, two gates used",
    "quantity": "1"
  },
  {
    "name": "74HC32 OR gate IC",
    "specification": "DIP-14 quad OR, two gates used",
    "quantity": "1"
  },
  {
    "name": "LED",
    "specification": "5 mm, four unit bits and the tens carry",
    "quantity": "5"
  },
  {
    "name": "330 ohm resistor",
    "specification": "0.25 W, LED current limit",
    "quantity": "5"
  },
  {
    "name": "Jumper wire",
    "specification": "22 AWG solid-core",
    "quantity": "1 set"
  }
],
};
