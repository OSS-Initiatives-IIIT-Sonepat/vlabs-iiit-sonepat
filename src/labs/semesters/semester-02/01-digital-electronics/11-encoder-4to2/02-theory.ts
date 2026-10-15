import { type TheorySection } from "@/labs/lab-content.types";
import { s2Encoder4to2TheoryDiagram } from "@/labs/schematics/s2-encoder-4to2-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "An encoder is a combinational circuit that converts 2ⁿ input lines to an n-bit binary code on its output lines. A 4:2 encoder accepts four mutually exclusive input lines (I0, I1, I2, I3) and produces a 2-bit binary output (A, B) representing which input is active. Only one input is assumed to be HIGH at any time in a basic encoder; a priority encoder handles simultaneous inputs by always encoding the highest-numbered active input.",
    "For a 4:2 priority encoder, the output equations are derived by giving I3 the highest priority and I0 the lowest: A (MSB) = I2 + I3 (A is HIGH when input 2 or 3 is active). B (LSB) = I1 + I3 (B is HIGH when input 1 or 3 is active). Note that I3 contributes to both A and B (I3 = binary 11), I2 contributes only to A (I2 = binary 10), I1 contributes only to B (I1 = binary 01), and I0 contributes to neither (I0 = binary 00).",
    'Gate-level implementation requires just two OR gates: one 74HC32 OR gate produces A = I2 + I3, and another produces B = I1 + I3. Total IC count: 1× 74HC32 (uses two of the four available OR gates). This is an extremely efficient implementation. A valid output flag (V) can optionally be added: V = I0 + I1 + I2 + I3 (to distinguish "no input active" from "I0 active", since both give output 00).',
    "Encoders are used to reduce the number of wires carrying a set of one-hot signals (keyboard encoders convert 101+ key presses to a 7-bit ASCII code), in interrupt priority encoders (the processor's interrupt controller encodes which of many devices is requesting service), and in display driver circuits where BCD or binary encoding drives 7-segment displays.",
  ],
  circuitDiagram: s2Encoder4to2TheoryDiagram,
};
