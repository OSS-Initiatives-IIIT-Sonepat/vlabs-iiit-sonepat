import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { ARP_BENCH } from "@/labs/networks/arp";

import {
  netFigure,
  pduFigure,
  sequenceFigure,
  type SeqMessage,
} from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(ARP_BENCH, frame, title);

export const theoryDiagram = figure({}, "One LAN and its gateway");

const ARP: SeqMessage[] = [
  { from: 0, to: 1, label: "Who has .12? (to FF-FF-…)", color: "#8b5cd6" },
  { from: 0, to: 2, label: "same broadcast", color: "#8b5cd6" },
  { from: 2, to: 0, label: ".12 is at 00-…-4D-12", color: "#22a55a" },
  { from: 0, to: 2, label: "ICMP echo request", type: "ICMP" },
];

const ACTORS = ["PC A .10", "PC B .11", "PC C .12"];

export const arpRequest = sequenceFigure(ACTORS, ARP, 2, [], "ARP");
export const arpReply = sequenceFigure(ACTORS, ARP, 4, [], "ARP");

/** The ARP request and the reply, as PC A's PDU Information window lists them. */
export const arpPacket = pduFigure(
  "PDU Information at Device: PC A",
  ["OSI Model", "Inbound PDU Details", "Outbound PDU Details"],
  2,
  "ARP",
  ["Field", "Request (out)", "Reply (in)"],
  [
    ["OPCODE", "0x0001 (request)", "0x0002 (reply)"],
    ["SOURCE MAC", "001A.2B3C.4D10", "001A.2B3C.4D12"],
    ["SOURCE IP", "192.168.1.10", "192.168.1.12"],
    ["TARGET MAC", "0000.0000.0000", "001A.2B3C.4D10"],
    ["TARGET IP", "192.168.1.12", "192.168.1.10"],
    ["Ethernet DEST", "FFFF.FFFF.FFFF", "001A.2B3C.4D10"],
  ],
  "Packet Tracer writes 00-1A-2B-3C-4D-10 as 001A.2B3C.4D10.",
);
