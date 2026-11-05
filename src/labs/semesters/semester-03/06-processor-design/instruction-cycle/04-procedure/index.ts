import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { instructionCycleStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-cycle";

const headers = ["Time", "Condition", "Micro-operation"];
const rows = [
  ["T0", "every instruction", "AR ← PC"],
  ["T1", "every instruction", "IR ← M[AR], PC ← PC + 1"],
  ["T2", "every instruction", "Decode IR(12-14), AR ← IR(0-11), I ← IR(15)"],
  ["T3", "D7 = 1, I = 0", "Execute register-reference, SC ← 0"],
  ["T3", "D7 = 1, I = 1", "Execute input-output, SC ← 0"],
  ["T3", "D7 = 0, I = 0", "Nothing"],
  ["T4", "D7 = 0", "Execute memory-reference, SC ← 0"],
  ["T3", "D7 = 0, I = 1", "AR ← M[AR]"],
];

const copy = [
  [
    "The instruction cycle",
    "A program is a sequence of instructions in memory. Each instruction cycle has four phases: fetch the instruction, decode it, read the effective address when the address is indirect, and execute it. The control then returns to fetch the next instruction. It keeps doing this until a HLT instruction is executed. Clearing SC to 0 is how a cycle begins, and how every finished instruction hands the machine back to T0.",
    0,
  ],
  [
    "T0: AR ← PC",
    "PC holds the address of the next instruction. At T0 that address is copied into AR. Memory is read and written through AR, so this micro-operation is what selects the word that will be fetched. Nothing in the instruction has been examined yet. T0 is the same for every instruction in the program.",
    1,
  ],
  [
    "T1: IR ← M[AR], PC ← PC + 1",
    "The memory word addressed by AR is loaded into IR. That word is the instruction code. In the same clock, PC is incremented by one, so it now holds the address of the following instruction. The instruction just fetched stays in IR for the rest of this cycle. A later branch may overwrite PC, but a normal instruction leaves it pointing ahead.",
    2,
  ],
  [
    "T2: decode",
    "The opcode is the three bits IR(12), IR(13), and IR(14). A 3-to-8 decoder turns them into one signal among D0 through D7. The twelve address bits IR(0-11) are copied into AR, replacing the address that was used for the fetch. The mode bit IR(15) is copied into the flip-flop I. After T2 the control knows the operation, the address, and whether that address is direct or indirect.",
    3,
  ],
  [
    "D7 decides the type",
    "D7 is 1 only when the opcode is 111. That instruction does not refer to a memory operand. It is either a register-reference instruction or an input-output instruction, and I chooses which. D7 = 0 means the opcode is 000 through 110: AND, ADD, LDA, STA, BUN, BSA, or ISZ. Those seven are the memory-reference instructions. The diamond in the flowchart is this test.",
    3,
  ],
  [
    "Register reference and input-output",
    "Take the D7 = 1 branch. The second diamond tests I. I = 0 is a register-reference instruction. CLA, CLE, CMA, CME, CIR, CIL, INC, and the skips SPA, SNA, SZA, SZE, and HLT all operate on AC, E, or the control, and they execute at T3. I = 1 is an input-output instruction. INP, OUT, SKI, SKO, ION, and IOF also execute at T3. Both paths end with SC ← 0. There is no T4, because no memory operand is required. HLT is the register instruction that stops the computer from starting another cycle.",
    5,
  ],
  [
    "Direct memory reference",
    "Take the D7 = 0 branch, the memory-reference side. I = 0 means the address copied into AR at T2 is already the effective address of the operand. T3 therefore does nothing. At T4 the memory-reference instruction executes: the operand is read or written at M[AR], or PC is replaced, depending on the opcode. SC is cleared, so the next timing signal is T0 and the next instruction is fetched.",
    7,
  ],
  [
    "Indirect memory reference",
    "I = 1 on a memory-reference instruction means the word at M[AR] is not the operand. It is the address of the operand. T3 performs AR ← M[AR], which replaces the pointer with the effective address. T4 then executes the same memory-reference operation as in the direct case, and SC is cleared. Direct and indirect meet at that one execute box. After every instruction except HLT, the next clock produces T0.",
    8,
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
