import type {
  Pt,
  SchematicData,
  SchematicElement,
} from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { SOCKET_BENCH } from "@/labs/networks/socket-bench";

import { netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(SOCKET_BENCH, frame, title);

export type RpcPart =
  "idl" | "prog" | "cstub" | "crt" | "proc" | "sstub" | "srt" | "bind";

const CX = 100;
const SX = 300;

const PARTS: {
  id: RpcPart;
  x: number;
  y: number;
  w: number;
  label: string;
  fill?: string;
}[] = [
  { id: "prog", x: CX, y: 54, w: 130, label: "Client program\nadd(5, 7)" },
  {
    id: "cstub",
    x: CX,
    y: 112,
    w: 130,
    label: "Client stub\nadd_1()",
    fill: "#dbe5ff",
  },
  {
    id: "crt",
    x: CX,
    y: 170,
    w: 130,
    label: "RPC library\nXDR encode",
    fill: "#f4f6fb",
  },
  { id: "proc", x: SX, y: 54, w: 130, label: "Remote procedure\nadd_1_svc()" },
  {
    id: "sstub",
    x: SX,
    y: 112,
    w: 130,
    label: "Server stub\nadd_prog_1()",
    fill: "#dbe5ff",
  },
  {
    id: "srt",
    x: SX,
    y: 170,
    w: 130,
    label: "RPC library\nXDR decode",
    fill: "#f4f6fb",
  },
  {
    id: "bind",
    x: 440,
    y: 112,
    w: 76,
    label: "rpcbind\n:111",
    fill: "#fdecc0",
  },
];

const MESSAGES: Record<
  "set" | "getport" | "call" | "reply",
  { points: Pt[]; text: string; color: string }
> = {
  set: {
    points: [
      { x: SX + 30, y: 95 },
      { x: SX + 30, y: 84 },
      { x: 440, y: 84 },
      { x: 440, y: 95 },
    ],
    text: "SET v1 → :40123",
    color: "#8b5cd6",
  },
  getport: {
    points: [
      { x: CX + 20, y: 187 },
      { x: CX + 20, y: 214 },
      { x: 440, y: 214 },
      { x: 440, y: 129 },
    ],
    text: "GETPORT prog 0x23451111 v1 → 40123",
    color: "#3b6fe0",
  },
  call: {
    points: [
      { x: CX + 20, y: 187 },
      { x: CX + 20, y: 214 },
      { x: SX - 20, y: 214 },
      { x: SX - 20, y: 187 },
    ],
    text: "CALL proc 1 · 00 00 00 05 00 00 00 07",
    color: "#f59e0b",
  },
  reply: {
    points: [
      { x: SX - 20, y: 187 },
      { x: SX - 20, y: 214 },
      { x: CX + 20, y: 214 },
      { x: CX + 20, y: 187 },
    ],
    text: "REPLY · 00 00 00 0C (12)",
    color: "#22a55a",
  },
};

/**
 * The layers of an RPC call: program, stub and RPC library on each side,
 * rpcbind on the server, and the message of the step on the network.
 */
export function rpcFigure(
  hot: readonly RpcPart[],
  message?: keyof typeof MESSAGES,
): SchematicData {
  const width = 500;
  const height = 250;
  const els: SchematicElement[] = [
    { type: "label", id: "c-side", x: CX, y: 16, text: "Client 192.168.1.10" },
    { type: "label", id: "s-side", x: SX, y: 16, text: "Server 192.168.1.20" },
  ];
  for (const [x, a, b] of [
    [CX, 71, 95],
    [CX, 129, 153],
    [SX, 71, 95],
    [SX, 129, 153],
  ]) {
    els.push({
      type: "arrow",
      id: `v-${x}-${a}`,
      points: [
        { x, y: a },
        { x, y: b },
      ],
      double: true,
      size: 6,
    });
  }
  if (message) {
    const m = MESSAGES[message];
    els.push({
      type: "arrow",
      id: `msg-${message}`,
      points: m.points,
      size: 7,
      color: m.color,
    });
    els.push({
      type: "label",
      id: `msg-${message}-t`,
      x: message === "set" ? 432 : 270,
      y: message === "set" ? 77 : 234,
      text: m.text,
      size: 9,
      color: m.color,
    });
  }
  for (const p of PARTS) {
    els.push({
      type: "block",
      id: p.id,
      x: p.x,
      y: p.y,
      w: p.w,
      h: 34,
      label: p.label,
      fill: hot.includes(p.id) ? undefined : p.fill,
      highlight: hot.includes(p.id),
    });
  }
  if (hot.includes("idl"))
    els.push({
      type: "label",
      id: "idl",
      x: 200,
      y: 236,
      text: "rpcgen add.x → add.h, add_clnt.c, add_svc.c, add_xdr.c",
      size: 9,
      color: "#2563eb",
    });
  return { width, height, gallery: true, elements: els };
}

export const theoryDiagram = rpcFigure([]);
