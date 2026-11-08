import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "The same client, server and switch as the TCP lab, with a second client.",
  items: [
    {
      name: "Server",
      specification: "Linux, Python 3, 192.168.1.20, UDP port 5001 open",
      quantity: "1",
    },
    {
      name: "Client",
      specification: "Any OS with Python 3, 192.168.1.10",
      quantity: "1",
    },
    {
      name: "Second client",
      specification: "Laptop with Python 3, 192.168.1.11",
      quantity: "1",
    },
    {
      name: "Switch and cables",
      specification: "8-port switch, Cat 6",
      quantity: "1 set",
    },
    {
      name: "Wireshark",
      specification: "Optional, to capture the datagrams",
      quantity: "1",
    },
  ],
};
