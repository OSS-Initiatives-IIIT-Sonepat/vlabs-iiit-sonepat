import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { instructionSetStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-set";

const headers = ["Class", "Instruction", "Code"];
const rows = [
  ["Format", "I, opcode, address", "16 bits"],
  ["Memory reference", "ADD", "001"],
  ["Memory reference", "LDA / STA", "010 / 011"],
  ["Memory reference", "BUN / BSA / ISZ", "100 / 101 / 110"],
  ["Register reference", "CLA / CMA", "7800 / 7200"],
  ["I/O", "INP / OUT / SKI", "F800 / F400 / F200"],
];

const copy = [
  ["Read the fields", "Every instruction is bit I, a 3-bit opcode, and 12 address bits. The opcode decides the class.", 1],
  ["Opcodes 000 to 011 name memory", "AND is 000, ADD is 001, LDA is 010, STA is 011. The address field is a memory address.", 3],
  ["Opcodes 100 to 110 still name memory", "BUN branches, BSA calls a subroutine, ISZ increments a memory word and skips if it became zero.", 4],
  ["Opcode 111 and I = 0 is a register instruction", "The address bits are flags. CLA clears AC (7800). CMA complements AC (7200). There is no memory operand.", 5],
  ["Opcode 111 and I = 1 is input or output", "INP reads INPR (F800), OUT writes OUTR (F400), SKI skips if the input flag is set (F200).", 6],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
