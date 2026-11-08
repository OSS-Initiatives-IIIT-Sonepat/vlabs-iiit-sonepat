import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Router: unwrap the frame",
  body: "The router's LAN port receives the bits and rebuilds the frame. The FCS is correct, and the destination MAC is the router's own, so it keeps the frame. The type is 0x0800, so it hands the packet inside to IP. The Ethernet header and the FCS are thrown away. Their job was to cross one link, and that is done.\n\nThe router reads the destination IP, 203.0.113.10, and looks for the longest matching prefix in its routing table. Here that is 203.0.113.0/24, connected directly to its other port. A router on the Internet would find a route to the next router instead, and the next step would look the same.\n\nThe router works at layers 1, 2, and 3. It never reads the TCP header or the encrypted record.",
  show: [],
  schematic: osiFigure("network"),
  osi: {
    device: "router",
    blocks: ["ip", "tcp", "tls", "data", "tag"],
    captions: { ip: "→ 203.0.113.10 · TTL 64", tcp: ":49152 → :443" },
    focus: ["ip"],
    encrypted: true,
    note: {
      title: "− Ethernet, − FCS",
      text: "The frame was addressed to the router, so the router takes it apart and reads the IP header.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
