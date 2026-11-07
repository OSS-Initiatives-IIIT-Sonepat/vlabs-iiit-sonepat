import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A microprocessor is a processor on one chip, built so a computer no longer needed a cabinet of boards and several supply voltages. The 8085 is that idea in a 40-pin package: one +5 V rail, an on-chip clock, and a bus small enough to fit because eight pins take turns as address and data.",
    "The pins form one machine cycle rather than forty separate parts. Power gives the voltages a meaning, the clock decides when they count, reset chooses address 0000H, the address pins and ALE name a location, IO/M and the status pins say what the cycle is, RD or WR moves the byte, and READY may stretch the cycle. Interrupts and HOLD are other devices asking to break in, and each of them has an answer pin.",
    "A microcontroller puts memory and ports on the same chip, so it can spare pins for those ports. The 8085 cannot. Its pins are the whole path to the memory and the devices outside it. An IN, OUT, LDA, or STA in a later assembly program is these pins changing, in this order.",
  ],
};
