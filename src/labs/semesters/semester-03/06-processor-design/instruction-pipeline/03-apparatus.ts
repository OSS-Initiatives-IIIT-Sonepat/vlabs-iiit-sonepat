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
    "name": "Pipeline stage chip",
    "specification": "DIP-14 labeled IF, ID, EX, or WB",
    "quantity": "4"
  },
  {
    "name": "LED",
    "specification": "5 mm, one lamp per stage",
    "quantity": "4"
  },
  {
    "name": "330 ohm resistor",
    "specification": "0.25 W, LED current limit",
    "quantity": "4"
  },
  {
    "name": "Jumper wire",
    "specification": "22 AWG solid-core",
    "quantity": "1 set"
  }
],
};
