import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import {
  NIC_DEVICES,
  NIC_SEATED,
  NIC_ADDR,
} from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: [...NIC_DEVICES, "a-sw", "b-sw"],
  hot: ["ap"],
  focus: ["ap", "lapC", "lapD"],
  moves: NIC_SEATED,
  addr: NIC_ADDR,
  consoles: [
    {
      at: "ap",
      title: "Router settings · Wireless",
      lines: [
        "SSID ........ VLAB-WIFI",
        "Security .... WPA2-PSK (AES)",
        "Band ........ 5 GHz, channel 36",
        "DHCP ........ 192.168.20.100 - 199",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Set up the Wi-Fi router",
  body: "In the right room, open the Wi-Fi router's settings page from a browser. Set the network name (SSID) to VLAB-WIFI, the security to WPA2-PSK with AES, and a pass phrase of at least 12 characters. Choose the 5 GHz band and a free channel.\n\nLeave the router's DHCP server on, giving out 192.168.20.100 to .199. The router now sends a beacon with the SSID ten times a second.",
  show: [],
  schematic: figure(net),
  net,
};
