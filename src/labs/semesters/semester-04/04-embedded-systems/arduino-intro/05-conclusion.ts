import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An Arduino runs one program in a loop. setup() prepares the pins once, and loop() does the work. Digital pins switch between 0 V and 5 V, analog pins measure voltage as a number from 0 to 1023, and PWM gives an average voltage in between. The next three experiments use these ideas: blinking an LED, reading a button, and reading a voltage.",
  ],
};
