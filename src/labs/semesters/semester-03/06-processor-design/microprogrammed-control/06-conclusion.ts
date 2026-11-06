import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "Microprogrammed control is a memory of control words. The counter is the address, and the ROM output is the microinstruction.",
    "Hardwired control computes those same signals with gates and a sequence counter.",
  ],
};
