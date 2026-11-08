import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Router: forward in a new frame",
  body: "The router lowers the TTL from 64 to 63 and recomputes the IP header checksum, because the header changed. Everything else in the packet stays as the laptop wrote it, including both IP addresses.\n\nThe next link is a different network, so the packet needs a new frame. The source MAC is now the router's WAN port, 00:1a:2b:00:02:01. The destination MAC is the server's, 52:54:00:aa:00:10, from the router's own ARP cache. A new FCS is computed over the new frame, which is 140 bytes again.\n\nThe rule to keep: MAC addresses change at every hop, IP addresses do not. The physical layer then sends the new frame out of the WAN port as 1184 bits, behind a new preamble.",
  show: [],
  schematic: osiFigure("network"),
  osi: {
    device: "router",
    blocks: ["eth", "ip", "tcp", "tls", "data", "tag", "fcs"],
    captions: {
      eth: "→ server MAC",
      ip: "→ 203.0.113.10 · TTL 63",
      tcp: ":49152 → :443",
    },
    focus: ["eth", "ip", "fcs"],
    encrypted: true,
    note: {
      title: "New frame, TTL 64 → 63",
      text: "New MAC addresses for the next link. The IP addresses stay the same.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
