import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 4:2 Priority Encoder has been implemented with two OR gates (74HC32), one inverter (74HC04) and one AND gate (74HC08). The observed binary outputs for all four input conditions match the theoretical encodings.",
    "The priority behaviour was confirmed: when multiple inputs are active simultaneously, the output correctly encodes the highest-priority (highest-numbered) active input. This is a fundamental requirement in interrupt controller design.",
    'Without the I1·I2′ term the circuit reduces to two OR gates, which is a valid basic encoder but gives a wrong code when I1 and I2 are active together. Adding a valid-output (V) signal using a third OR gate (V = I0+I1+I2+I3) would distinguish the "all-off" case from I0, making the encoder complete for practical applications.',
  ],
};
