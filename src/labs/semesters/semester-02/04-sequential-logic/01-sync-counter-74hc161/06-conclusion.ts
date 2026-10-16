import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The 74HC161 counted up in binary from 0000 to 1111 on successive rising clock edges and then rolled over to 0000, which verifies MOD-16 operation. RCO went HIGH only at count 15, and taking CLR' LOW reset the outputs to 0000 at once, without a clock edge.",
    "With LD' driven by a NAND of Q3 and Q0 and the data inputs at 0000, the counter loaded 0000 on the clock edge after count 9, so it counted 0 to 9 and repeated: a MOD-10 (decade) counter. Because the load is synchronous, the unwanted state 1010 never appeared.",
  ],
};
