import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "An ADC turns a voltage into a code the microcontroller can use. Software starts each conversion, waits for the done signal and reads the data bus. The same handshake applies to most parallel ADCs.",
  ],
};
