import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Presentation: decrypt",
  body: "TLS reads the 5-byte record header to find the length, then checks the 16-byte tag with the session key. The tag matches, so the record was not changed on the way. TLS decrypts the 61 bytes, reads the content type byte, and removes it. What is left is the request, 60 bytes, exactly as the browser wrote it.\n\nOne changed bit anywhere in the record would have made the tag fail. The server would then close the connection rather than act on data it cannot trust.",
  show: [],
  osi: {
    device: "server",
    layer: 6,
    blocks: ["data"],
    focus: ["data"],
    note: {
      title: "− TLS header, − tag",
      text: "The tag checks out, so the ciphertext is decrypted back to the 60-byte request.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
