import { type TheorySection } from "@/labs/lab-content.types";
import { cacheAssociativeTheoryDiagram } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cache-associative";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: cacheAssociativeTheoryDiagram,
  paragraphs: [
    "In a fully-associative cache, any main-memory block can be placed in any cache line. There is no index field — the entire address (except the block offset) forms the tag. This eliminates conflict misses entirely.",
    "A small fully-associative cache might use an 8-bit address, 4 lines, and 4-byte blocks. The offset is bits 1–0 and the tag is bits 7–2, with no index. The breadboard is the compare for one line whose stored tag is 10: two XOR gates and a NOR. The LED lights only when both tag bits match.",
    "On a cache miss, a new block must be loaded. If all lines are occupied, one must be evicted. The Least Recently Used (LRU) replacement policy evicts the block that was accessed least recently. Each line maintains an LRU order counter (0 = most recently used, 3 = least recently used for eviction).",
    "LRU update rule: On every access (hit or miss), the accessed line becomes MRU (order=0). All other lines that were more recently used than the evicted/loaded line have their order incremented by 1.",
    "Comparison with direct-mapped: Fully-associative has no conflict misses (any block fits anywhere) but requires searching all lines in parallel on every access — expensive in hardware. A 4-way set-associative cache is a practical compromise used in modern CPUs.",
    "Capacity misses occur when the working set exceeds the total cache capacity. Even a fully-associative cache cannot avoid these.",
  ],
};
