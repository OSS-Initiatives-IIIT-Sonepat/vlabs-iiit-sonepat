import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Network: check and remove the IP header",
  body: "IP checks the header checksum and the destination address. 203.0.113.10 is the server's own address, so the packet is for this machine and is not forwarded. The TTL arrived as 63, which shows that the packet crossed one router.\n\nThe protocol field is 6, so the payload goes to TCP. IP removes its 20-byte header. The source address, 192.168.1.10, goes up with the segment, so the reply can be sent back.",
  show: [],
  schematic: osiFigure("network"),
  osi: {
    device: "server",
    layer: 3,
    blocks: ["tcp", "tls", "data", "tag"],
    captions: { tcp: ":49152 → :443" },
    focus: ["tcp"],
    encrypted: true,
    note: {
      title: "− IP header",
      text: "203.0.113.10 is this server. Protocol 6 says the payload is TCP.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
