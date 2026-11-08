import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { SOCKET_BENCH } from "@/labs/networks/socket-bench";

import { netFigure, sequenceFigure, type SeqMessage } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(SOCKET_BENCH, frame, title);

export const theoryDiagram = figure({}, "Client and server on one switch");

const TCP: SeqMessage[] = [
  { from: 0, to: 1, label: "SYN seq=1000" },
  { from: 1, to: 0, label: "SYN-ACK seq=5000 ack=1001" },
  { from: 0, to: 1, label: "ACK ack=5001" },
  { from: 0, to: 1, label: "hello seq=1001 len=5" },
  { from: 1, to: 0, label: "ACK ack=1006" },
  { from: 1, to: 0, label: "HELLO seq=5001 len=5" },
  { from: 0, to: 1, label: "ACK ack=5006" },
];

const LOSS: SeqMessage[] = [
  ...TCP,
  { from: 0, to: 1, label: "bye seq=1006", lost: true },
  { from: 0, to: 1, label: "bye seq=1006 (resent)" },
  { from: 1, to: 0, label: "ACK ack=1009" },
];

const CLOSE: SeqMessage[] = [
  { from: 0, to: 1, label: "FIN seq=1009" },
  { from: 1, to: 0, label: "ACK ack=1010" },
  { from: 1, to: 0, label: "FIN seq=5006" },
  { from: 0, to: 1, label: "ACK ack=5007" },
];

const ACTORS = ["Client :50821", "Server :5000"];

export const handshake = sequenceFigure(ACTORS, TCP, 3);
export const sendHello = sequenceFigure(ACTORS, TCP, 5);
export const replyHello = sequenceFigure(ACTORS, TCP, 7);
export const lostSegment = sequenceFigure(ACTORS, LOSS.slice(3), 7);
export const teardown = sequenceFigure(ACTORS, CLOSE, 4);
