import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { revealedTable } from "@/labs/experiments/reveal-table";
import {
  DIRECT,
  SAME_NET,
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/peer-to-peer";

const net: NetFrame = {
  show: DIRECT,
  hot: ["pcB"],
  addr: SAME_NET,
  packets: [
    { path: ["pcA", "pcB"], label: "SMB write" },
    { path: ["pcB", "pcA"], label: "SMB ok", color: "green" },
  ],
  consoles: [
    {
      at: "pcA",
      title: "Command Prompt · PC A",
      lines: [
        "C:\\>net use Z: \\\\192.168.0.2\\Share",
        "The command completed successfully.",
        "C:\\>copy notes.txt Z:\\",
        "        1 file(s) copied.",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Share a folder between the peers",
  body: "On PC B, share the folder C:\\Share as Share. On PC A, map it to drive Z: with net use, and copy a file to it.\n\nPC B acts as the file server and PC A as the client, but either PC can share and either can use. That is what makes the network peer to peer.",
  show: [],
  schematic: figure(net),
  net,
  table: revealedTable(P2P_TABLE_HEADERS, P2P_TABLE_ROWS, 1),
};
