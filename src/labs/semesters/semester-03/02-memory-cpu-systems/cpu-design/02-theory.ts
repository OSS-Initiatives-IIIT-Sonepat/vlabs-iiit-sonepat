import { type TheorySection } from "@/labs/lab-content.types";
import { cpuDesignTheoryDiagram } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cpu-design";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram: cpuDesignTheoryDiagram,
  paragraphs: [
    "The Central Processing Unit (CPU) operates by repeatedly performing a three-stage cycle: Fetch, Decode, and Execute. This is the fundamental operational loop of every stored-program computer.",
    "Fetch: The CPU reads the instruction at the address stored in the Program Counter (PC). The instruction is loaded into the Instruction Register (IR), and the PC is incremented to point to the next instruction.",
    "Decode: The control unit interprets the opcode (operation code) stored in the IR. It identifies the instruction type, the source and destination operands, and generates control signals for the datapath.",
    "Execute: The operation is performed. For arithmetic instructions, the ALU computes the result. For LOAD/STORE instructions, data is transferred between registers and memory. For JUMP instructions, the PC is updated to a new address.",
    "Datapath components: The Register File holds 4 general-purpose registers (R0–R3), each 8 bits wide. The ALU performs arithmetic and logic. The Memory unit provides 256 addressable byte locations. The PC, IR, and control logic complete the datapath.",
    "A minimal instruction set is LOAD immediate, LOAD from memory, ADD, STORE, JUMP, and HALT. The breadboard is only the fetch counter: a 74HC161 is the program counter and a 74HC138 turns the count into an instruction select. Clock once and the lamp moves from instruction 0 to instruction 1.",
  ],
};
