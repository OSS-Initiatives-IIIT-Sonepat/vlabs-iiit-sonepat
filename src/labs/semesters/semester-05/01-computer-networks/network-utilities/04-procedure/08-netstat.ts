import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DHCP_ADDR,
  PATH_WEB,
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  hot: ["web"],
  addr: DHCP_ADDR,
  packets: [
    { path: PATH_WEB, label: "HTTPS" },
    { path: [...PATH_WEB].reverse(), label: "HTTPS", color: "green" },
  ],
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>netstat -an | findstr 443",
        "  Proto  Local Address        Foreign Address      State",
        "  TCP    192.168.1.10:51544   198.51.100.20:443    ESTABLISHED",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "netstat -an while browsing",
  body: "Open https://www.example.com in a browser, then run netstat -an. Among the lines is a TCP connection from the client's address and a high local port to 198.51.100.20 port 443, in the ESTABLISHED state.\n\nnetstat shows what the computer is talking to right now, and which ports it is listening on. An unexpected ESTABLISHED line is worth a closer look.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 5),
};
