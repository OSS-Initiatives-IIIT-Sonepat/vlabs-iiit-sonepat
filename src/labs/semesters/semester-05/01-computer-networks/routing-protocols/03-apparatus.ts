import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Three routers in a triangle join LAN A and LAN B, one side of it a slow serial link.",
  items: [
    {
      name: "Routers",
      specification:
        "Cisco 1941 or 2911 in Packet Tracer, with a serial (HWIC-2T) module on R1 and R3",
      quantity: "3",
    },
    {
      name: "PC",
      specification: "LAN A, 192.168.1.10, gateway 192.168.1.1",
      quantity: "1",
    },
    {
      name: "Server",
      specification: "LAN B, 192.168.3.10, gateway 192.168.3.1",
      quantity: "1",
    },
    {
      name: "Cables",
      specification: "Copper straight-through and serial DCE/DTE",
      quantity: "5",
    },
    { name: "Cisco Packet Tracer", specification: "8.x", quantity: "1" },
  ],
};
