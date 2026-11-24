import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  items: [
    {
      name: "Single-phase transformer",
      specification: "230 / 115 V, 230 VA",
      quantity: "1",
    },
    {
      name: "Variable AC supply",
      specification: "50 Hz, 0–230 V, used as the variac",
      quantity: "1",
    },
    {
      name: "AC voltmeter",
      specification: "0–300 V",
      quantity: "1",
    },
    {
      name: "AC ammeter",
      specification: "0–2 A",
      quantity: "1",
    },
    {
      name: "Wattmeter",
      specification: "0–50 W, for W0 and Wsc",
      quantity: "1",
    },
    {
      name: "Breadboard and leads",
      specification: "For the low-voltage connections of this model",
      quantity: "1",
    },
  ],
};
