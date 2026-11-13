import { type ComponentInstance } from "@/labs/types";

// Four-bit R-2R ladder, built as in the ADC/DAC experiment, with the bit lines
// on P1.0 to P1.3. Resistor values: 20 kohm (2R) and 10 kohm (R). The analog
// output is the top of the ladder at column 21, read by a voltmeter.
export const components: ComponentInstance[] = [
  { id: "bb", type: "breadboard" },
  { id: "mcu", type: "mcu-8051", side: "right" },
  {
    id: "r1",
    type: "resistor",
    ohms: 20000,
    mountedAt: { board: "bb", col: 3, row: "c" },
  },
  {
    id: "r2",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 8, row: "c" },
  },
  {
    id: "r3",
    type: "resistor",
    ohms: 20000,
    mountedAt: { board: "bb", col: 13, row: "c" },
  },
  {
    id: "r4",
    type: "resistor",
    ohms: 10000,
    mountedAt: { board: "bb", col: 18, row: "c" },
  },
  {
    id: "vm",
    type: "voltmeter",
    mountedAt: { board: "bb", col: 24, row: "c" },
    probes: [
      { board: "bb", col: 21, row: "d" },
      { board: "bb", rail: "gnd_top", col: 22 },
    ],
  },
  {
    id: "w_vcc",
    type: "wire",
    color: "red",
    from: { dev: "mcu", pin: "VCC" },
    to: { board: "bb", rail: "vcc_top", col: 1 },
  },
  {
    id: "w_gnd",
    type: "wire",
    color: "black",
    from: { dev: "mcu", pin: "GND" },
    to: { board: "bb", rail: "gnd_top", col: 1 },
  },
  {
    id: "w_rst",
    type: "wire",
    color: "black",
    from: { dev: "mcu", pin: "RST" },
    to: { board: "bb", rail: "gnd_top", col: 2 },
  },
  {
    id: "w_p10",
    type: "wire",
    color: "orange",
    from: { dev: "mcu", pin: "P1.0" },
    to: { board: "bb", col: 3, row: "a" },
  },
  {
    id: "w_j1",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 6, row: "d" },
    to: { component: "r2", end: "p1" },
  },
  {
    id: "w_p11",
    type: "wire",
    color: "yellow",
    from: { dev: "mcu", pin: "P1.1" },
    to: { board: "bb", col: 11, row: "b" },
  },
  {
    id: "w_j2",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 11, row: "d" },
    to: { component: "r3", end: "p1" },
  },
  {
    id: "w_p12",
    type: "wire",
    color: "green",
    from: { dev: "mcu", pin: "P1.2" },
    to: { board: "bb", col: 16, row: "b" },
  },
  {
    id: "w_j3",
    type: "wire",
    color: "white",
    from: { board: "bb", col: 16, row: "d" },
    to: { component: "r4", end: "p1" },
  },
  {
    id: "w_p13",
    type: "wire",
    color: "blue",
    from: { dev: "mcu", pin: "P1.3" },
    to: { board: "bb", col: 21, row: "b" },
  },
];
