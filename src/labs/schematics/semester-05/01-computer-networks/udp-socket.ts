import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { SOCKET_BENCH } from "@/labs/networks/socket-bench";

import { netFigure, sequenceFigure, type SeqMessage } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(SOCKET_BENCH, frame, title);

export const theoryDiagram = figure({}, "Client and server on one switch");

const ACTORS = ["Client :50900", "Server :5001"];

const UDP: SeqMessage[] = [
  { from: 0, to: 1, label: "hello (datagram)" },
  { from: 1, to: 0, label: "HELLO (datagram)", color: "#22a55a" },
  { from: 0, to: 1, label: "ping 2", lost: true },
  { from: 0, to: 1, label: "ping 2 (sent again by the app)" },
  { from: 1, to: 0, label: "PING 2", color: "#22a55a" },
];

export const sendOne = sequenceFigure(ACTORS, UDP, 1, [], "UDP");
export const replyOne = sequenceFigure(ACTORS, UDP, 2, [], "UDP");
export const lostOne = sequenceFigure(
  ACTORS,
  UDP,
  5,
  [{ at: 2, side: 0, text: "no reply, timeout after 2 s" }],
  "UDP",
);

/** The UDP header beside the TCP header, 32 bits to a row. */
function headersFigure(): SchematicData {
  const width = 460;
  const height = 236;
  const els: SchematicElement[] = [];
  const byte = 44;
  const rowH = 30;
  const column = (
    id: string,
    x0: number,
    title: string,
    rows: [string, number][][],
    fill: string,
  ) => {
    els.push({
      type: "label",
      id: `${id}-t`,
      x: x0 + 2 * byte,
      y: 22,
      text: title,
    });
    rows.forEach((fields, r) => {
      let x = x0;
      for (const [name, bytes] of fields) {
        const w = bytes * byte;
        els.push({
          type: "block",
          id: `${id}-${r}-${name}`,
          x: x + w / 2,
          y: 48 + r * rowH,
          w: w - 2,
          h: rowH - 4,
          label: name,
          fill,
        });
        x += w;
      }
    });
  };
  column(
    "udp",
    24,
    "UDP · 8 bytes",
    [
      [
        ["Src port", 2],
        ["Dst port", 2],
      ],
      [
        ["Length", 2],
        ["Checksum", 2],
      ],
    ],
    "#dbe5ff",
  );
  column(
    "tcp",
    256,
    "TCP · 20 bytes or more",
    [
      [
        ["Src port", 2],
        ["Dst port", 2],
      ],
      [["Sequence number", 4]],
      [["Ack number", 4]],
      [
        ["Flags", 2],
        ["Window", 2],
      ],
      [
        ["Checksum", 2],
        ["Urgent", 2],
      ],
    ],
    "#d3f0e0",
  );
  els.push({
    type: "label",
    id: "sizes",
    x: 112,
    y: 128,
    text: "Ports, length, checksum.",
    size: 9,
    color: "#525252",
  });
  els.push({
    type: "label",
    id: "sizes2",
    x: 112,
    y: 142,
    text: "Nothing to number or resend.",
    size: 9,
    color: "#525252",
  });
  return { width, height, gallery: true, elements: els };
}

export const headers = headersFigure();
