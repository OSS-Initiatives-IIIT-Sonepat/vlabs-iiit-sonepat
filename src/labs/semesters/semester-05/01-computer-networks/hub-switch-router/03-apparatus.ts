import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Room 1 has a hub, Room 2 a switch, and the rack between them a router.",
  items: [
    { name: "Hub", specification: "4 ports, 10/100 Mbit/s", quantity: "1" },
    {
      name: "Switch",
      specification: "Unmanaged or Cisco 2960, 8 ports",
      quantity: "1",
    },
    {
      name: "Router",
      specification: "Two Gigabit Ethernet ports, Cisco IOS",
      quantity: "1",
    },
    { name: "PCs", specification: "Windows, Ethernet NIC", quantity: "6" },
    {
      name: "Straight-through cables",
      specification: "Cat 6, RJ45",
      quantity: "8",
    },
    {
      name: "Console cable",
      specification: "RJ45 to USB, for the router",
      quantity: "1",
    },
  ],
};
