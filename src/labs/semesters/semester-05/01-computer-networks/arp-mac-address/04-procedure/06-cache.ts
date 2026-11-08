import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  C_KNOWN,
  ARP_TABLE_HEADERS,
  ARP_TABLE_ROWS,
} from "@/labs/networks/arp";
import { arpReply } from "@/labs/schematics/semester-05/01-computer-networks/arp";

export const step: SceneProcedureStep = {
  label: "The cache fills and the ping goes",
  body: "PC A stores the answer in its cache and sends the waiting echo request in a frame to 00-1A-2B-3C-4D-12. The switch delivers it to PC C's port only.\n\narp -a now lists 192.168.1.12 as a dynamic entry. Pings for the next few seconds use it without asking again.",
  show: [],
  schematic: arpReply,
  net: {
    hot: ["pcA", "pcC"],
    addr: C_KNOWN,
    packets: [
      { path: ["pcA", "sw", "pcC"], label: "echo request" },
      { path: ["pcC", "sw", "pcA"], label: "echo reply", color: "green" },
    ],
    consoles: [
      {
        at: "pcA",
        title: "Command Prompt · PC A",
        lines: [
          "C:\\>arp -a",
          "  Internet Address   Physical Address    Type",
          "  192.168.1.12       00-1a-2b-3c-4d-12   dynamic",
        ],
      },
    ],
  },
  table: revealedTable(ARP_TABLE_HEADERS, ARP_TABLE_ROWS, 3),
};
