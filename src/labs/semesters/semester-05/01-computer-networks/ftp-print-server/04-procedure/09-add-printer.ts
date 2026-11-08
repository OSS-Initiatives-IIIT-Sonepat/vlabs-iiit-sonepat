import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { FTP_TABLE_HEADERS, FTP_TABLE_ROWS } from "@/labs/networks/ftp-print";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  hot: ["client", "ps"],
  focus: ["client", "ps", "sw"],
  tags: { ps: "Shared LabPrinter" },
  packets: [
    { path: ["client", "sw", "ps"], label: "connect", color: "blue" },
    { path: ["ps", "sw", "client"], label: "driver" },
  ],
  consoles: [
    {
      at: "client",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>rundll32 printui.dll,PrintUIEntry /in",
        "        /n \\\\192.168.1.30\\LabPrinter",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add the shared printer on the client",
  body: "On the client, open \\\\192.168.1.30 in File Explorer and double-click LabPrinter, or run the command shown. The client connects to the print server over SMB, downloads the driver from it, and adds the printer.\n\nThe printer now appears on the client as LabPrinter on PRINTSRV.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(FTP_TABLE_HEADERS, FTP_TABLE_ROWS, 4),
};
