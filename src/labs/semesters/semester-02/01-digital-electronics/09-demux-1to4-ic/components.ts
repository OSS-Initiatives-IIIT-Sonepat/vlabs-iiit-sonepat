import { type ComponentInstance } from "@/labs/types";

import { board, ic, input, sinkLamp, tie } from "../_board";

/**
 * 1-to-4 demultiplexer / 2-to-4 decoder with the 74HC139 (first half).
 *
 * Outputs are active-LOW, so each LED is wired +5 V → 330 Ω → LED → Yn:
 * the selected output goes LOW, sinks the LED current and lights its LED.
 * Select: A (LSB, pin 2) from col 2, B (MSB, pin 3) from col 4.
 * Enable 1G' (pin 1) tied to GND.
 */
export const components: ComponentInstance[] = [
  ...board(),

  ...ic("demux14", "demux-1to4", 8),
  tie("w_en_gnd", { ic: "demux14", pin: "en_bar" }, "gnd", 8),

  input("w_a_demux14", 2, "a", { ic: "demux14", pin: "a" }, "red"),
  input("w_b_demux14", 4, "a", { ic: "demux14", pin: "b" }, "orange"),

  ...sinkLamp(
    "y0",
    { ic: "demux14", pin: "y0" },
    18,
    "red",
    "w_y0_vcc",
    "w_y0_led",
  ),
  ...sinkLamp(
    "y1",
    { ic: "demux14", pin: "y1" },
    23,
    "yellow",
    "w_y1_vcc",
    "w_y1_led",
  ),
  ...sinkLamp(
    "y2",
    { ic: "demux14", pin: "y2" },
    28,
    "green",
    "w_y2_vcc",
    "w_y2_led",
  ),
  ...sinkLamp(
    "y3",
    { ic: "demux14", pin: "y3" },
    33,
    "blue",
    "w_y3_vcc",
    "w_y3_led",
  ),
];
