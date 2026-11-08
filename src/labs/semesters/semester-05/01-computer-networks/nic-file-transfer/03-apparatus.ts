import { type ApparatusSection } from "@/labs/lab-content.types";

export const apparatus: ApparatusSection = {
  id: "apparatus",
  type: "apparatus",
  title: "Apparatus Required",
  lead: "The room has a wired LAN on the left and a wireless LAN on the right.",
  items: [
    {
      name: "Desktop PCs",
      specification: "Windows 10/11, one free PCIe x1 slot",
      quantity: "2",
    },
    {
      name: "Gigabit Ethernet NIC",
      specification: "PCIe x1, RJ45, with driver",
      quantity: "1",
    },
    {
      name: "Unmanaged switch",
      specification: "8 × 1 Gbit/s ports",
      quantity: "1",
    },
    {
      name: "Straight-through cables",
      specification: "Cat 6, RJ45 both ends",
      quantity: "2",
    },
    {
      name: "Laptops",
      specification: "Built-in Wi-Fi 5 (802.11ac) adapter",
      quantity: "2",
    },
    {
      name: "Wi-Fi router",
      specification: "Dual band, WPA2-PSK, DHCP server",
      quantity: "1",
    },
    { name: "Test file", specification: "100 MB", quantity: "1" },
  ],
};
