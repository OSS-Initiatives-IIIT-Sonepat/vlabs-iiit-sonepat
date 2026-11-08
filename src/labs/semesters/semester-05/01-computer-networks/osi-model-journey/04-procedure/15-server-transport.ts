import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Transport: deliver to port 443",
  body: "TCP finds the connection by four numbers: 192.168.1.10 port 49152 to 203.0.113.10 port 443. That connection belongs to the web server. The checksum is correct, and the sequence number is the one TCP expected next, so the bytes are in order.\n\nTCP sends an acknowledgement back to the laptop, so the laptop will not send these bytes again. It removes the 20-byte header and gives the 82-byte TLS record to the program listening on port 443.",
  show: [],
  osi: {
    device: "server",
    layer: 4,
    blocks: ["tls", "data", "tag"],
    focus: ["tls", "tag"],
    encrypted: true,
    note: {
      title: "− TCP header",
      text: "Port 443 is the web server. TCP acknowledges the bytes and passes them up in order.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
