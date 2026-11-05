import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { accumulatorLogicStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/accumulator-logic";

const headers = ["Control", "Condition", "What AC does"];
const rows = [
  ["AND", "D0 T5", "AC ← AC ∧ DR, SC ← 0"],
  ["ADD", "D1 T5", "AC ← AC + DR, SC ← 0"],
  ["DR", "D2 T5", "AC ← DR, SC ← 0"],
  ["INPR", "p B11", "AC(0-7) ← INPR, FGI ← 0"],
  ["CMA", "r B9", "AC ← AC'"],
  ["SHR", "r B7", "AC ← shr AC, AC(15) ← E"],
  ["SHL", "r B6", "AC ← shl AC, AC(0) ← E"],
  ["INC", "r B5", "AC ← AC + 1"],
  ["CLR", "r B11", "AC ← 0"],
  ["LD", "AND + ADD + DR + INPR + CMA + SHR + SHL", "Load the adder output"],
];

const copy = [
  [
    "The statements that change AC",
    "Designing the accumulator starts from the register transfers, not from a gate. Nine statements write a new value into AC. AND, ADD, and LDA's transfer from DR happen at T5. INP copies INPR into the low eight bits and clears FGI. CMA complements AC. CIR and CIL are the shift right and shift left, and each also moves the end bit through E. CLA clears AC. INC adds one. Any instruction that never writes AC is left out of this circuit.",
    0,
  ],
  [
    "Where the bits go",
    "DR contributes 16 bits and INPR contributes 8. Both enter the adder and logic circuit, which is the block that can AND, add, pass DR through, complement, or shift. Its 16-bit output is the data input of the accumulator register. AC sends 16 bits on toward the common bus. Under AC, the control gates supply four wires: LD, INR, CLR, and the clock. LD replaces the contents, INR counts up, CLR writes zero, and the clock is the edge on which the chosen change happens.",
    0,
  ],
  [
    "The three memory-reference loads",
    "D0 with T5 is the AND instruction, D1 with T5 is ADD, and D2 with T5 is the transfer from DR. Each pair meets in an AND gate. T5 is one vertical wire tapped by all three, because every one of these operations is timed by the same clock of the execute phase. The gate outputs are named AND, ADD, and DR. Any one of them must be able to load AC.",
    3,
  ],
  [
    "Input and complement",
    "The input instruction is not a memory reference, so it does not use T5. Its common condition is p, and B11 of the instruction selects INP. p AND B11 is the INPR control: it loads AC(0-7) from INPR. The complement is a register-reference instruction. Its common condition is r, and B9 selects CMA. r AND B9 is the CMA control. Both of these also have to reach LD, because each one writes a new word into AC.",
    5,
  ],
  [
    "Shift and increment",
    "Shift right is B7 and shift left is B6. On the basic computer those bits already include the register-reference condition, so each one is a single wire rather than a second AND. B5 is the increment. A shift loads the shifted word from the adder and logic circuit, so SHR and SHL belong with the signals that turn LD on. Increment is different. AC has its own INR input, and B5 drives that input. It does not have to go through LD.",
    8,
  ],
  [
    "One OR for LD",
    "LD is 1 when any load control is 1, so the OR gate collects AND, ADD, DR, INPR, CMA, SHR, and SHL. The B5 wire is tapped before the gate and taken up to INR, which is the increment input drawn on top of AC. B11 does not enter the OR at all. It runs underneath and up to CLR, because CLA only has to empty the register. The 16-bit result still arrives from the adder and logic circuit on the left of AC, and the 16-bit output still leaves toward the bus. Clock is the remaining input: it writes AC when LD, INR, or CLR has been selected.",
    10,
  ],
] as const;

export const procedureSteps: SceneProcedureStep[] = copy.map(([label, body, count], i) => ({
  label,
  body,
  show: [],
  schematic: fig[i],
  table: revealedTable(headers, rows, count),
}));
