import { type TheorySection } from "@/labs/lab-content.types";
import { cacheVirtualTheoryDiagram } from "@/labs/schematics/semester-03/07-memory-and-io/cache-virtual";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
  "An associative cache compares the tag with every line. A hit is any line whose tag matches.",
  "A direct-mapped cache of this unit uses a 15-bit address into a memory of 32K words. The index selects the single line that is allowed to hold that address, and the tag must match that line.",
  "A set-associative cache uses the index to pick a set, then compares the tag with each way in the set. A page table maps a page number to a frame. One page in this walk is in a frame. The other is not, which is a page fault."
],
  circuitDiagram: cacheVirtualTheoryDiagram,
};
