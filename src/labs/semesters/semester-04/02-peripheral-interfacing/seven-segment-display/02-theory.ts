import { type TheorySection } from "@/labs/lab-content.types";
import { sevenSegmentTheoryDiagram } from "@/labs/schematics/semester-04/02-peripheral-interfacing/interface-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A seven-segment display (SSD) consists of seven LED segments (labelled a–g) arranged in the shape of a figure-8, plus an optional decimal point (dp). By selectively illuminating subsets of these segments, digits 0–9 (and some letters) can be displayed. Two types exist: common-cathode (CC) — all cathodes share a common GND, segments are enabled by driving the anode HIGH — and common-anode (CA) — all anodes share Vcc, segments are enabled by driving the cathode LOW (active LOW).",
    "A Binary-Coded Decimal (BCD) to 7-segment decoder such as the 74HC4511 (CC driver) or 74HC4543 accepts a 4-bit BCD input (D, C, B, A where A is LSB) and automatically drives the correct segment lines to display the corresponding decimal digit (0–9). For inputs 10–15 (invalid BCD), most decoders either blank the display or show undefined segments. The 74HC4511 also provides latch, blanking (BL'), and lamp test (LT') inputs.",
    "If a BCD decoder IC is unavailable, a 2:4 decoder (74HC139) can drive a limited subset of display patterns. However, for full 0–9 display, a 7-segment decoder is the appropriate component. Each segment requires a 330 Ω current-limiting resistor (at 5 V, I_seg = (5−2)/330 ≈ 9 mA), and the decoder IC must be capable of sinking or sourcing the combined segment current.",
    "In this experiment, a common-cathode 7-segment display is driven by a 74HC4511 BCD-to-7-segment decoder. Four input switches (D, C, B, A) set the BCD digit value. The decoded segment outputs illuminate the correct segments through 330 Ω resistors. All ten digits 0–9 are verified. The decoder circuit demonstrates the practical application of decoders in human-readable digital output interfaces.",
    "The figure is that decoder: BCD switches into a 74HC4511, then a 330 Ω resistor on every segment. The board wires the seven segment LEDs themselves. With every cathode grounded they all light, which is the shape of the digit 8. Blanking and the latch are pins on the decoder in the figure.",
  ],
  circuitDiagram: sevenSegmentTheoryDiagram,
};
