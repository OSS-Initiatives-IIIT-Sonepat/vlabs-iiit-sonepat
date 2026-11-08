import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Session: keep the conversation",
  body: "The session layer keeps track of the conversation this request belongs to. Before this request, the laptop and the server ran a TLS handshake, agreed on keys, and opened a session. Later requests reuse it and skip the handshake. If the connection drops, a session ticket lets the browser resume without starting again.\n\nNone of this is a header. The session is state kept at the two ends, the keys and the open connection, so the data unit leaves this floor exactly as it arrived: 82 bytes. This floor shows most clearly that the OSI model names jobs. It is not a list of headers that every packet must carry.",
  show: [],
  schematic: osiFigure("session"),
  osi: {
    device: "laptop",
    layer: 5,
    blocks: ["tls", "data", "tag"],
    focus: [],
    encrypted: true,
    note: {
      title: "Session · no new block",
      text: "The session is state at both ends: the TLS keys and the open connection. No bytes are added.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 3),
};
