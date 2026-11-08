import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Three PCs and the gateway router share one switch.",
  items: [
    {
      name: "PCs",
      specification: "Windows 10/11, 192.168.1.10 to .12",
      quantity: "3",
    },
    { name: "Switch", specification: "8 ports", quantity: "1" },
    {
      name: "Router",
      specification: "Gateway 192.168.1.1, link to the Internet",
      quantity: "1",
    },
    {
      name: "Patch cables",
      specification: "Cat 6 straight-through",
      quantity: "4",
    },
    { name: "Wireshark", specification: "Optional, filter arp", quantity: "1" },
  ],
};
