import { type SchematicElement } from "@/labs/CircuitSchematic";
import { block, frames, label } from "../diagram";

const W = 1080;

const NAMES = [
  ["000", "AND", "0xxx", "AND to AC"],
  ["001", "ADD", "1xxx", "ADD to AC"],
  ["010", "LDA", "2xxx", "Load to AC"],
  ["011", "STA", "3xxx", "Store AC"],
  ["100", "BUN", "4xxx", "Branch unconditionally"],
  ["101", "BSA", "5xxx", "Branch and save return address"],
  ["110", "ISZ", "6xxx", "Increment and skip if zero"],
] as const;

/** The seven opcodes, before any one of them is opened. */
function roster(): SchematicElement[] {
  const head = [
    label("h_op", 150, 62, "Opcode"),
    label("h_name", 250, 62, "Name"),
    label("h_hex", 360, 62, "I = 0"),
    label("h_what", 620, 62, "What it does"),
  ];
  const rows = NAMES.flatMap(([op, name, hex, what], i) => {
    const y = 104 + i * 42;
    return [
      block(`op_${op}`, 150, y, 70, 34, op),
      block(`nm_${op}`, 250, y, 90, 34, name),
      block(`hx_${op}`, 360, y, 80, 34, hex),
      block(`wh_${op}`, 620, y, 360, 34, what),
    ];
  });
  return [...head, ...rows];
}

/** One instruction: its name, then the micro-operations in order. */
function micro(
  title: string,
  lines: string[],
  hot: string[],
): SchematicElement[] {
  const els: SchematicElement[] = [
    block("who", 540, 96, 320, 48, title, hot.includes("who")),
  ];
  lines.forEach((text, i) => {
    els.push(
      block(`op${i}`, 540, 180 + i * 58, 680, 44, text, hot.includes(`op${i}`)),
    );
  });
  return els;
}

const CW = 68;
const CH = 32;
const SPAN = CW * 3;

function triple(
  id: string,
  cx: number,
  y: number,
  texts: [string, string, string],
  hot = false,
) {
  const left = cx - SPAN / 2;
  return texts.map((text, i) =>
    block(`${id}_${i}`, left + CW / 2 + i * CW, y, CW, CH, text, hot),
  );
}

function wide(
  id: string,
  cx: number,
  y: number,
  h: number,
  text: string,
  hot = false,
) {
  return block(id, cx, y, SPAN, h, text, hot);
}

/** Address or register name, sitting just to the left of the memory word. */
function beside(
  id: string,
  cx: number,
  y: number,
  text: string,
  color?: string,
): SchematicElement {
  const half = (text.length * 9 * 0.56) / 2;
  const x = cx - SPAN / 2 - half - 12;
  return { type: "label", id, x, y, text, color };
}

/**
 * Slide: BSA 135 at address 20. At T4, PC is 21 and AR is 135.
 * After the instruction, M[135] holds 21 and PC is 136.
 */
function bsaMemory(after: boolean): SchematicElement[] {
  const L = 340;
  const R = 760;
  const instY = 88;
  const nextY = 120;
  const saveY = 168;
  const subY = 258;
  const subH = 108;
  const bunY = subY + subH / 2 + CH / 2;
  const els: SchematicElement[] = [];

  const column = (cx: number, side: "before" | "after") => {
    const tag = side;
    els.push(
      ...triple(`${tag}_ins`, cx, instY, ["0", "BSA", "135"]),
      wide(`${tag}_next`, cx, nextY, CH, "Next Instruction"),
      wide(`${tag}_sub`, cx, subY, subH, "Subroutine"),
      ...triple(`${tag}_bun`, cx, bunY, ["1", "BUN", "135"]),
    );
    if (side === "before") {
      els.push(
        beside(`${tag}_a20`, cx, instY, "20"),
        beside(`${tag}_pc`, cx, nextY, "PC = 21"),
        beside(`${tag}_ar`, cx, saveY, "AR = 135"),
        beside(`${tag}_a136`, cx, subY - subH / 2 + 8, "136"),
        label(`${tag}_cap`, cx, bunY + 46, "Memory, PC and AR at Time T4"),
      );
    } else {
      els.push(
        block(`${tag}_save`, cx, saveY, CW, CH, "21", true),
        beside(`${tag}_a20`, cx, instY, "20"),
        beside(`${tag}_a21`, cx, nextY, "21"),
        beside(`${tag}_a135`, cx, saveY, "135"),
        beside(`${tag}_pc`, cx, subY - subH / 2 + 8, "PC = 136", "#2563eb"),
        label(`${tag}_cap`, cx, bunY + 46, "Memory and PC after execution"),
      );
    }
  };

  column(L, "before");
  if (after) column(R, "after");
  return els;
}

