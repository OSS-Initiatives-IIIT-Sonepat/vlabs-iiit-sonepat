import { type TheorySection } from "@/labs/lab-content.types";
import { ioOrganisationTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/io-organisation";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Programmed I/O moves a word when the CPU executes an input instruction. An interrupt lets the device call the CPU instead. The flag on this port is that call.",
    "A rising strobe copies DIN to DOUT and sets the flag. The flag wire runs to the CPU's interrupt pin. The CPU then reads the port.",
    "Later frames are the rest of the unit, in order: a source strobe, both handshakes, a serial line that idles at 1, a daisy chain, DMA, and an I/O processor beside the CPU.",
  ],
  circuitDiagram: ioOrganisationTheoryDiagram,
};
