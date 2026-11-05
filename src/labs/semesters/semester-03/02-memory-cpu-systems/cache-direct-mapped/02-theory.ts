import { type TheorySection } from "@/labs/lab-content.types";
import { cacheDirectTheoryDiagram } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cache-direct-mapped";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: cacheDirectTheoryDiagram,
  paragraphs: [
    "Cache memory is a small, fast SRAM placed between the CPU and main memory. It exploits the principle of locality: recently accessed data and nearby data are likely to be accessed again soon.",
    "In a direct-mapped cache, each main-memory block maps to exactly one cache line. This is determined by the address structure: the address is split into TAG, INDEX, and OFFSET fields.",
    "A small direct-mapped cache might use a 9-bit address, 8 lines, and 4-byte blocks: offset bits 1–0, index bits 4–2, and tag bits 8–5. The breadboard keeps one line. The index bit selects it through a 74HC138, and one tag bit is compared with an XOR. The hit LED needs both the line select and a tag match.",
    "Cache hit: The accessed address is found in cache — the valid bit is 1 AND the stored tag matches the address tag. Hit latency is ~1–4 CPU cycles.",
    "Cache miss: The block is not in cache. The CPU must fetch the entire 4-byte block from main memory (~100+ cycles). This is called a cold miss (first access) or conflict miss (two addresses compete for the same line).",
    "Conflict misses are the key weakness of direct-mapped caches. If two frequently used addresses map to the same index (same low bits), they will evict each other on every access, causing a thrashing pattern with 0% hit rate.",
  ],
};
