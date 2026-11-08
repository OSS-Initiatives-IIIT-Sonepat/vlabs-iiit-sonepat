import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Two PCs, with a switch and a router on the same bench.",
  items: [
    {
      name: "PCs",
      specification: "Windows 10/11, Ethernet NIC",
      quantity: "2",
    },
    {
      name: "Crossover cable",
      specification: "Cat 6, T568B to T568A",
      quantity: "1",
    },
    { name: "Straight-through cables", specification: "Cat 6", quantity: "2" },
    { name: "Switch", specification: "8 ports, unmanaged", quantity: "1" },
    { name: "Router", specification: "Two Ethernet ports", quantity: "1" },
  ],
};
