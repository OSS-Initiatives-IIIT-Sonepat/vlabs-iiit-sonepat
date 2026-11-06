import { type TheorySection } from "@/labs/lab-content.types";
import { ioProcessorTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/io-processor";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "The CPU writes a command, here a block write, and continues. The IOP fetches the channel program from memory and performs the transfer.",
    "When the block is finished the IOP stores a status word and interrupts the CPU. The CPU then reads the status.",
  ],
  circuitDiagram: ioProcessorTheoryDiagram,
};
