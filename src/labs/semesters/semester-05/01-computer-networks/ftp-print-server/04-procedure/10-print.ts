import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { FTP_TABLE_HEADERS, FTP_TABLE_ROWS } from "@/labs/networks/ftp-print";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  hot: ["prn"],
  focus: ["client", "ps", "prn", "sw"],
  tags: { ps: "Shared LabPrinter" },
  busy: ["prn"],
  packets: [
    { path: ["client", "sw", "ps"], label: "print job" },
    { path: ["ps", "prn"], label: "USB" },
  ],
  consoles: [
    {
      at: "ps",
      title: "LabPrinter · queue",
      lines: [
        "Document          Owner     Pages  Status",
        "Test Page         student   1      Printing",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Print a test page",
  body: "On the client, print a test page to LabPrinter. The job goes over the LAN to the print server's spooler, which queues it and sends it down the USB cable. The page comes out of the printer.\n\nThe queue on the print server lists each job with the name of the PC that sent it.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(FTP_TABLE_HEADERS, FTP_TABLE_ROWS, 5),
};
