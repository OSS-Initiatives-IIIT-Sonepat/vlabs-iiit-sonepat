import {
  type ComponentInstance,
  type LedColor,
  type Row,
  type WireColor,
} from "@/labs/types";

/**
 * Breadboard helpers for the Digital Electronics experiments.
 *
 * Layout used by every board:
 *  - 5 V supply on the top rails; `w_rail_link` feeds the bottom + rail.
 *  - ICs straddle the centre gap at row e/f. Each IC gets one VCC and one
 *    GND jumper to the rail on the same side as that pin.
 *  - Inputs are tie columns in the top bank (cols 2, 4, …). The student
 *    jumpers a column to +5 V for 1 or to GND for 0. Wire ids are
 *    `w_<input>_<n>`: the simulator reads the input name from the id.
 *  - An indicator is a jumper from the IC pin to a 330 Ω resistor, an LED
 *    whose anode shares the resistor's far column, and a jumper from the
 *    LED cathode to GND. The LED never shares a column with a chip pin.
 */

export const B = "bb";

type Side = "top" | "bot";
/** Which bank each chip's VCC and GND pins sit in. */
const SUPPLY_SIDE: Record<string, { vcc: Side; gnd: Side }> = {
  "jk-ff": { vcc: "top", gnd: "bot" },
  "counter-4bit-async": { vcc: "top", gnd: "bot" },
};

export function board(
  opts: { gndLink?: boolean; wide?: boolean } = {},
): ComponentInstance[] {
  const last = opts.wide ? 100 : 60;
  const parts: ComponentInstance[] = [
    { id: B, type: opts.wide ? "wide-breadboard" : "long-breadboard" },
    {
      id: "psu",
      type: "dc-jack",
      label: "+5 V",
      mountedAt: { board: B, col: 1, row: "a" },
      terminals: [
        { board: B, rail: "vcc_top", col: 1 },
        { board: B, rail: "gnd_top", col: 1 },
      ],
    },
    {
      id: "w_rail_link",
      type: "wire",
      color: "purple",
      from: { board: B, rail: "vcc_top", col: last },
      to: { board: B, rail: "vcc_bot", col: last },
    },
  ];
  if (opts.gndLink) {
    parts.push({
      id: "w_gnd_link",
      type: "wire",
      color: "black",
      from: { board: B, rail: "gnd_top", col: last - 1 },
      to: { board: B, rail: "gnd_bot", col: last - 1 },
    });
  }
  return parts;
}

/** An IC straddling the centre gap, pin 1 at `col`, plus its two supply jumpers. */
export function ic(
  id: string,
  type: ComponentInstance["type"],
  col: number,
): ComponentInstance[] {
  const side = SUPPLY_SIDE[type] ?? { vcc: "bot", gnd: "top" };
  return [
    { id, type, mountedAt: { board: B, col, row: "e" } } as ComponentInstance,
    {
      id: `w_vcc_${id}`,
      type: "wire",
      color: "purple",
      from: { board: B, rail: side.vcc === "top" ? "vcc_top" : "vcc_bot", col },
      to: { ic: id, pin: "VCC" },
    },
    {
      id: `w_gnd_${id}`,
      type: "wire",
      color: "black",
      from: {
        board: B,
        rail: side.gnd === "top" ? "gnd_top" : "gnd_bot",
        col: col + 1,
      },
      to: { ic: id, pin: "GND" },
    },
  ];
}

/** Input tie column → IC pin. `name` is the activeInputs key. */
export function input(
  id: string,
  col: number,
  row: Row,
  to: { ic: string; pin: string },
  color: WireColor = "blue",
): ComponentInstance {
  return { id, type: "wire", color, from: { board: B, col, row }, to };
}

/** IC pin → IC pin. */
export function link(
  id: string,
  from: { ic: string; pin: string },
  to: { ic: string; pin: string },
  color: WireColor = "yellow",
): ComponentInstance {
  return { id, type: "wire", color, from, to };
}

/** Tie an IC pin to +5 V or GND (enables, unused set/clear inputs). */
export function tie(
  id: string,
  to: { ic: string; pin: string },
  level: "vcc" | "gnd",
  col: number,
): ComponentInstance {
  const high = level === "vcc";
  return {
    id,
    type: "wire",
    color: high ? "red" : "black",
    from: { board: B, rail: high ? "vcc_top" : "gnd_top", col },
    to,
  };
}

/**
 * Source → 330 Ω → LED → GND at cols col…col+4, in the top bank (GND on
 * the top rail) or the bottom bank (GND on the bottom rail, needs
 * `board({ gndLink: true })`). The source is an IC pin or a tie hole.
 * Ids: `r_<name>`, `led_<name>`, jumper ids given by the caller.
 */
export function lamp(
  name: string,
  from: { ic: string; pin: string } | { board: string; col: number; row: Row },
  col: number,
  color: LedColor,
  wireId: string,
  gndId: string,
  wireColor: WireColor = "green",
  bank: "top" | "bot" = "top",
  partIds?: { r: string; led: string },
): ComponentInstance[] {
  const top = bank === "top";
  const rId = partIds?.r ?? `r_${name}`;
  const ledId = partIds?.led ?? `led_${name}`;
  return [
    {
      id: rId,
      type: "resistor",
      ohms: 330,
      mountedAt: { board: B, col, row: top ? "b" : "i" },
    },
    {
      id: ledId,
      type: "led",
      color,
      mountedAt: { board: B, col: col + 3, row: top ? "c" : "h" },
    },
    {
      id: wireId,
      type: "wire",
      color: wireColor,
      from,
      to: { component: rId, end: "p1" },
    },
    {
      id: gndId,
      type: "wire",
      color: "black",
      from: { led: ledId, end: "cathode" },
      to: { board: B, rail: top ? "gnd_top" : "gnd_bot", col: col + 4 },
    },
  ];
}

/**
 * Indicator for an active-LOW output: +5 V → 330 Ω → LED → IC pin.
 * The LED lights when the pin sinks current (pin LOW). Top bank,
 * cols col…col+4.
 */
export function sinkLamp(
  name: string,
  to: { ic: string; pin: string },
  col: number,
  color: LedColor,
  vccId: string,
  pinId: string,
  wireColor: WireColor = "green",
): ComponentInstance[] {
  return [
    {
      id: `r_${name}`,
      type: "resistor",
      ohms: 330,
      mountedAt: { board: B, col, row: "b" },
    },
    {
      id: `led_${name}`,
      type: "led",
      color,
      mountedAt: { board: B, col: col + 3, row: "c" },
    },
    {
      id: vccId,
      type: "wire",
      color: "red",
      from: { board: B, rail: "vcc_top", col },
      to: { component: `r_${name}`, end: "p1" },
    },
    {
      id: pinId,
      type: "wire",
      color: wireColor,
      from: { led: `led_${name}`, end: "cathode" },
      to,
    },
  ];
}

export function ids(parts: readonly ComponentInstance[]): string[] {
  return parts.map((p) => p.id);
}
