import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 8051 ran the blink program once it had its minimal system: 5 V on VCC with EA tied HIGH, a crystal clock and a power-on reset. Its ports drive outputs best by sinking current, so LEDs are wired from +5 V into the pin. The 8051 experiments that follow all start from this circuit.",
  ],
};
