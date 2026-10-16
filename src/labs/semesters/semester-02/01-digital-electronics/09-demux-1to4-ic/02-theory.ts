import { type TheorySection } from "@/labs/lab-content.types";
import { s2Demux1to4IcTheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/09-demux-1to4-ic";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A demultiplexer (DEMUX) is the inverse of a multiplexer: it takes a single input and routes it to one of several outputs based on select lines. A 1:4 DEMUX has one enable/data input, two select lines (A, B), and four outputs (Y0–Y3). Only the selected output reflects the input state; all other outputs remain in their inactive state.",
    "The 74HC139 is a dual 2-to-4 decoder/demultiplexer in a DIP-16 package. It contains two independent 1:4 DEMUX channels, each with an active-LOW enable input (EN_bar), two address/select inputs (A, B), and four active-LOW outputs (Y0–Y3). When EN_bar = LOW (enabled) and the address is AB, the selected output Yn goes LOW while all other outputs remain HIGH. When EN_bar = HIGH, all outputs are HIGH.",
    "The decoding logic for channel 1 is: Y0 = ¬(EN_bar' · A' · B'),  Y1 = ¬(EN_bar' · A · B'), Y2 = ¬(EN_bar' · A' · B),   Y3 = ¬(EN_bar' · A · B). The active-LOW outputs mean LEDs connected between output and GND illuminate when selected because the output sinks current to ground.",
    "When used as a pure decoder, the enable input acts as the data line and the address selects which output carries the data. When EN_bar is data (pulsed), the circuit distributes the signal to the output channel addressed by A, B. The 74HC139 is commonly used in memory address decoding and I/O port selection.",
  ],
  circuitDiagram: s2Demux1to4IcTheoryDiagram,
};
