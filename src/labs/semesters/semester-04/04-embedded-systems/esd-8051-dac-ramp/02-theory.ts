import { type TheorySection } from "@/labs/lab-content.types";
import { dac8051Diagrams } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A digital-to-analog converter (DAC) turns a binary code into a voltage. The R-2R ladder does this with only two resistor values, R and 2R. Each bit line drives a weight that is a power of two, so the output is Vout = Vref x (8 b3 + 4 b2 + 2 b1 + b0) / 16 for a 4-bit code.",
    "With Vref = 5 V each code step is 5 / 16 = 0.3125 V. Code 0 gives 0 V and code 15 gives 4.69 V. Writing the codes 0 to 15 in order makes a staircase, which is a ramp. Each step is held for a fixed time set by the delay.",
    "The 8051 writes the code to P1. Only the low four bits matter here, so the program masks the count with 0x0F.",
    "One caution: an 8051 pin drives a 0 hard, but its 1 is only a weak internal pull-up, so under the ladder's load the HIGH level sags below 5 V. For accurate steps, buffer the four bit lines with a 74HC244 (or add 4.7 kohm pull-ups on them). The voltages here assume clean 0 V and 5 V levels.",
  ],
  circuitDiagram: dac8051Diagrams[5],
};
