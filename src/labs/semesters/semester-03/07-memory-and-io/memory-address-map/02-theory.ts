import { type TheorySection } from "@/labs/lab-content.types";
import { memoryMapTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/memory-address-map";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A memory hierarchy runs from tape and disk, through main memory and cache, up to the registers. SRAM stores a bit in a latch. DRAM stores it on a capacitor and has to be refreshed.",
    "A map of four 1K×8 PROMs makes a 4K×8 memory. The high address bits choose which PROM is enabled. This board uses two ROMs and one select bit in place of that map.",
    "The decoder's Y outputs are active low, which is what an active-low chip-select wants. Only the enabled ROM may drive the shared data pins.",
  ],
  circuitDiagram: memoryMapTheoryDiagram,
};
