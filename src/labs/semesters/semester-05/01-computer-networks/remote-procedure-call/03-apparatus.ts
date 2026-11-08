import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "The client and server from the socket labs, with rpcbind running on the server.",
  items: [
    {
      name: "Server",
      specification: "Linux with rpcbind and libtirpc, 192.168.1.20",
      quantity: "1",
    },
    {
      name: "Client",
      specification: "Linux with gcc and libtirpc, 192.168.1.10",
      quantity: "1",
    },
    {
      name: "rpcgen",
      specification: "From the rpcsvc-proto package",
      quantity: "1",
    },
    {
      name: "Switch and cables",
      specification: "8-port switch, Cat 6",
      quantity: "1 set",
    },
  ],
};
