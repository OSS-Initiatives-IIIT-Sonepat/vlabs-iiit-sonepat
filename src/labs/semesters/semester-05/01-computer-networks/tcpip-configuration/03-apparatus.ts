import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "PC 1 is set up step by step. PC 2, the router and the server are already set.",
  items: [
    {
      name: "PC 1",
      specification: "Windows 10/11, Ethernet NIC, no address yet",
      quantity: "1",
    },
    { name: "PC 2", specification: "192.168.1.11/24", quantity: "1" },
    { name: "Switch", specification: "8 ports", quantity: "1" },
    {
      name: "Router",
      specification: "192.168.1.1 and 192.168.2.1",
      quantity: "1",
    },
    { name: "Server", specification: "192.168.2.10/24", quantity: "1" },
    {
      name: "Patch cables",
      specification: "Cat 6 straight-through",
      quantity: "4",
    },
  ],
};
