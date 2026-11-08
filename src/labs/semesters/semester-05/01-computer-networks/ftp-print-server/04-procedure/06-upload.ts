import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  NO_PRINTER,
  FTP_TABLE_HEADERS,
  FTP_TABLE_ROWS,
} from "@/labs/networks/ftp-print";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  show: [...NO_PRINTER, "prn"],
  hot: ["client", "ftp"],
  focus: ["client", "ftp", "sw"],
  packets: [
    { path: ["client", "sw", "ftp"], label: "STOR report.docx", color: "blue" },
    { path: ["client", "sw", "ftp"], label: "data", at: 1.0 },
    { path: ["ftp", "sw", "client"], label: "226 complete", color: "green" },
  ],
  consoles: [
    {
      at: "client",
      title: "FileZilla · message log",
      lines: [
        "Command:  PASV",
        "Response: 227 Entering Passive Mode (192,168,1,20,156,66).",
        "Command:  STOR report.docx",
        "Response: 150 Ok to send data.",
        "Response: 226 Transfer complete.",
        "Command:  QUIT",
        "Response: 221 Goodbye.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Upload a file",
  body: "Drag report.docx from the local side to the server. This time the file goes up a new data connection, with the STOR command. write_enable in vsftpd.conf is what allows it.\n\nDisconnect when done: FileZilla sends QUIT and the server closes the control connection.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(FTP_TABLE_HEADERS, FTP_TABLE_ROWS, 3),
};
