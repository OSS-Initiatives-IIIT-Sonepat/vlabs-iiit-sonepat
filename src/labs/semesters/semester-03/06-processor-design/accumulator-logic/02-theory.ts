import { type TheorySection } from "@/labs/lab-content.types";
import { accumulatorLogicTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/accumulator-logic";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The accumulator logic is whatever is needed to carry out the transfers that change AC. Nine of them do. Three are memory-reference instructions at $T_5$: AND does $AC \\leftarrow AC \\wedge DR$, ADD does $AC \\leftarrow AC + DR$, and the DR transfer of LDA does $AC \\leftarrow DR$. One is the input instruction, $pB_{11}$: $AC(0\\text{–}7) \\leftarrow INPR$. Four are register-reference: complement $rB_9$, shift right $rB_7$, shift left $rB_6$, and clear $rB_{11}$. The last is increment, $rB_5$: $AC \\leftarrow AC + 1$. A transfer that does not mention AC, such as STA or CLE, does not enter this circuit.",
    "The data path is short. DR supplies 16 bits to the adder and logic circuit, and INPR supplies 8. That circuit forms the AND, the sum, the shifted word, or the complement, and its 16-bit result is the input of AC. AC itself is a register with three control inputs besides the clock. LD loads the 16-bit result. INR adds one. CLR writes zero. The same 16 bits leave AC toward the common bus.",
    "Each control function that loads a new value is an AND of the signals that define it. $D_0 T_5$ is AND, $D_1 T_5$ is ADD, and $D_2 T_5$ is DR, so the three memory-reference loads share the wire $T_5$. $p B_{11}$ is INPR. $r B_9$ is CMA. The shift controls are the single bits $B_7$ and $B_6$, because $r$ is already the common condition of every register-reference instruction. Increment is $B_5$.",
    "LD must be 1 for any of those loads, so it is the OR of AND, ADD, DR, INPR, CMA, SHR, and SHL. Increment does not use LD. It drives INR directly, which is why the $B_5$ wire is tapped on its way past the OR. Clear does not use LD either. $B_{11}$, the bit for CLA, runs under the gates and up to CLR. The clock is the moment AC actually changes. LD, INR, or CLR only choose which change the clock performs.",
  ],
  circuitDiagram: accumulatorLogicTheoryDiagram,
};
