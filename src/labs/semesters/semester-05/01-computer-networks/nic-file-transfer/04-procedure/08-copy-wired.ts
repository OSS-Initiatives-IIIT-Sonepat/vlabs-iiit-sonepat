import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  NIC_DEVICES,
  NIC_SEATED,
  NIC_ADDR,
  NIC_TABLE_HEADERS,
  NIC_TABLE_ROWS,
} from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: [...NIC_DEVICES, "a-sw", "b-sw"],
  hot: ["a-sw", "b-sw"],
  focus: ["pcA", "pcB", "sw"],
  moves: NIC_SEATED,
  addr: NIC_ADDR,
  busy: ["sw"],
  packets: [
    { path: ["pcB", "sw", "pcA"], label: "SMB data" },
    { path: ["pcB", "sw", "pcA"], label: "SMB data", at: 0.75 },
    { path: ["pcB", "sw", "pcA"], label: "SMB data", at: 1.15 },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>copy \\\\192.168.10.2\\Lab\\test100.bin C:\\",
        "        1 file(s) copied.     (0.9 s)",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Copy the file over the wired LAN",
  body: "On PC A, open \\\\192.168.10.2\\Lab in File Explorer, or copy the file from the Command Prompt as shown. The file arrives as a stream of SMB data over TCP, through the switch.\n\nThe 100 MB file takes about 0.9 s, about 110 MB/s. A gigabit link carries at most 125 MB/s, so the wired LAN is nearly full speed. Note the time in the table.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(NIC_TABLE_HEADERS, NIC_TABLE_ROWS, 1),
};
