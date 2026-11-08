import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Session: find the session",
  body: "The record arrives on a connection that already has a TLS session. The server finds that session's state: the keys agreed in the handshake, and the count of records received so far. Nothing is removed on this floor, because nothing was added on the laptop's session floor.\n\nIf the server had restarted and forgotten the session, it could not read the record, and the browser would have to run a new handshake.",
  show: [],
  osi: {
    device: "server",
    layer: 5,
    blocks: ["tls", "data", "tag"],
    focus: [],
    encrypted: true,
    note: {
      title: "Same session",
      text: "The record belongs to the TLS session opened in the handshake. Its keys are ready.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
