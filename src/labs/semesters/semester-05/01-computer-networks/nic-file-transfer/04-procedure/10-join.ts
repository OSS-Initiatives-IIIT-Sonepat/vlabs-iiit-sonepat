import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_ALL, NIC_SEATED, WLAN_ADDR } from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: NIC_ALL,
  hot: ["c-ap", "d-ap"],
  focus: ["ap", "lapC", "lapD"],
  moves: NIC_SEATED,
  addr: WLAN_ADDR,
  tags: { lapC: "✓ VLAB-WIFI", lapD: "✓ VLAB-WIFI" },
  consoles: [
    {
      at: "lapC",
      title: "Command Prompt · Laptop C",
      lines: [
        "C:\\>netsh wlan show interfaces",
        "    State          : connected",
        "    SSID           : VLAB-WIFI",
        "    Receive rate   : 433 Mbps",
        "    Signal         : 92%",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Join both laptops to the WLAN",
  body: "On Laptop C, click the Wi-Fi icon, choose VLAB-WIFI, and enter the pass phrase. The wireless NIC authenticates, agrees encryption keys with the router, and asks the router for an address by DHCP. Do the same on Laptop D.\n\nnetsh wlan show interfaces shows the SSID, the signal and the link rate. ipconfig shows the address the router gave out.",
  show: [],
  schematic: figure(net),
  net,
};
