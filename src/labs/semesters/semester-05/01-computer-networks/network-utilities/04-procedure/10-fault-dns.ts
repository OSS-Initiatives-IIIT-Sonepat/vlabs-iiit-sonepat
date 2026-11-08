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
  hot: ["pc"],
  addr: DHCP_ADDR,
  tags: { pc: "✕ DNS 192.168.1.99" },
  packets: [
    { path: PATH_DNS, label: "ping by address" },
    { path: [...PATH_DNS].reverse(), label: "reply", color: "green" },
  ],
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>ping 8.8.8.8",
        "Reply from 8.8.8.8: bytes=32 time=14ms TTL=117",
        "C:\\>ping www.example.com",
        "Ping request could not find host www.example.com.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Fault 2: names do not work",
  body: "Now set the client's DNS server by mistake to 192.168.1.99, an address with nothing behind it. ping 8.8.8.8 still works, so the cable, the address, the gateway and the Internet are all fine. But ping www.example.com fails: the name cannot be found.\n\nThe fault is in DNS alone. Set the DNS server back to 8.8.8.8, or to the router, and names work again.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 7),
};
