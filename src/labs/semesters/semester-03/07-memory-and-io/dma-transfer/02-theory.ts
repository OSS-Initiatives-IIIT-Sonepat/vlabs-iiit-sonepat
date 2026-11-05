import { type TheorySection } from "@/labs/lab-content.types";
import { dmaTransferTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/dma-transfer";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The CPU releases the bus after a DMA request and a grant. The controller writes the words itself.",
    "The block is three words at address 200. Each transfer increments the address and decrements the count. At count 0 the controller returns the bus.",
  ],
  circuitDiagram: dmaTransferTheoryDiagram,
};
