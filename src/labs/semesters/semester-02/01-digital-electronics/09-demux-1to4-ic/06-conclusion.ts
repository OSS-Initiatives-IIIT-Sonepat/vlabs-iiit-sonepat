import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 1:4 demultiplexer was verified experimentally. For each select combination $S_1S_0$ only the addressed output of the 74HC139 followed the data input $D$ ($00 \\to Y_0$, $01 \\to Y_1$, $10 \\to Y_2$, $11 \\to Y_3$) while the other three outputs stayed HIGH, matching the theoretical truth table.",
  ],
};
