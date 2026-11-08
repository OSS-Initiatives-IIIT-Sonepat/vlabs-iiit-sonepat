import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Network: add the IP header",
  body: "IP adds a 20-byte header, and the segment becomes a packet of 122 bytes. The source address is the laptop, 192.168.1.10. The destination is the server, 203.0.113.10. These two addresses stay the same from end to end. Routers read them. They do not rewrite them.\n\nTTL, time to live, starts at 64. Every router lowers it by one and drops the packet when it reaches zero, so a packet caught in a loop does not circle forever. The protocol field is 6, which means the payload is TCP. A checksum protects the header.\n\nThe laptop compares the destination with its own network, 192.168.1.0/24. The server is not on it, so the packet must go through the default gateway, the router at 192.168.1.1. The IP header still names the server. Only the next floor down will name the router.",
  show: [],
  osi: {
    device: "laptop",
    layer: 3,
    blocks: ["ip", "tcp", "tls", "data", "tag"],
    captions: { ip: "→ 203.0.113.10", tcp: ":49152 → :443" },
    focus: ["ip"],
    encrypted: true,
    note: {
      title: "+ IP header · 20 B",
      text: "From 192.168.1.10 to 203.0.113.10. These two addresses do not change on the way.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 5),
};
