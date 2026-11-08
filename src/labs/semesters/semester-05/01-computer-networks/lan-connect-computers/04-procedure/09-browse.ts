import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  LAN_ALL,
  LAN_ADDR,
  LAN_TABLE_HEADERS,
  LAN_TABLE_ROWS,
} from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: ["pc1"],
  addr: LAN_ADDR,
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        "C:\\>net view",
        "Server Name     Remark",
        "-----------------------",
        "\\\\PC1  \\\\PC2  \\\\PC3",
        "\\\\PC4  \\\\PC5  \\\\PC6",
        "The command completed successfully.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "List the PCs on the LAN",
  body: "On PC 1, open the Network folder in File Explorer, or run net view. All six PCs of the LAB workgroup are listed.\n\nOpen any one of them to see its shared folders. The LAN is working at every level: cables, addresses, and the services on top.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(LAN_TABLE_HEADERS, LAN_TABLE_ROWS, 6),
};
