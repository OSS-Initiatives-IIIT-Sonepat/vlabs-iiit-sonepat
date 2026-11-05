import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { completeComputerStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/complete-computer";

const headers = ["Unit", "Connects to", "Holds"];
const rows = [
  ["Memory", "bus, when read or write", "4096 words of 16 bits"],
  ["Common bus", "every register", "one word, one driver"],
  ["AR", "memory address", "the address being used"],
  ["PC", "bus", "address of the next instruction"],
  ["DR", "bus", "the data word just moved"],
  ["AC", "bus and the ALU", "the accumulator"],
  ["IR", "control", "the instruction"],
  ["INPR", "bus", "the input character"],
  ["OUTR", "bus", "the output character"],
  ["Control", "every enable", "the active time T"],
  ["Read", "memory drives the bus", "DR ← M[AR]"],
];

const copy = [
  ["Memory", "The computer's memory is 4096 words of 16 bits. Program and data share it.", 1],
  ["The common bus", "AR, PC, DR, AC, IR, INPR, OUTR, and memory all meet one bus. A three-state enable chooses the single driver.", 2],
  ["The five processor registers", "AR holds the memory address. PC holds the next instruction address. DR holds data. AC is the accumulator. IR holds the current instruction.", 7],
  ["The I/O registers", "INPR takes a character from the input device. OUTR holds a character for the output device. Both use the same bus.", 9],
  ["Control", "The control unit is the sequence counter and the decoder. It raises one enable for the current T.", 10],
  ["One read, on this diagram", "Control sets read. Memory drives the bus. DR takes M[AR]. That is the whole computer working as one system.", 11],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
