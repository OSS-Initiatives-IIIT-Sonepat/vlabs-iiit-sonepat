import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  NIC_ALL,
  NIC_SEATED,
  WLAN_ADDR,
  NIC_TABLE_HEADERS,
  NIC_TABLE_ROWS,
} from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: NIC_ALL,
  hot: ["c-ap", "d-ap"],
  focus: ["ap", "lapC", "lapD"],
  moves: NIC_SEATED,
  addr: WLAN_ADDR,
  busy: ["ap"],
  packets: [
    { path: ["lapD", "ap", "lapC"], label: "SMB data" },
    { path: ["lapD", "ap", "lapC"], label: "SMB data", at: 1.6 },
  ],
  consoles: [
    {
      at: "lapC",
      title: "Command Prompt · Laptop C",
      lines: [
        "C:\\>copy \\\\192.168.20.102\\Lab\\test100.bin C:\\",
        "        1 file(s) copied.     (6.8 s)",
      ],
    },
  ],
  note: {
    at: "ap",
    title: "Twice through the air",
    text: "Laptop D to the router, then the router to Laptop C, on one shared channel.",
  },
};

export const step: SceneProcedureStep = {
  label: "Copy the same file over Wi-Fi",
  body: "Share a folder on Laptop D as on PC B, then copy the 100 MB file to Laptop C.\n\nEvery frame goes from Laptop D up to the router and down again to Laptop C, on the same channel, one station at a time. The copy takes about 6.8 s, about 15 MB/s, far below the 433 Mbit/s link rate. Note the time in the table and compare it with the wired copy.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(NIC_TABLE_HEADERS, NIC_TABLE_ROWS, 2),
};
