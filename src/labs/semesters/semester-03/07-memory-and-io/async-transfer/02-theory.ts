import { type TheorySection } from "@/labs/lab-content.types";
import { asyncTransferTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/async-transfer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A strobe is one pulse. The source places 0101 and raises the strobe. The destination reads on that pulse.",
    "A handshake uses two wires. The source raises data-valid. The destination raises acknowledge. Each side then drops its wire.",
  ],
  circuitDiagram: asyncTransferTheoryDiagram,
};
