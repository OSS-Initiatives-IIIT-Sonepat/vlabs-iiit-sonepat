import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "With only CKA clocked, QA toggled on every falling edge and divided the clock by 2. With QA connected to CKB, the 74HC93 counted from 0000 to 1111 and rolled over to 0000 on the 16th pulse, which verifies MOD-16 ripple counting.",
    "With R0(1) = QB and R0(2) = QD, the counter reset as soon as it reached 1010 and counted 0 to 9 repeatedly: a decade counter. Because this reset is asynchronous, state 1010 appears briefly as a glitch, unlike the synchronous load of the 74HC161.",
  ],
};
