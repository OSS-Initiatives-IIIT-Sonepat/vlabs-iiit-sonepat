import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Data link: check and remove the frame",
  body: "The data link layer computes the CRC over the frame and compares it with the FCS. They match, so no bit was damaged on the cable. The destination MAC is the server's own. The type field, 0x0800, says the payload is an IPv4 packet.\n\nThe Ethernet header and the FCS are removed, and the 122-byte packet goes up one floor. A damaged frame would have been dropped here without any message. Noticing the loss and sending the data again is the job of TCP, two floors up.",
  show: [],
  osi: {
    device: "server",
    layer: 2,
    blocks: ["ip", "tcp", "tls", "data", "tag"],
    captions: { ip: "→ 203.0.113.10 · TTL 63", tcp: ":49152 → :443" },
    focus: ["ip"],
    encrypted: true,
    note: {
      title: "− Ethernet, − FCS",
      text: "The CRC matches and the MAC is the server's own. Type 0x0800: hand it to IP.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
