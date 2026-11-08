import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "R1 sits between two LANs, with the admin laptop on its console port.",
  items: [
    {
      name: "Router",
      specification:
        "Cisco 1941 (or ISR 4321 in Packet Tracer), two Gigabit Ethernet ports",
      quantity: "1",
    },
    { name: "Switches", specification: "Cisco 2960", quantity: "2" },
    { name: "PCs", specification: "Two in each LAN", quantity: "4" },
    {
      name: "Admin laptop",
      specification:
        "Terminal program (PuTTY or Packet Tracer Terminal), 9600 8N1",
      quantity: "1",
    },
    {
      name: "Console cable",
      specification: "Rollover, RJ45 to DB9 or USB",
      quantity: "1",
    },
    { name: "Straight-through cables", specification: "Cat 6", quantity: "6" },
  ],
};
