import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "One switch joins a client PC, an FTP server, and a print server with a USB printer.",
  items: [
    {
      name: "FTP server",
      specification: "Ubuntu Server 22.04 with vsftpd, 192.168.1.20",
      quantity: "1",
    },
    {
      name: "Client PC",
      specification: "Windows 10/11 with FileZilla Client, 192.168.1.10",
      quantity: "1",
    },
    {
      name: "Print server",
      specification: "Windows PC, 192.168.1.30",
      quantity: "1",
    },
    {
      name: "Printer",
      specification: "USB laser printer with driver",
      quantity: "1",
    },
    {
      name: "Switch and cables",
      specification: "8-port switch, 3 Cat 6 cables, 1 USB cable",
      quantity: "1 set",
    },
  ],
};
