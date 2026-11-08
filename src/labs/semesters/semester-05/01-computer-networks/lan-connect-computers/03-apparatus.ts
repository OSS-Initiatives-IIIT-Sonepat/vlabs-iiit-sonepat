import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Six PCs sit in two columns, and the switch is on the back wall.",
  items: [
    {
      name: "PCs",
      specification: "Windows 10/11 with Ethernet NIC",
      quantity: "6",
    },
    {
      name: "Switch",
      specification: "8 ports, 1 Gbit/s, unmanaged",
      quantity: "1",
    },
    {
      name: "Patch cables",
      specification: "Cat 6 straight-through, 3 m",
      quantity: "6",
    },
    {
      name: "Cable ties and labels",
      specification: "To mark each cable with its PC and port",
      quantity: "1 set",
    },
  ],
};
