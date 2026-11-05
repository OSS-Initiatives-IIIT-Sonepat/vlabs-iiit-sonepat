import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { computerRegistersStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/computer-registers";

const headers = ["Name", "Bits", "What it holds"];
const rows = [
  ["Memory", "4096 x 16", "the program and the operands"],
  ["PC", "12", "address of the next instruction"],
  ["AR", "12", "address sent to memory"],
  ["IR", "16", "the instruction code"],
  ["TR", "16", "a temporary word"],
  ["DR", "16", "the memory operand"],
  ["AC", "16", "the processor register"],
  ["OUTR", "8", "a character for the printer"],
  ["INPR", "8", "a character from the keyboard"],
  ["DR ← AC", "select 100", "AC drives the bus, LD loads DR"],
  ["AC ← DR", "select 011", "DR drives the bus, LD loads AC"],
];

const copy = [
  [
    "Memory",
    "The memory holds 4096 words of 16 bits. Both the program and the data live in this one memory. Twelve address bits can name every word, because 2^12 = 4096. A stored word is 16 bits, so an instruction and an operand have the same width.",
    1,
  ],
  [
    "Program counter and address register",
    "PC and AR are the 12-bit address registers. PC holds the address of the next instruction, and it is incremented as each instruction is fetched. AR holds the address that is actually sent to memory, whether that address came from PC or from the address field of an instruction.",
    3,
  ],
  [
    "IR, TR, and DR",
    "IR, TR, and DR are 16-bit registers. IR holds the instruction code after it has been read from memory. DR holds the operand that was read from the memory word addressed by AR. TR holds a word only for the duration of a micro-operation that needs a spare register.",
    6,
  ],
  [
    "Accumulator, INPR, and OUTR",
    "AC is the 16-bit processor register. Results of add, AND, complement, and shift are written back into AC. INPR and OUTR are 8-bit character registers. A key struck at the terminal shifts one character into INPR. A character to be printed is placed in OUTR. Both talk to AC in parallel and to the terminal one bit at a time.",
    9,
  ],
  [
    "The common bus",
    "One bus joins the registers. Three select lines S2, S1, and S0 choose which unit may drive it. The number on each connection is that select code in decimal. Code 111, binary 111, selects the memory, so a read can place M[AR] on the bus. Every other register can load what it sees on the bus when its LD input is enabled.",
    9,
  ],
  [
    "AR and PC on the bus",
    "Code 001 puts AR on the bus. Code 010 puts PC on the bus. The address input of memory is wired from AR, not from the bus, so the word that memory reads or writes is the word whose address is in AR. LD, INR, and CLR on AR and PC are the load, increment, and clear inputs. They act on the clock edge.",
    9,
  ],
  [
    "DR, the adder, and AC",
    "Code 011 puts DR on the bus. Code 100 puts AC on the bus. The adder and logic sit beside AC. Their inputs are AC and the word just loaded, usually from DR, and the result is loaded back into AC. The flip-flop E stores the carry out of an addition. LD, INR, and CLR of AC and DR are clocked like the other registers.",
    9,
  ],
  [
    "The rest of the bus",
    "Code 101 puts IR on the bus. Code 110 puts TR on the bus. IR has LD only: the instruction is loaded, and it is not incremented or cleared in this machine. INPR and OUTR also have LD only. They are 8 bits, so they do not take a full 16-bit bus number of their own. The clock at the bottom is the timing source for every LD, INR, and CLR.",
    9,
  ],
  [
    "DR ← AC",
    "Set S2 S1 S0 = 100. That select code is 4, so AC drives the bus and every other output stays off the bus. Enable LD of DR. On the clock edge, DR copies the bus and the transfer DR ← AC is complete. The same select, with a different LD, is how any other register can receive AC.",
    10,
  ],
  [
    "AC ← DR",
    "Set S2 S1 S0 = 011. That select code is 3, so DR drives the bus. Enable LD of AC. On the clock edge, AC copies the bus and the transfer AC ← DR is complete. The adder and logic are not used for this plain copy. They are used when the operation is AC ← AC + DR or AC ← AC AND DR.",
    11,
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
