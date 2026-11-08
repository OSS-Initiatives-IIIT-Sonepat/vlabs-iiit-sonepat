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
    { path: PATH_DNS, label: "echo request" },
    { path: [...PATH_DNS].reverse(), label: "echo reply", color: "green" },
  ],
  consoles: [
    {
      at: "pc",
      title: "Command Prompt · Client",
      lines: [
        "C:\\>ping 8.8.8.8",
        "Reply from 8.8.8.8: bytes=32 time=14ms TTL=117",
        "Reply from 8.8.8.8: bytes=32 time=13ms TTL=117",
        "    Packets: Sent = 4, Received = 4, Lost = 0",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "ping 8.8.8.8",
  body: "Run ping 8.8.8.8. Each echo request goes to the gateway, out through the ISP, and across the Internet to the resolver, and each echo reply comes back.\n\nFour replies with about 14 ms each show that the whole path works. The TTL of 117 means the reply started at 128 and crossed 11 routers on the way back.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(UTIL_TABLE_HEADERS, UTIL_TABLE_ROWS, 2),
};
