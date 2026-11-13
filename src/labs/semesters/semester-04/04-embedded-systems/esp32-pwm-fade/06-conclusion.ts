import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "PWM turns a digital pin into an adjustable average voltage. The ESP32 LEDC peripheral makes it hardware-timed, so the sketch only sets the duty cycle.",
  ],
};
