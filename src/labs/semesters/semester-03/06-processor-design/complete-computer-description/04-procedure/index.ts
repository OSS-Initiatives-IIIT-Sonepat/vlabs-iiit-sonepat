import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { completeComputerDescriptionStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/complete-computer-description";

const headers = ["When", "Condition", "Transfer"];
const rows = [
  ["Start", "power on", "SC ← 0, IEN ← 0, R ← 0"],
  ["R'T0", "R = 0", "AR ← PC"],
  ["R'T1", "R = 0", "IR ← M[AR], PC ← PC + 1"],
  ["R'T2", "R = 0", "Decode IR(12-14), AR ← IR(0-11), I ← IR(15)"],
  ["RT0", "R = 1", "AR ← 0, TR ← PC"],
  ["RT1", "R = 1", "M[0] ← TR, PC ← 0"],
  ["RT2", "R = 1", "PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0"],
  ["Input-output", "D7 = 1, I = 1, T3", "Execute input-output, SC ← 0"],
  ["Register", "D7 = 1, I = 0, T3", "Execute register-reference, SC ← 0"],
  ["Indirect", "D7 = 0, I = 1, T3", "AR ← M[AR]"],
  ["Direct", "D7 = 0, I = 0, T3", "Nothing"],
  ["Memory", "T4", "Execute memory-reference, SC ← 0"],
];

const copy = [
  [
    "Start",
    "Before any instruction runs, the sequence counter, the interrupt enable, and the interrupt flip-flop are cleared. SC ← 0 makes T0 the first timing signal. IEN ← 0 keeps interrupts off until the program asks for them. R ← 0 selects an instruction cycle rather than an interrupt cycle. The rectangle around the chart is the path control will follow forever after this.",
    1,
  ],
  [
    "The test of R",
    "Every cycle begins by reading R. The left branch is labeled instruction cycle and is taken when R = 0. The right branch is the interrupt cycle, taken when R = 1. Nothing has been fetched yet. R only chooses which of the two columns runs.",
    1,
  ],
  [
    "Fetch and decode",
    "With R = 0 the three fetch clocks are R'T0, R'T1, and R'T2. R'T0 copies the address in PC into AR. R'T1 reads M[AR] into IR and increments PC, so PC now points at the next instruction. R'T2 splits the word in IR: bits 12 to 14 are decoded, bits 0 to 11 become the address in AR, and bit 15 is saved as I.",
    4,
  ],
  [
    "The interrupt column",
    "With R = 1 the same three clocks do a different job. RT0 clears AR and copies PC into TR, which holds the address the program was about to execute. RT1 writes TR into M[AR]. AR is 0, so the return address is stored at location 0, and PC is cleared. RT2 adds 1 to PC, then clears IEN, R, and SC. The next instruction cycle therefore begins at address 1, with interrupts disabled.",
    7,
  ],
  [
    "D7",
    "The fetch column and the interrupt column both arrive above D7. D7 is 1 only when the opcode is 111. That instruction is either register-reference or input-output. D7 = 0 is a memory-reference instruction. The interrupt cycle has already finished its own work by RT2; the common decision is where the chart draws the two columns back together.",
    7,
  ],
  [
    "Register and input-output",
    "On the D7 = 1 side, I is tested at T3. I = 1 means an input-output instruction, and it is executed immediately. I = 0 means a register-reference instruction, also executed at T3. Both boxes clear SC. There is no memory operand and no T4 for either of them.",
    9,
  ],
  [
    "Memory reference",
    "On the D7 = 0 side, I says whether the address in AR is already the operand address. I = 1 is indirect: T3 reads M[AR] back into AR, and that new value is the effective address. I = 0 is direct: T3 does nothing, because AR is already correct. The two arrows meet in the memory-reference box, which runs at T4 and then clears SC.",
    12,
  ],
  [
    "The return",
    "Input-output, register-reference, and memory-reference each send an arrow down onto the bottom of the rectangle. That border is the return to R. SC is already 0, so the next timing signal is T0 again, and R is tested once more. The chart does not draw a separate halt. A halt instruction clears the start-stop flip-flop during the register-reference box, and only then does the loop stop.",
    12,
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(
  ([label, body, count], i) => ({
    label,
    body,
    show: [],
    schematic: fig[i],
    table: revealedTable(headers, rows, count),
  }),
);
