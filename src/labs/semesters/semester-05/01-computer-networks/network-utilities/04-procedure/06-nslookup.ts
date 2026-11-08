import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DHCP_ADDR,
  PATH_DNS,
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/net-utilities";

const net: NetFrame = {
  hot: ["dns"],
  addr: DHCP_ADDR,
  packets: [
    { path: PATH_DNS, label: "DNS query", color: "blue" },
    { path: [...PATH_DNS].reverse(), label: "DNS answer", color: "green" },
  ],
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>nslookup www.example.com",
        "Server:  dns.google",
        "Address:  8.8.8.8",
        "Name:    www.example.com",
        "Address:  198.51.100.20",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "nslookup www.example.com",
  body: "Run nslookup www.example.com. The client sends a DNS query, on UDP port 53, to its DNS server 8.8.8.8. The resolver answers with the web server's address, 198.51.100.20.\n\nEvery time you type a name, this lookup happens first. ping www.example.com would now use that address.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 3),
};
