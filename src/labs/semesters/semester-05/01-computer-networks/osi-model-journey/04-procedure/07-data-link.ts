import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Data link: frame it for the router",
  body: "Ethernet wraps the packet in a frame of 140 bytes. The 14-byte header carries the destination MAC address, the source MAC address, and the type 0x0800, which says the payload is IPv4. The 4-byte frame check sequence at the end is a CRC computed over the whole frame.\n\nThe destination MAC is the router's, 00:1a:2b:00:01:01, not the server's. A MAC address only has to work on one link. The laptop learned the router's MAC with ARP: it broadcast \"who has 192.168.1.1?\" and the router answered. The answer stays in the ARP cache, so this request did not have to wait for it.\n\nThis is the only floor that adds a block at the back as well as at the front. The FCS has to come last, because it is computed over every byte before it.",
  show: [],
  schematic: osiFigure("data-link"),
  osi: {
    device: "laptop",
    layer: 2,
    blocks: ["eth", "ip", "tcp", "tls", "data", "tag", "fcs"],
    captions: {
      eth: "→ router MAC",
      ip: "→ 203.0.113.10",
      tcp: ":49152 → :443",
    },
    focus: ["eth", "fcs"],
    encrypted: true,
    note: {
      title: "+ Ethernet 14 B, + FCS 4 B",
      text: "The MAC address names the next box on this cable, the router. Not the server.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 6),
};
