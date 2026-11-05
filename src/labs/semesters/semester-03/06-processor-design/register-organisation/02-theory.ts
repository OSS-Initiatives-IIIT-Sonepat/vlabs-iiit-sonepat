import { type TheorySection } from "@/labs/lab-content.types";
import { registerOrganisationTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/register-organisation";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A general register file puts an ALU between two multiplexers. This board is the read side of that idea: two D flip-flops and one multiplexer. The select bit chooses which register drives the lamp.",
    "A memory stack keeps the top at the address in the stack pointer. The diagram shows address 0 holding 0101, the word that was pushed, and address 1 holding 0011.",
    "Immediate addressing carries the operand in the instruction. Register addressing names a register. Indexed addressing adds an index register to the address. Direct and indirect addressing are in the basic-computer lab.",
  ],
  circuitDiagram: registerOrganisationTheoryDiagram,
};
