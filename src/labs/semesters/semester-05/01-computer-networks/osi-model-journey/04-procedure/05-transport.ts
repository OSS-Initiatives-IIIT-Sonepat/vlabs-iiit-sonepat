import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Transport: add the TCP header",
  body: "TCP adds a 20-byte header, and the data unit becomes a segment of 102 bytes. The destination port, 443, says which program on the server should receive it: the HTTPS server. The source port, 49152, was picked by the laptop for this connection, so the reply comes back to this browser and not to another program.\n\nThe sequence number counts bytes, so the server can put segments back in order and notice one that is missing. The acknowledgement number tells the other side what has arrived. A checksum covers the segment, and the window says how much more the sender may send before it waits. TCP gives the layers above a reliable, ordered stream on top of a network that may lose or reorder packets.\n\nAn IP address finds a machine. A port finds a program on that machine. Two addresses and two ports together name this one connection.",
  show: [],
  osi: {
    device: "laptop",
    layer: 4,
    blocks: ["tcp", "tls", "data", "tag"],
    captions: { tcp: ":49152 → :443" },
    focus: ["tcp"],
    encrypted: true,
    note: {
      title: "+ TCP header · 20 B",
      text: "Ports pick the program. Sequence numbers put the bytes back in order.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 4),
};
