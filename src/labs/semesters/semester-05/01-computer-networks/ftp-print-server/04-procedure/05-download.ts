import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  NO_PRINTER,
  FTP_TABLE_HEADERS,
  FTP_TABLE_ROWS,
} from "@/labs/networks/ftp-print";
import { ftpGet } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

export const step: SceneProcedureStep = {
  label: "List and download a file",
  body: "FileZilla lists the remote folder. Drag notes.pdf to the local side to download it. For each transfer the client asks for passive mode, the server answers 227 with a data port, here 40001, and the client opens a second TCP connection to it.\n\nThe file comes down that data connection, which then closes. The control connection reports 226 Transfer complete.",
  show: [],
  schematic: ftpGet,
  net: {
    show: [...NO_PRINTER, "prn"],
    hot: ["client", "ftp"],
    focus: ["client", "ftp", "sw"],
    packets: [
      { path: ["client", "sw", "ftp"], label: "RETR notes.pdf", color: "blue" },
      { path: ["ftp", "sw", "client"], label: "data :40001" },
      { path: ["ftp", "sw", "client"], label: "data :40001", at: 1.9 },
    ],
    consoles: [
      {
        at: "client",
        title: "FileZilla · message log",
        lines: [
          "Command:  PASV",
          "Response: 227 Entering Passive Mode (192,168,1,20,156,65).",
          "Command:  RETR notes.pdf",
          "Response: 150 Opening BINARY mode data connection",
          "Response: 226 Transfer complete.",
        ],
      },
    ],
  },
  table: revealedTable(FTP_TABLE_HEADERS, FTP_TABLE_ROWS, 2),
};
