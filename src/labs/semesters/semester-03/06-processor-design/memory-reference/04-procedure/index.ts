import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { memoryReferenceStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/memory-reference";

const headers = ["Instruction", "Timing", "Micro-operation"];
const rows = [
  ["AND", "D0T4", "DR ← M[AR]"],
  ["AND", "D0T5", "AC ← AC ∧ DR, SC ← 0"],
  ["ADD", "D1T4", "DR ← M[AR]"],
  ["ADD", "D1T5", "AC ← AC + DR, E ← Cout, SC ← 0"],
  ["LDA", "D2T4", "DR ← M[AR]"],
  ["LDA", "D2T5", "AC ← DR, SC ← 0"],
  ["STA", "D3T4", "M[AR] ← AC, SC ← 0"],
  ["BUN", "D4T4", "PC ← AR, SC ← 0"],
  ["BSA", "D5T4", "M[AR] ← PC, AR ← AR + 1"],
  ["BSA", "D5T5", "PC ← AR, SC ← 0"],
  ["ISZ", "D6T4", "DR ← M[AR]"],
  ["ISZ", "D6T5", "DR ← DR + 1"],
  ["ISZ", "D6T6", "M[AR] ← DR, if (DR = 0) then (PC ← PC + 1), SC ← 0"],
];

const copy = [
  [
    "The seven instructions",
    "Opcodes 000 through 110 refer to memory. Their decoder outputs are D0 through D6. AND, ADD, and LDA read an operand into the accumulator. STA writes the accumulator back to memory. BUN and BSA change the program counter. ISZ updates a memory word and can skip the next instruction. Fetch and decode are already finished, so AR holds the effective address and the first execute clock is T4. With I = 0 the hex codes are 0xxx, 1xxx, 2xxx, 3xxx, 4xxx, 5xxx, and 6xxx.",
    0,
  ],
  [
    "AND to AC",
    "AND combines AC with the memory word at the effective address, bit by bit. At D0T4 the word is read into DR. At D0T5 each bit of AC is ANDed with the same bit of DR, the result is written back into AC, and SC is cleared. A bit of the result is 1 only when that bit was 1 in both AC and the operand. The memory word is left unchanged.",
    2,
  ],
  [
    "ADD to AC",
    "ADD adds the same memory word to AC. D1T4 again reads M[AR] into DR. D1T5 adds DR to AC and writes the sum into AC. The carry out of bit 15 is stored in E, the extended-accumulator flip-flop. SC is cleared on that clock. E is the bit a later rotate or a later test of carry can use.",
    4,
  ],
  [
    "LDA: load to AC",
    "LDA replaces AC with the memory word. D2T4 reads M[AR] into DR. D2T5 copies DR into AC and clears SC. Nothing is added and nothing is masked. After LDA, AC and the memory word hold the same value, and the memory word is still there.",
    6,
  ],
  [
    "STA: store AC",
    "STA is the write that matches LDA. The value to be stored is already in AC, so there is no read and no T5. At D3T4 the memory word addressed by AR is replaced by AC, and SC is cleared. AC is not changed. A later LDA from that same address will bring this value back.",
    7,
  ],
  [
    "BUN: branch unconditionally",
    "BUN sends the program to the effective address. At D4T4, PC ← AR and SC is cleared. No memory word is read or written. The next fetch uses the new PC, so the instruction at the effective address is the next one executed. The branch is unconditional: nothing in AC or E is tested.",
    8,
  ],
  [
    "BSA: save the return address",
    "BSA calls a subroutine. PC was incremented during the fetch, so it already holds the address of the instruction that follows the BSA. D5T4 writes that address into memory, M[AR] ← PC, and then increments AR so that AR points at the first instruction of the subroutine. D5T5 copies AR into PC and clears SC. Execution continues at the subroutine. The saved word is the way back.",
    10,
  ],
  [
    "The call at time T4",
    "The instruction at address 20 is BSA 135, with I = 0. The word at address 21 is the next instruction. At T4, PC is 21 and AR is 135. Location 135 is still empty. The subroutine itself begins at 136, and its last line is BUN 135 with the indirect bit set to 1. Nothing has been written yet. This is the memory the two micro-operations are about to change.",
    10,
  ],
  [
    "After the BSA",
    "D5T4 stores PC in M[135], so location 135 now holds 21, and AR becomes 136. D5T5 copies 136 into PC. The next fetch is the first instruction of the subroutine. The return line, 1 BUN 135, is an indirect branch. I = 1 means the control does not jump to address 135. It reads M[135], finds 21, and jumps there, which is the instruction that followed the call.",
    10,
  ],
  [
    "ISZ: increment and skip if zero",
    "ISZ adds one to the memory word at the effective address. The addition cannot happen inside the memory, so D6T4 reads the word into DR, D6T5 increments DR, and D6T6 stores DR back to M[AR]. On that same clock, if DR is now 0, PC is incremented once more, which skips the instruction that follows the ISZ. SC is cleared either way. A counter in memory can be stepped this way until it rolls over to zero and the program leaves the loop.",
    13,
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
