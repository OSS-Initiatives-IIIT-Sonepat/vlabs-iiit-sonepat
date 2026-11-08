import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "Nothing is wired by hand in this lab. The bench in the scene is made of these parts.",
  items: [
    {
      name: "Laptop",
      specification:
        "Client, 192.168.1.10/24, gateway 192.168.1.1, web browser",
      quantity: "1",
    },
    {
      name: "Ethernet switch",
      specification: "Unmanaged, 8 ports, 1 Gbit/s",
      quantity: "1",
    },
    {
      name: "Router",
      specification: "Two ports: 192.168.1.1/24 and 203.0.113.1/24",
      quantity: "1",
    },
    {
      name: "Web server",
      specification: "203.0.113.10, HTTPS on port 443",
      quantity: "1",
    },
    {
      name: "Ethernet cable",
      specification: "Cat 6 twisted pair with RJ45 plugs",
      quantity: "3",
    },
  ],
};
