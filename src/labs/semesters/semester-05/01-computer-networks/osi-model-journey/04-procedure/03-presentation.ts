import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Presentation: encrypt",
  body: "The presentation layer decides how the bytes are represented on the way. The text is already UTF-8, the encoding both ends expect, so it stays as it is. Then TLS encrypts it, because the address bar says https.\n\nTLS 1.3 adds one byte that records the content type and encrypts it together with the request, so 61 bytes become ciphertext. It puts a 16-byte authentication tag after the ciphertext and a 5-byte record header in front. The record is now 82 bytes. Anyone on the path can see that a record went by, and how long it is. Only the server, which shares the session key, can read it, and the tag tells the server whether a single bit was changed.\n\nThe TCP/IP model has no separate presentation layer. TLS and the application do this job between them. The OSI floor gives the job a name.",
  show: [],
  schematic: osiFigure("presentation"),
  osi: {
    device: "laptop",
    layer: 6,
    blocks: ["tls", "data", "tag"],
    focus: ["tls", "tag"],
    encrypted: true,
    note: {
      title: "+ TLS header 5 B, + tag 16 B",
      text: "The request becomes ciphertext. The tag lets the server notice a single changed bit.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 2),
};
