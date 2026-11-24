import { type ComponentInstance } from "@/labs/types";
import {
  SUPPLY_PARTS,
  SYS_8051_PARTS,
  pin,
  tie,
  rail,
  wire,
  resistor,
  capacitor,
} from "@/labs/semesters/semester-04/04-embedded-systems/chip-bench";

// AT89S52 (pin 1 in column 3) and ADC0804 (pin 1 in column 36) on the
// breadboard. DB0 to DB7 go to P1.0 to P1.7, RD to P3.7, WR to P3.6 and
// INTR to P3.2. A 10 kΩ / 10 kΩ divider puts 2.5 V on VIN+.

const ADC_PARTS: ComponentInstance[] = [
  {
    id: "u2",
    type: "dip-mcu",
    chip: "adc0804",
    mountedAt: { board: "bb", col: 36, row: "e" },
  },
];
const DIVIDER_PARTS: ComponentInstance[] = [
  resistor("r_top", 10000, 50, "h"),
  wire("w_div_v", "red", tie(50, "g"), rail("vcc_bot", 50)),
  resistor("r_bot", 10000, 53, "i"),
  wire("w_div_g", "black", tie(56, "g"), rail("gnd_bot", 56)),
  wire("w_vin", "yellow", tie(53, "g"), pin("u2", "VIN+")),
];
const ADC_POWER_PARTS: ComponentInstance[] = [
  wire("w_avcc", "red", pin("u2", "VCC"), rail("vcc_top", 36)),
  wire("w_cs", "black", pin("u2", "CS"), rail("gnd_bot", 36)),
  wire("w_vinm", "black", pin("u2", "VIN-"), rail("gnd_bot", 42)),
  wire("w_agnd", "black", pin("u2", "AGND"), rail("gnd_bot", 43)),
  wire("w_dgnd", "black", pin("u2", "DGND"), rail("gnd_bot", 45)),
  wire("w_clkr", "white", pin("u2", "CLKR"), tie(49, "c")),
  resistor("r_clk", 10000, 49, "b"),
  wire("w_clkin", "white", tie(52, "a"), pin("u2", "CLKIN")),
  capacitor("c_clk", 150e-6, 52, "c"),
  wire("w_cclk_g", "black", tie(53, "a"), rail("gnd_top", 53)),
];
const DATA_COLORS = [
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "white",
  "orange",
  "yellow",
] as const;
const BUS_PARTS: ComponentInstance[] = [
  wire("w_rd", "blue", pin("u2", "RD"), pin("u1", "P3.7")),
  wire("w_wr", "green", pin("u2", "WR"), pin("u1", "P3.6")),
  wire("w_intr", "purple", pin("u2", "INTR"), pin("u1", "P3.2")),
  ...DATA_COLORS.map((c, i) =>
    wire(`w_db${i}`, c, pin("u2", `DB${i}`), pin("u1", `P1.${i}`)),
  ),
];
export const ADC = ["u2"];
export const DIVIDER = ["r_top", "w_div_v", "r_bot", "w_div_g", "w_vin"];
export const ADC_POWER = ADC_POWER_PARTS.map((p) => p.id);
export const BUS = BUS_PARTS.map((p) => p.id);

export const components: ComponentInstance[] = [
  ...SUPPLY_PARTS,
  ...SYS_8051_PARTS,
  ...ADC_PARTS,
  ...DIVIDER_PARTS,
  ...ADC_POWER_PARTS,
  ...BUS_PARTS,
];
