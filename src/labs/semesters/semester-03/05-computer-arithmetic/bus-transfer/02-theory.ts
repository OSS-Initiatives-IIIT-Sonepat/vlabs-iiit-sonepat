import { type TheorySection } from "@/labs/lab-content.types";
import { busTransferTheoryDiagram } from "@/labs/schematics/semester-03/05-computer-arithmetic/bus-transfer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A common bus does not run a private wire from every register to every other register. A multiplexer's select inputs choose which register drives the shared lines.",
    "R0 is loaded with 1 and R1 is loaded with 0. Select 0 puts R0 on the lamp. Select 1 puts R1 on the lamp.",
    "A logical shift fills the empty end with 0. A circular shift brings the lost bit back in. An arithmetic right shift copies the sign. A mantissa is normalised when its leading digit is not zero.",
  ],
  circuitDiagram: busTransferTheoryDiagram,
};
