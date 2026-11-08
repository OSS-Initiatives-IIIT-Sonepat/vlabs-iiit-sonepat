import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { FTP_BENCH } from "@/labs/networks/ftp-print";

import { netFigure, sequenceFigure, type SeqMessage } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(FTP_BENCH, frame, title);

export const theoryDiagram = figure({}, "FTP server and print server");

const FTP: SeqMessage[] = [
  { from: 0, to: 1, label: "SYN → :21" },
  { from: 1, to: 0, label: "220 (vsFTPd 3.0.5)" },
  { from: 0, to: 1, label: "USER student" },
  { from: 1, to: 0, label: "331 Please specify the password" },
  { from: 0, to: 1, label: "PASS ******" },
  { from: 1, to: 0, label: "230 Login successful" },
  { from: 0, to: 1, label: "PASV" },
  { from: 1, to: 0, label: "227 (192,168,1,20,156,65)" },
  { from: 0, to: 1, label: "RETR notes.pdf" },
  { from: 1, to: 0, label: "data on port 40001", color: "#f59e0b" },
  { from: 1, to: 0, label: "226 Transfer complete" },
];

/** The FTP control conversation, up to message `upto`. */
export const ftpLogin = sequenceFigure(["Client", "FTP server"], FTP, 6);
export const ftpGet = sequenceFigure(["Client", "FTP server"], FTP, 11);
