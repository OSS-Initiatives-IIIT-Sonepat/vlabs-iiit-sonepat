import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  NO_PRINTER,
  FTP_TABLE_HEADERS,
  FTP_TABLE_ROWS,
} from "@/labs/networks/ftp-print";
import { ftpLogin } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

export const step: SceneProcedureStep = {
  label: "Log in from the client",
  body: "On the client, open FileZilla and connect to 192.168.1.20 as student. TCP connects to port 21, and the server greets with 220. FileZilla sends the user name and the password: the server replies 331, then 230 Login successful. Its message log shows every command and reply.\n\nThis is the control connection. It stays open for the whole session. The password crossed the LAN in plain text, which anyone on the path could read.",
  show: [],
  schematic: ftpLogin,
  net: {
    show: [...NO_PRINTER, "prn"],
    hot: ["client", "ftp"],
    focus: ["client", "ftp", "sw"],
    packets: [
      { path: ["client", "sw", "ftp"], label: "USER / PASS", color: "blue" },
      { path: ["ftp", "sw", "client"], label: "230 Login", color: "green" },
    ],
    consoles: [
      {
        at: "client",
        title: "FileZilla · message log",
        lines: [
          "Status:   Connecting to 192.168.1.20:21...",
          "Response: 220 (vsFTPd 3.0.5)",
          "Command:  USER student",
          "Response: 331 Please specify the password.",
          "Command:  PASS ********",
          "Response: 230 Login successful.",
        ],
      },
    ],
  },
  table: revealedTable(FTP_TABLE_HEADERS, FTP_TABLE_ROWS, 1),
};
