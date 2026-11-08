import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "A client on the lab LAN, its router, and the path to a web server on the Internet.",
  items: [
    {
      name: "Client",
      specification: "Laptop, Windows 10/11, Ethernet",
      quantity: "1",
    },
    {
      name: "Router",
      specification: "WAN and LAN ports, DHCP server and NAT",
      quantity: "1",
    },
    {
      name: "ISP connection",
      specification: "Fibre or DSL line with a public address",
      quantity: "1",
    },
    {
      name: "Patch cables",
      specification: "Cat 6 straight-through",
      quantity: "2",
    },
    {
      name: "Utilities",
      specification: "ipconfig, ping, nslookup, tracert, netstat",
      quantity: "Built in",
    },
  ],
};
