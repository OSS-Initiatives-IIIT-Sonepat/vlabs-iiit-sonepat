import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The truth table of the 74HC138 was verified. With the chip enabled, each of the eight addresses from 000 to 111 drove exactly one output LOW, and the selected output number was 4A2 + 2A1 + A0. Taking E1 LOW disabled the decoder and all outputs went HIGH, whatever the address.",
    "Wiring the LEDs as current sinks made the active-LOW outputs easy to read, since only the selected output's LED lit. Each output of the decoder corresponds to one minterm of the address inputs.",
  ],
};
