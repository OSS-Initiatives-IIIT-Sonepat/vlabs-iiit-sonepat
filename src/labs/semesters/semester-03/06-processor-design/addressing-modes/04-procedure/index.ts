import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { addressingModesStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/addressing-modes";

const headers = ["Mode", "Example", "Where the operand is"];
const rows = [
  ["Implied / immediate", "CMA, MOV R1, 05H", "AC, or the constant 05H"],
  ["Register", "MOV AX, BX", "CPU register BX"],
  ["Register indirect", "MOV [R1], R2", "memory at the address in R1"],
  ["Direct", "ADD 457", "memory word 457"],
  ["Relative, indexed, base", "EA = address + register", "PC, XR, or a base register"],
];

const copy = [
  ["Implied and immediate", "CMA is implied: the operand is the accumulator, and the instruction names no address. MOV R1, 05H is immediate: the operand is the constant 05H in the instruction.", 1],
  ["Register", "MOV AX, BX copies register BX into register AX. The operand is already in a CPU register.", 2],
  ["Register indirect", "MOV [R1], R2 writes R2 into the memory word whose address is in R1. Autoincrement and autodecrement use that address and then add or subtract 1 from the register.", 3],
  ["Direct", "ADD 457 adds the memory word at address 457. The address field itself is the effective address. Indirect addressing is the next step up: the memory word holds the effective address.", 4],
  ["Relative, indexed, and base", "Relative addressing adds the program counter. Indexed addressing adds an index register XR. Base addressing adds a base register. In each case EA = address field + register.", 5],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
