import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { instructionCodesStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-codes";

const headers = ["Item", "Example", "What it means"];
const rows = [
  ["Program", "a set of instructions", "operations, operands, and their sequence"],
  ["Computer instruction", "binary code", "read into the control register, then micro-operations"],
  ["Instruction code", "ADD 1547", "opcode ADD plus address 1547"],
  ["Basic computer format", "0001 0100 0101 0111", "I, opcode 001, address of ADD 457"],
  ["Memory", "4096 x 16", "instructions in one part, operands in the other"],
  ["Instruction format", "15-12 | 11-0", "opcode, then the address; AC is a processor register"],
  ["Direct", "22: 0 ADD 457", "I = 0, operand at 457 is added to AC"],
  ["Indirect", "35: 1 ADD 300", "I = 1, word 300 holds 1350, and that operand is added to AC"],
];

const copy = [
  ["Program", "A program is a set of instructions. Each instruction specifies the operation, the operands, and the sequence in which processing has to occur.", 1],
  ["Computer instruction", "A computer instruction is a binary code for a sequence of micro-operations. The computer reads each instruction from memory into a control register. The control interprets the code and issues the micro-operations.", 2],
  ["Instruction code", "An instruction code is a group of bits for one operation. ADD 1547 is the example. The word ADD is the operation code, and every opcode is assigned one unique binary code.", 3],
  ["Basic computer format", "In the basic computer, bit 15 is the mode I, bits 14 to 12 are the opcode, and bits 11 to 0 are the address. The lines drop from each field onto its bits. ADD 457 is the word 0001 0100 0101 0111.", 4],
  ["Stored program", "Memory is organized as 4096 words of 16 bits. The upper part stores the instructions, which are the program. The lower part stores the operands, which are the data.", 5],
  ["Instruction format", "Bits 15 to 12 are the opcode and bits 11 to 0 are the address. A data word uses all 16 bits as one binary operand. The accumulator, AC, is the processor register that receives that operand.", 6],
  ["Direct address", "The instruction at address 22 is 0 ADD 457. The mode bit I is 0, so this is a direct address. The address field 457 is the operand address. The operand found there is added to AC.", 7],
  ["Indirect address", "The instruction at address 35 is 1 ADD 300. The mode bit I is 1, so the address field is not the operand address. Word 300 holds 1350, and the operand at address 1350 is added to AC.", 8],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
