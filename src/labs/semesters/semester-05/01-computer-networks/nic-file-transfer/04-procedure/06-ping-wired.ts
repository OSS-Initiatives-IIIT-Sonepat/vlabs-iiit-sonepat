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
  hot: ["a-sw", "b-sw"],
  focus: ["pcA", "pcB", "sw"],
  moves: NIC_SEATED,
  addr: NIC_ADDR,
  packets: [
    { path: ["pcA", "sw", "pcB"], label: "echo request" },
    { path: ["pcB", "sw", "pcA"], label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>ping 192.168.10.2",
        "Reply from 192.168.10.2: bytes=32 time<1ms TTL=128",
        "Reply from 192.168.10.2: bytes=32 time<1ms TTL=128",
        "    Packets: Sent = 4, Received = 4, Lost = 0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Ping across the wired LAN",
  body: "From PC A, ping PC B. Each echo request goes to the switch and out of PC B's port, and PC B sends an echo reply back.\n\nFour replies in under 1 ms show that both cards, both cables and the switch work. If the request times out, allow ICMP echo through PC B's firewall.",
  show: [],
  schematic: figure(net),
  net,
};
