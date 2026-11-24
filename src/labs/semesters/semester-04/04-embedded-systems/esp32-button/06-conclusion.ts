import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "INPUT_PULLUP on the ESP32 gives a steady HIGH at 3.3 V when the button is open, and LOW when it is pressed. Keep every input at 3.3 V or below.",
  ],
};
