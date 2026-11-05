import { type TheorySection } from "@/labs/lab-content.types";
import { memoryDesignTheoryDiagram } from "@/labs/schematics/semester-03/02-memory-cpu-systems/memory-design";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: memoryDesignTheoryDiagram,
  paragraphs: [
    "Computer memory is a flat array of locations, each identified by a binary address. A real map is much wider than this board. A 256-byte space (addresses 0x00–0xFF) is often split into a ROM region and a RAM region. The breadboard builds one word of that idea: a 74HC138 turns the address into a word select, and a 74HC74 stores the data bit.",
    "ROM (Read-Only Memory) is programmed before use and is not written by the CPU. It typically stores boot firmware. RAM is writable and loses its data when power is removed. On this board the flip-flop is the RAM cell: D is the data bit, and a rising clock writes it.",
    "RAM (Random-Access Memory): Addresses 0x20–0xFF (224 bytes). RAM is writable — the CPU can read or write any location. Data is lost when power is removed (volatile).",
    "Address decoding: The memory controller uses the upper bits of the address to select the correct chip (ROM or RAM). A chip-select signal enables only one device at a time, preventing bus conflicts.",
    "Data bus: An 8-bit bidirectional data bus connects the CPU to memory. During a READ cycle, the memory drives the bus. During a WRITE cycle, the CPU drives the bus and the memory latches the data on the rising clock edge.",
  ],
};
