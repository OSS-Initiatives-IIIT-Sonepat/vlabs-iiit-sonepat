import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "The workbench in the room holds every part. Look at each one before you start.",
  items: [
    {
      name: "UTP cable",
      specification: "Cat 6, 23 AWG solid copper, 4 pairs, about 1.5 m",
      quantity: "1",
    },
    {
      name: "Sample cables",
      specification: "STP, RG-6 coaxial and multimode fibre, short cut lengths",
      quantity: "1 each",
    },
    {
      name: "RJ45 plugs",
      specification: "8P8C, for Cat 6 solid wire",
      quantity: "4",
    },
    {
      name: "Crimping tool",
      specification: "RJ45 8P die, with cutting blade",
      quantity: "1",
    },
    {
      name: "Wire stripper",
      specification: "Rotary, for round UTP cable",
      quantity: "1",
    },
    {
      name: "Cable tester",
      specification: "RJ45 main and remote unit, 8 LEDs each",
      quantity: "1",
    },
  ],
};
