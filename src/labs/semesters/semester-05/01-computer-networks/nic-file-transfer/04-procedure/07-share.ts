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
  hot: ["pcB"],
  focus: ["pcA", "pcB", "sw"],
  moves: NIC_SEATED,
  addr: NIC_ADDR,
  tags: { pcB: "Shared \\\\PC-B\\Lab" },
  consoles: [
    {
      at: "pcB",
      title: "Administrator · PC B",
      lines: [
        "C:\\>net share Lab=C:\\Lab /grant:student,READ",
        "Lab was shared successfully.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Share a folder on PC B",
  body: "On PC B, make a folder C:\\Lab and put the 100 MB test file in it. Right-click the folder, choose Properties, then Sharing, and share it as Lab with read access for the lab user.\n\nIn Network and Sharing Center, turn on network discovery and file and printer sharing for the private network. PC B now offers the folder over SMB on TCP port 445.",
  show: [],
  schematic: figure(net),
  net,
};
