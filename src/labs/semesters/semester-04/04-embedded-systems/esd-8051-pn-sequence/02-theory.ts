import { type TheorySection } from "@/labs/lab-content.types";
import { leds8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A pseudo-random noise (PN) sequence looks random but repeats after a fixed length. A linear feedback shift register (LFSR) makes one: the register shifts left each step, and the new bit is the XOR of some chosen bits (the taps). With 8 bits and a maximal tap set, the sequence has 2^8 - 1 = 255 states before it repeats.",
    "This experiment uses the taps of x^8 + x^6 + x^5 + x^4 + 1, the bits 7, 5, 4 and 3 of the register. Each step computes the feedback bit with XOR, shifts the register left and inserts the feedback at bit 0. Starting from 0x01, the register never becomes 0, which would lock it.",
    "PN sequences are used for scrambling, testing and spreading signals. The four LEDs show the low nibble of the register, and the full byte is shown in the readings.",
  ],
  circuitDiagram: leds8051Diagrams[4],
};