const steps: {
  title: string;
  height: number;
  notes: string[];
  elements: SchematicElement[];
}[] = [
  {
    title: "Seven memory-reference instructions",
    height: 450,
    notes: ["Opcode 000 through 110. D7 stays 0, so execution begins at T4."],
    elements: roster(),
  },
  {
    title: "AND to AC",
    height: 340,
    notes: ["Each bit of AC is ANDed with the same bit of the operand."],
    elements: micro(
      "AND   opcode 000",
      ["D0T4:  DR ← M[AR]", "D0T5:  AC ← AC ∧ DR, SC ← 0"],
      ["op0", "op1"],
    ),
  },
  {
    title: "ADD to AC",
    height: 340,
    notes: ["The carry out of the sum is kept in E."],
    elements: micro(
      "ADD   opcode 001",
      ["D1T4:  DR ← M[AR]", "D1T5:  AC ← AC + DR, E ← Cout, SC ← 0"],
      ["op0", "op1"],
    ),
  },
  {
    title: "LDA: load to AC",
    height: 340,
    notes: ["AC is replaced. The memory word is not changed."],
    elements: micro(
      "LDA   opcode 010",
      ["D2T4:  DR ← M[AR]", "D2T5:  AC ← DR, SC ← 0"],
      ["op0", "op1"],
    ),
  },
  {
    title: "STA: store AC",
    height: 280,
    notes: ["One clock. AC itself is left as it was."],
    elements: micro("STA   opcode 011", ["D3T4:  M[AR] ← AC, SC ← 0"], ["op0"]),
  },
  {
    title: "BUN: branch unconditionally",
    height: 280,
    notes: ["The next fetch is taken from the effective address."],
    elements: micro("BUN   opcode 100", ["D4T4:  PC ← AR, SC ← 0"], ["op0"]),
  },
  {
    title: "BSA: branch and save return address",
    height: 340,
    notes: ["PC already holds the address of the instruction after the BSA."],
    elements: micro(
      "BSA   opcode 101",
      ["D5T4:  M[AR] ← PC, AR ← AR + 1", "D5T5:  PC ← AR, SC ← 0"],
      ["op0", "op1"],
    ),
  },
  {
    title: "BSA at time T4",
    height: 450,
    notes: ["BSA 135 is at address 20. The subroutine begins at 136."],
    elements: bsaMemory(false),
  },
  {
    title: "Memory after BSA",
    height: 450,
    notes: [
      "Location 135 now holds 21. The 1 on BUN 135 makes the return indirect.",
    ],
    elements: bsaMemory(true),
  },
  {
    title: "ISZ: increment and skip if zero",
    height: 400,
    notes: [
      "A memory word cannot be incremented in place, so it travels through DR.",
    ],
    elements: micro(
      "ISZ   opcode 110",
      [
        "D6T4:  DR ← M[AR]",
        "D6T5:  DR ← DR + 1",
        "D6T6:  M[AR] ← DR, if (DR = 0) then (PC ← PC + 1), SC ← 0",
      ],
      ["op0", "op1", "op2"],
    ),
  },
];

export const memoryReferenceStepSchematics = frames(
  steps.map((step) => ({
    title: step.title,
    width: W,
    height: step.height,
    notes: step.notes,
    elements: step.elements,
  })),
);

export const memoryReferenceTheoryDiagram = memoryReferenceStepSchematics[8];
