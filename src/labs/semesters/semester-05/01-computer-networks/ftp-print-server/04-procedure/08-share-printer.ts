import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  hot: ["ps"],
  focus: ["ps", "prn", "sw"],
  tags: { ps: "Shared LabPrinter" },
  consoles: [
    {
      at: "ps",
      title: "Printer properties · Sharing",
      lines: [
        "[x] Share this printer",
        "    Share name:  LabPrinter",
        "[x] Render print jobs on client computers",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Share the printer",
  body: "On the print server open the printer's Printer properties, then the Sharing tab. Tick Share this printer and give it the share name LabPrinter. Leave Render print jobs on client computers ticked.\n\nThe printer is now offered on the LAN as \\\\PRINTSRV\\LabPrinter, and the print server's spooler will queue jobs for it.",
  show: [],
  schematic: figure(net),
  net,
};
