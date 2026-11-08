import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_DEVICES, NIC_SEATED } from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: NIC_DEVICES,
  hot: ["pcA"],
  focus: ["pcA"],
  moves: NIC_SEATED,
  tags: { pcA: "✓ NIC ready" },
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>ipconfig /all",
        "Ethernet adapter Ethernet:",
        "   Description . . : Realtek PCIe GbE Family Controller",
        "   Physical Address: 00-1A-2B-3C-4D-10",
        "   Media State . . : Media disconnected",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Install the driver and read the MAC",
  body: "Windows finds the new card at start-up. If it shows as an unknown device, install the driver from the maker's disc or website.\n\nOpen Device Manager. The card is listed under Network adapters with no warning sign. Then open a Command Prompt and run ipconfig /all. The new adapter is listed with its Physical Address, the MAC burnt into the card.",
  show: [],
  schematic: figure(net),
  net,
};
