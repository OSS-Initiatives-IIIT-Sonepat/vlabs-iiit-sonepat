import { type TheorySection } from "@/labs/lab-content.types";
import { subroutineAndIoTheoryDiagram } from "@/labs/schematics/semester-03/08-assembly-systems/subroutine-and-io";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "BSA SUB, with SUB at 108, stores the return address 101 at M[108] and jumps to 109. The body here is a single CMA. BUN indirect through 108 loads PC from M[108], which returns to 101.",
    "SKI skips the next instruction when the input flag FGI is 1. While FGI is 0, BUN SKI repeats the test. When the flag is set, INP copies INPR into AC and STA stores it.",
  ],
  circuitDiagram: subroutineAndIoTheoryDiagram,
};
