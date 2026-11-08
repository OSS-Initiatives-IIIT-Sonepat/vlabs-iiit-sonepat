import type { SchematicData, SchematicElement } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { ARP_BENCH } from "@/labs/networks/arp";

import { netFigure, sequenceFigure, type SeqMessage } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(ARP_BENCH, frame, title);

export const theoryDiagram = figure({}, "One LAN and its gateway");

const ARP: SeqMessage[] = [
  { from: 0, to: 1, label: "Who has .12? (to FF-FF-…)", color: "#8b5cd6" },
  { from: 0, to: 2, label: "same broadcast", color: "#8b5cd6" },
  { from: 2, to: 0, label: ".12 is at 00-…-4D-12", color: "#22a55a" },
  { from: 0, to: 2, label: "ICMP echo request" },
];

const ACTORS = ["PC A .10", "PC B .11", "PC C .12"];

export const arpRequest = sequenceFigure(ACTORS, ARP, 2);
export const arpReply = sequenceFigure(ACTORS, ARP, 4);

/** The fields of the ARP request and the reply, side by side. */
function packetFigure(): SchematicData {
  const width = 470;
  const height = 230;
  const rows: [string, string, string][] = [
    ["Operation", "1 request", "2 reply"],
    ["Sender MAC", "00-…-4D-10", "00-…-4D-12"],
    ["Sender IP", "192.168.1.10", "192.168.1.12"],
    ["Target MAC", "00-00-00-00-00-00", "00-…-4D-10"],
    ["Target IP", "192.168.1.12", "192.168.1.10"],
    ["Ethernet dst", "FF-FF-FF-FF-FF-FF", "00-…-4D-10"],
  ];
  const els: SchematicElement[] = [
    { type: "label", id: "h1", x: 230, y: 20, text: "Request" },
    { type: "label", id: "h2", x: 380, y: 20, text: "Reply" },
  ];
  rows.forEach(([field, req, rep], i) => {
    const y = 46 + i * 30;
    els.push(
      { type: "block", id: `f-${i}`, x: 76, y, w: 124, h: 24, label: field },
      {
        type: "block",
        id: `q-${i}`,
        x: 230,
        y,
        w: 138,
        h: 24,
        label: req,
        fill: "#e4daf7",
      },
      {
        type: "block",
        id: `p-${i}`,
        x: 380,
        y,
        w: 138,
        h: 24,
        label: rep,
        fill: "#d3f0e0",
      },
    );
  });
  return { width, height, gallery: true, elements: els };
}

export const arpPacket = packetFigure();
