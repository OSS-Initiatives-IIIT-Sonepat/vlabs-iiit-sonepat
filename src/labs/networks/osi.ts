/**
 * The OSI journey: one HTTPS request from a laptop to a web server.
 * Layer colours, the pieces of the frame, and the addresses on the way.
 */

export type OsiLayerNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OsiLayer = {
  n: OsiLayerNumber;
  name: string;
  /** The name of the data unit at this layer. */
  unit: string;
  /** Strong colour for the layer's header blocks and labels. */
  color: string;
  /** Pale colour for the back wall of the layer's floor. */
  wall: string;
};

/** Bottom to top. `OSI_LAYERS[n - 1]` is layer n. */
export const OSI_LAYERS: readonly OsiLayer[] = [
  {
    n: 1,
    name: "Physical",
    unit: "Bits",
    color: "#8b5cd6",
    wall: "#e4daf7",
  },
  {
    n: 2,
    name: "Data link",
    unit: "Frame",
    color: "#3b6fe0",
    wall: "#d3defa",
  },
  {
    n: 3,
    name: "Network",
    unit: "Packet",
    color: "#1b9fb5",
    wall: "#c9ecf2",
  },
  {
    n: 4,
    name: "Transport",
    unit: "Segment",
    color: "#38a866",
    wall: "#d0eedc",
  },
  {
    n: 5,
    name: "Session",
    unit: "Data",
    color: "#d9a40e",
    wall: "#f8ecbf",
  },
  {
    n: 6,
    name: "Presentation",
    unit: "Data",
    color: "#ec8423",
    wall: "#fbe0c6",
  },
  {
    n: 7,
    name: "Application",
    unit: "Data",
    color: "#e2513b",
    wall: "#f8d2cb",
  },
];

export function osiLayer(n: OsiLayerNumber): OsiLayer {
  return OSI_LAYERS[n - 1];
}

/** One piece of the frame. They always sit in `PDU_ORDER`, left to right. */
export type PduBlockId =
  "pre" | "eth" | "ip" | "tcp" | "tls" | "data" | "tag" | "fcs";

export type PduBlock = {
  title: string;
  bytes: number;
  /** The layer that adds this block on the way down. */
  layer: OsiLayerNumber;
  /** Width of the block in the scene. Not to scale with the bytes. */
  width: number;
};

export const PDU_ORDER: readonly PduBlockId[] = [
  "pre",
  "eth",
  "ip",
  "tcp",
  "tls",
  "data",
  "tag",
  "fcs",
];

/** The HTTP request the browser writes. 60 bytes with the line endings. */
export const HTTP_REQUEST = [
  "GET / HTTP/1.1",
  "Host: www.example.com",
  "Accept: text/html",
];

export const PDU_BLOCKS: Record<PduBlockId, PduBlock> = {
  pre: { title: "Preamble", bytes: 8, layer: 1, width: 0.5 },
  eth: { title: "Ethernet", bytes: 14, layer: 2, width: 0.66 },
  ip: { title: "IP", bytes: 20, layer: 3, width: 0.62 },
  tcp: { title: "TCP", bytes: 20, layer: 4, width: 0.62 },
  tls: { title: "TLS", bytes: 5, layer: 6, width: 0.44 },
  data: { title: "GET /", bytes: 60, layer: 7, width: 1.1 },
  tag: { title: "Tag", bytes: 16, layer: 6, width: 0.46 },
  fcs: { title: "FCS", bytes: 4, layer: 2, width: 0.44 },
};

/** TLS 1.3 encrypts one content-type byte along with the request. */
export const ENCRYPTED_DATA_BYTES = PDU_BLOCKS.data.bytes + 1;

export type OsiDevice = "laptop" | "switch" | "router" | "server";

/** The name and addresses printed under each box. A router has one per port. */
export const OSI_HOSTS: Record<
  OsiDevice,
  { name: string; addresses: readonly string[] }
> = {
  laptop: { name: "Laptop", addresses: ["192.168.1.10"] },
  switch: { name: "Switch", addresses: ["layer 2 · no IP"] },
  router: { name: "Router", addresses: ["192.168.1.1", "203.0.113.1"] },
  server: { name: "Web server", addresses: ["203.0.113.10"] },
};

/** What the scene shows on one procedure step. */
export type OsiFrame = {
  /** Where the data is. `null` is the overview with nothing sent yet. */
  device: OsiDevice | null;
  /** The floor of the laptop or server stack the data is on. */
  layer?: OsiLayerNumber;
  /** The blocks the data unit has at this moment. */
  blocks: readonly PduBlockId[];
  /** A short second line on a block, such as the TTL or the next MAC. */
  captions?: Partial<Record<PduBlockId, string>>;
  /** Blocks this step is about. They lift and get an orange edge. */
  focus?: readonly PduBlockId[];
  /** The request has been encrypted by TLS. */
  encrypted?: boolean;
  /** The frame is a stream of bits on a cable. */
  bits?: boolean;
  /** The note that pops out beside the data unit. */
  note?: { title: string; text: string };
  /** Draw the whole path, as it is once the request has arrived. */
  arrived?: boolean;
};

export const OSI_OVERVIEW: OsiFrame = { device: null, blocks: [] };

export function pduBytes(frame: Pick<OsiFrame, "blocks" | "encrypted">) {
  return frame.blocks.reduce(
    (sum, id) =>
      sum +
      (id === "data" && frame.encrypted
        ? ENCRYPTED_DATA_BYTES
        : PDU_BLOCKS[id].bytes),
    0,
  );
}

/** The name of the data unit, from its outermost block. */
export function pduName(frame: Pick<OsiFrame, "blocks" | "bits">): string {
  if (frame.bits) return "Bits";
  if (frame.blocks.includes("eth")) return "Frame";
  if (frame.blocks.includes("ip")) return "Packet";
  if (frame.blocks.includes("tcp")) return "Segment";
  if (frame.blocks.includes("tls")) return "TLS record";
  return "Data";
}

/** The observation table, one row per layer on the way down. */
export const OSI_TABLE_HEADERS = ["Layer", "Unit", "Adds", "Size"];

export const OSI_TABLE_ROWS: (string | number)[][] = [
  ["7 Application", "Data", "HTTP request", "60 B"],
  ["6 Presentation", "TLS record", "5 B header, 1 B type, 16 B tag", "82 B"],
  ["5 Session", "TLS record", "Nothing on the wire", "82 B"],
  ["4 Transport", "Segment", "TCP header, 20 B", "102 B"],
  ["3 Network", "Packet", "IP header, 20 B", "122 B"],
  ["2 Data link", "Frame", "Ethernet 14 B + FCS 4 B", "140 B"],
  ["1 Physical", "Bits", "Preamble and SFD, 8 B", "148 B = 1184 bits"],
];
