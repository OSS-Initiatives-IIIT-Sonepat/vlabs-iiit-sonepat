import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Five rooms, one topology in each, as five separate Packet Tracer workspaces.",
  items: [
    {
      name: "PCs and laptops",
      specification: "With Ethernet NICs",
      quantity: "14",
    },
    {
      name: "Switches",
      specification: "For the star and the tree",
      quantity: "4",
    },
    { name: "Routers", specification: "For the mesh", quantity: "4" },
    {
      name: "Coaxial cable, T-taps and terminators",
      specification: "For the bus, 50 Ω terminators",
      quantity: "1 set",
    },
    {
      name: "Straight-through cables",
      specification: "Cat 6",
      quantity: "As needed",
    },
    {
      name: "Cisco Packet Tracer",
      specification: "8.x, to build and simulate each topology",
      quantity: "1",
    },
  ],
};
