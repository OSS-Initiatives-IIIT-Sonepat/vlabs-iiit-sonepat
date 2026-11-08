import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Physical: receive the bits",
  body: "The server's network card sees the preamble, locks its clock to it, and waits for the start frame delimiter. The bits after the delimiter are collected into a frame. The preamble and the delimiter are dropped here. They only existed to get the bits across the cable.\n\nFrom this floor up, each layer undoes what the same layer did on the laptop. That is why the bench has two matching stacks. Each floor on the server reads the block written by the same floor on the laptop, and no other.",
  show: [],
  osi: {
    device: "server",
    layer: 1,
    blocks: ["pre", "eth", "ip", "tcp", "tls", "data", "tag", "fcs"],
    focus: ["pre"],
    encrypted: true,
    bits: true,
    note: {
      title: "1184 bits in",
      text: "The preamble locks the clock. After the delimiter, the bits are a frame again.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
