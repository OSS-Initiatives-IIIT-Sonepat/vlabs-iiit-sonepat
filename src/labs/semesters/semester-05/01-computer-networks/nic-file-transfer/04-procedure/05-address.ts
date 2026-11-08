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
  hot: ["pcA", "pcB"],
  focus: ["pcA", "pcB", "sw"],
  moves: NIC_SEATED,
  addr: NIC_ADDR,
  consoles: [
    {
      at: "pcA",
      title: "Administrator · PC A",
      lines: [
        'C:\\>netsh interface ip set address "Ethernet"',
        "     static 192.168.10.1 255.255.255.0",
        "Ok.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Give each PC an address",
  body: "There is no DHCP server on this LAN, so set the addresses by hand. On PC A open Network Connections (ncpa.cpl), then the adapter's Properties, then Internet Protocol Version 4. Enter 192.168.10.1 with mask 255.255.255.0. On PC B enter 192.168.10.2 with the same mask.\n\nThe same can be done from an administrator Command Prompt with netsh, as shown.",
  show: [],
  schematic: figure(net),
  net,
};
