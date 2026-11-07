import { type SchematicData } from "@/labs/CircuitSchematic";

import {
  flow,
  type FlowLink,
  type FlowNode,
} from "@/labs/schematics/semester-03/diagram";

/** A vertical flowchart. The first and last boxes are the start and the halt. */
function algorithm(title: string, steps: string[]): SchematicData {
  const nodes: FlowNode[] = steps.map((label, i) => ({
    id: `s${i}`,
    kind: i === 0 || i === steps.length - 1 ? "terminal" : "block",
    x: 340,
    y: 78 + i * 68,
    w: 300,
    h: 40,
    label,
  }));
  const links: FlowLink[] = steps.slice(1).map((_, i) => ({
    id: `a${i}`,
    from: `s${i}`,
    to: `s${i + 1}`,
  }));
  const drawn = flow(nodes, links, [
    {
      title,
      show: nodes.map((node) => node.id),
      height: 100 + steps.length * 68,
    },
  ])[0];
  return { ...drawn, gallery: true };
}

export const addSub8bitTheoryDiagram = algorithm("Add, then subtract", [
  "Start at 8100H",
  "A ← (8000H), B ← A",
  "A ← (8001H)",
  "A ← A + B",
  "(8002H) ← sum",
  "A ← NUM1 − NUM2",
  "(8003H) ← difference",
  "Halt",
]);

export const addSubCarryTheoryDiagram = algorithm("16-bit add and subtract", [
  "Start at 8100H",
  "Add the low bytes",
  "ADC adds the high bytes and CY",
  "Store the 16-bit sum",
  "Subtract low, then SBB high",
  "Store the 16-bit difference",
  "Halt",
]);

export const bcdAdditionTheoryDiagram = algorithm("Packed BCD add", [
  "Start at 8100H",
  "A ← first BCD byte",
  "A ← A + second BCD byte",
  "DAA corrects the nibbles",
  "(8002H) ← decimal sum",
  "Halt",
]);

export const multiply8bitTheoryDiagram = algorithm("Multiply by adding", [
  "Start at 8100H",
  "HL ← 0, C ← multiplier",
  "HL ← HL + multiplicand",
  "C ← C − 1",
  "Repeat while C ≠ 0",
  "(8002H) ← 16-bit product",
  "Halt",
]);

export const divide8bitTheoryDiagram = algorithm("Divide by subtracting", [
  "Start at 8100H",
  "Stop if the divisor is 0",
  "While A ≥ divisor",
  "A ← A − divisor, quotient + 1",
  "(8003H) ← remainder",
  "(8002H) ← quotient",
  "Halt",
]);

export const arraySumTheoryDiagram = algorithm("Sum a counted array", [
  "Start at 8100H",
  "C ← count, HL → first byte",
  "E ← E + (HL)",
  "HL ← HL + 1, C ← C − 1",
  "Repeat while C ≠ 0",
  "(8010H) ← sum",
  "Halt",
]);

export const arraySquareTheoryDiagram = algorithm("Square each element", [
  "Start at 8100H",
  "C ← count, HL → element",
  "DE → output at 8020H",
  "Call SQUARE, HL ← n × n",
  "Store the low byte, then the high",
  "Next element, while C ≠ 0",
  "Halt",
]);

export const minMaxTheoryDiagram = algorithm("Minimum and maximum", [
  "Start at 8100H",
  "C and D ← first element",
  "A ← next element",
  "If A < C, C ← A",
  "If A > D, D ← A",
  "(8010H) ← min, (8011H) ← max",
  "Halt",
]);

export const bubbleSortTheoryDiagram = algorithm("Bubble sort", [
  "Start at 8100H",
  "Pass count ← n − 1",
  "Compare neighbours",
  "Swap if the left one is larger",
  "Finish the pass",
  "Another pass, unless none swapped",
  "Halt, array sorted in place",
]);

export const bcdBinaryTheoryDiagram = algorithm("BCD and binary", [
  "Start at 8100H",
  "Tens digit × 10",
  "Add the units digit",
  "(8001H) ← binary",
  "Count how many 10s fit",
  "Pack tens and units",
  "(8003H) ← BCD, halt",
]);

export const sqrtTheoryDiagram = algorithm("Square root by odd numbers", [
  "Start at 8100H",
  "A ← N, odd ← 1, count ← 0",
  "Stop when A < odd",
  "A ← A − odd, count ← count + 1",
  "odd ← odd + 2",
  "(8001H) ← count",
  "Halt",
]);
