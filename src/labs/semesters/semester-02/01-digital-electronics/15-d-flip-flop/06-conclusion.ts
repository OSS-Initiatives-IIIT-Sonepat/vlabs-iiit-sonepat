import { type LabSection } from "@/labs/lab-content.types";

export const conclusion: LabSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 74HC74 D flip-flop was verified experimentally. The output $Q$ copied the data input $D$ only on the rising edge of the clock ($Q_{n+1} = D$), and it held its value when the clock was steady or falling, even when $D$ changed. This confirms that the flip-flop is edge-triggered and, unlike the S-R flip-flop, has no invalid state.",
  ],
};
