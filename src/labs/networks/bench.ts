/**
 * The network bench: one room (or a few rooms) of devices and cables that a
 * Computer Networks lab is built on. A lab describes its bench once, and
 * each procedure step describes what the bench shows at that moment.
 *
 * Coordinates are in scene units on the floor: `x` to the right, `z`
 * toward the viewer. A desktop PC is about 1.7 units wide.
 */

export type NetDeviceKind =
  // Network devices
  | "pc"
  | "laptop"
  | "server"
  | "switch"
  | "hub"
  | "router"
  | "ap"
  | "printer"
  | "cloud"
  | "terminator"
  | "tap"
  // Parts on a workbench
  | "table"
  | "nic"
  | "wifi-usb"
  | "utp"
  | "stp"
  | "coax"
  | "fiber"
  | "crimper"
  | "stripper"
  | "rj45"
  | "cable-end"
  | "tester";

export type NetDevice = {
  id: string;
  kind: NetDeviceKind;
  /** Printed in the device's label. No label is drawn without a name. */
  name?: string;
  x: number;
  z: number;
  /** Height of the base. Parts on a table sit at `TABLE_TOP`. */
  y?: number;
  /** Turn about the vertical, in degrees. */
  ry?: number;
  /** Lines printed under the name, such as the IP address. */
  addresses?: readonly string[];
  /** The model the 2D workspace prints, such as "2911". By kind when left out. */
  model?: string;
  /** Width and depth, for a table. */
  size?: readonly [number, number];
  /** For a cable end: the id of the other end of the same cable. */
  pair?: string;
};

export type NetLinkKind =
  "straight" | "cross" | "console" | "serial" | "fiber" | "coax" | "wifi";

export type NetLink = {
  id: string;
  a: string;
  b: string;
  kind: NetLinkKind;
  /** Port names or a cable name, printed at the middle of the cable. */
  label?: string;
  /** Corner points on the floor, from `a` to `b`. */
  via?: readonly (readonly [number, number])[];
};

/** A room: a floor tile with two low walls behind it and a name. */
export type NetZone = {
  id: string;
  label: string;
  x: number;
  z: number;
  w: number;
  d: number;
};

export type NetBench = {
  devices: readonly NetDevice[];
  links: readonly NetLink[];
  zones?: readonly NetZone[];
};

export type PacketColor = "orange" | "blue" | "green" | "red" | "purple";

/** A data unit that runs along cables, from the first device to the last. */
export type NetPacket = {
  /** Device ids, in order. Consecutive devices must share a link. */
  path: readonly string[];
  label?: string;
  color?: PacketColor;
  /** Start time in seconds. By default a packet starts when the one before it ends. */
  at?: number;
  /** The packet is lost at the last device of its path. */
  drop?: boolean;
};

/** A text card beside a device: a command prompt, a router console, a table. */
export type NetConsole = {
  at: string;
  title: string;
  lines: readonly string[];
};

export type LinkState = "up" | "down" | "amber" | "off";

/** The stages of making one end of a twisted-pair cable. */
export type CableStage =
  "jacket" | "stripped" | "ordered" | "inserted" | "crimped";

export type WiringStandard = "T568A" | "T568B";

/** What the bench shows on one procedure step. Everything is optional. */
export type NetFrame = {
  /** Device and link ids on the bench. All of them when left out. */
  show?: readonly string[];
  /** Devices and links the step is about. They get an orange ring or glow. */
  hot?: readonly string[];
  /** Devices the camera frames. The hot devices, or the whole bench, by default. */
  focus?: readonly string[];
  /** Pull the camera back (> 1) or in (< 1) from the fitted view. */
  zoom?: number;
  /** Lights at the two ends of a cable. Shown links are "up" by default. */
  links?: Readonly<Record<string, LinkState>>;
  /** Address lines that replace a device's own for this step. */
  addr?: Readonly<Record<string, readonly string[]>>;
  /** A short badge under a device's label. ✓ is green and ✕ is red. */
  tags?: Readonly<Record<string, string>>;
  /** Devices that blink their lights: a busy hub, a printing printer. */
  busy?: readonly string[];
  /** Devices moved from where the bench puts them, such as a card going into a slot. */
  moves?: Readonly<Record<string, { x: number; z: number; y?: number }>>;
  packets?: readonly NetPacket[];
  consoles?: readonly NetConsole[];
  /** The note that points at a device. */
  note?: { at?: string; title: string; text: string };
  /** The state of each cable end on the workbench. */
  ends?: Readonly<
    Record<string, { stage: CableStage; standard?: WiringStandard }>
  >;
  /** A cable tester at work: which pin of the remote lights for each pin. */
  tester?: { id: string; wiring: "straight" | "cross" };
};

/** Height of a workbench top. Parts on it set `y: TABLE_TOP`. */
export const TABLE_TOP = 0.8;

export type WireColor = {
  name: string;
  /** Base colour of the insulation. */
  base: string;
  /** Colour of the stripe, for the white wires of a pair. */
  stripe?: string;
};

const ORANGE = "#f08a24";
const GREEN = "#2f9e44";
const BLUE = "#2563eb";
const BROWN = "#8b5a2b";
const WHITE = "#f4f4f5";

export const WIRE: Record<string, WireColor> = {
  wo: { name: "White-orange", base: WHITE, stripe: ORANGE },
  o: { name: "Orange", base: ORANGE },
  wg: { name: "White-green", base: WHITE, stripe: GREEN },
  g: { name: "Green", base: GREEN },
  wb: { name: "White-blue", base: WHITE, stripe: BLUE },
  b: { name: "Blue", base: BLUE },
  wbr: { name: "White-brown", base: WHITE, stripe: BROWN },
  br: { name: "Brown", base: BROWN },
};

/** Pin 1 to pin 8, clip facing down, contacts facing you. */
export const WIRING: Record<WiringStandard, readonly string[]> = {
  T568A: ["wg", "g", "wo", "b", "wb", "o", "wbr", "br"],
  T568B: ["wo", "o", "wg", "b", "wb", "g", "wbr", "br"],
};

/** Which remote pin lights for each pin of the main unit, pins 1 to 8. */
export const TESTER_MAP: Record<"straight" | "cross", readonly number[]> = {
  straight: [1, 2, 3, 4, 5, 6, 7, 8],
  cross: [3, 6, 1, 4, 5, 2, 7, 8],
};

export const PACKET_COLORS: Record<PacketColor, string> = {
  orange: "#f59e0b",
  blue: "#3b6fe0",
  green: "#22a55a",
  red: "#dc2626",
  purple: "#8b5cd6",
};

/** The lab's view before the procedure starts: every device, no traffic. */
export const NET_OVERVIEW: NetFrame = {};
