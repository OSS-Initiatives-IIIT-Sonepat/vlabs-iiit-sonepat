import { type TheorySection } from "@/labs/lab-content.types";
import { s2Encoder4to2TheoryDiagram } from "@/labs/schematics/semester-02/01-digital-electronics/11-encoder-4to2";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An encoder is a combinational circuit that converts 2ⁿ input lines to an n-bit binary code on its output lines. A 4:2 encoder accepts four mutually exclusive input lines (I0, I1, I2, I3) and produces a 2-bit binary output (A, B) representing which input is active. Only one input is assumed to be HIGH at any time in a basic encoder; a priority encoder handles simultaneous inputs by always encoding the highest-numbered active input.",
    "For a 4:2 priority encoder, the output equations are derived by giving I3 the highest priority and I0 the lowest: A (MSB) = I3 + I2 (the highest active input is 3 or 2). B (LSB) = I3 + I1·I2′ (the highest active input is 3, or it is 1 while 2 is off). The I2′ term is what makes it a priority encoder: without it, B = I1 + I3 would give 11 for I1 and I2 together, the code of an input that is not active. I0 contributes to neither output (I0 = binary 00).",
    'Gate-level implementation: two OR gates of one 74HC32 produce A and B, one inverter of a 74HC04 produces I2′ and one AND gate of a 74HC08 produces I1·I2′. A basic (non-priority) encoder needs only the two OR gates, but it is correct only when exactly one input is active. A valid output flag (V) can optionally be added: V = I0 + I1 + I2 + I3 (to distinguish "no input active" from "I0 active", since both give output 00).',
    "Encoders are used to reduce the number of wires carrying a set of one-hot signals (keyboard encoders convert 101+ key presses to a 7-bit ASCII code), in interrupt priority encoders (the processor's interrupt controller encodes which of many devices is requesting service), and in display driver circuits where BCD or binary encoding drives 7-segment displays.",
  ],
  circuitDiagram: s2Encoder4to2TheoryDiagram,
};
