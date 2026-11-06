import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { ioInterruptStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/io-interrupt";

const headers = ["What", "Condition", "Transfer"];
const rows = [
  ["Input", "key struck", "INPR ← character, FGI ← 1"],
  ["Input", "FGI = 1", "AC(0-7) ← INPR, FGI ← 0"],
  ["Output", "FGO = 1", "OUTR ← AC(0-7), FGO ← 0"],
  ["Output", "printer done", "FGO ← 1"],
  ["INP", "pB11", "AC(0-7) ← INPR, FGI ← 0"],
  ["OUT", "pB10", "OUTR ← AC(0-7), FGO ← 0"],
  ["SKI", "pB9", "If (FGI = 1) then (PC ← PC + 1)"],
  ["SKO", "pB8", "If (FGO = 1) then (PC ← PC + 1)"],
  ["ION", "pB7", "IEN ← 1"],
  ["IOF", "pB6", "IEN ← 0"],
  ["R ← 1", "T0' T1' T2' IEN (FGI + FGO)", "R ← 1"],
  ["RT0", "R = 1", "AR ← 0, TR ← PC"],
  ["RT1", "R = 1", "M[AR] ← TR, PC ← 0"],
  ["RT2", "R = 1", "PC ← PC + 1, IEN ← 0, R ← 0, SC ← 0"],
];

const copy = [
  [
    "The terminal",
    "The basic computer meets the outside world through a terminal with a keyboard and a printer. Every character is an 8-bit alphanumeric code. The keyboard is the input device. The printer is the output device. Nothing has been connected to the processor yet. These two boxes are only the equipment on the desk.",
    0,
  ],
  [
    "The serial interfaces",
    "The terminal sends and receives one bit at a time. The transmitter interface collects the bits of a keystroke. The receiver interface feeds bits to the printer. The arrows run both ways because the interface and the device have to agree on the character and on the moment it is ready. The processor still has not seen the character. It arrives as a parallel word only after the interface has assembled it.",
    0,
  ],
  [
    "INPR, OUTR, AC, and the flags",
    "The assembled input character is shifted into INPR. The character waiting to be printed is held in OUTR. Both registers are 8 bits. They meet AC in parallel, so one transfer moves the whole character. FGI says whether INPR holds a new character. FGO says whether the printer is free to take one. The red path on the right is that parallel connection: OUTR and INPR share it with AC.",
    0,
  ],
  [
    "A character coming in",
    "FGI begins at 0. When a key is struck, the 8-bit code is shifted into INPR and FGI is set to 1. While the flag stays set, another key cannot change INPR. The computer tests FGI. If it is 1, the character is copied in parallel from INPR into AC(0-7) and FGI is cleared to 0. Only then can the next key be accepted. The input path is the keyboard, the transmitter interface, INPR, and FGI.",
    2,
  ],
  [
    "A character going out",
    "OUTR works in the opposite direction. FGO begins at 1, which means the printer is idle. If the computer finds FGO set, it copies AC(0-7) into OUTR and clears FGO to 0. The receiver interface then shifts that character out to the printer. When the character has been printed, the printer sets FGO back to 1. Until FGO is 1 again, the computer must not load a new character, because OUTR still holds the one being printed.",
    4,
  ],
  [
    "The six instructions",
    "Every input-output instruction has D7 = 1 and I = 1, so the common condition is D7 I T3 = p. The bit of IR(6-11) that is 1 picks the operation. INP, hex F800, copies INPR into AC and clears FGI. OUT, hex F400, copies AC into OUTR and clears FGO. SKI, hex F200, skips the next instruction when FGI is 1. SKO, hex F100, skips when FGO is 1. ION, hex F080, sets IEN so interrupts are allowed. IOF, hex F040, clears IEN and turns them off. A program can move characters by testing SKI and SKO in a loop. That loop is what the interrupt cycle is built to avoid.",
    10,
  ],
  [
    "R = 0, the instruction cycle",
    "R is the interrupt flip-flop. R = 0 selects an ordinary instruction cycle: fetch and decode, then execute. At the end of execute the control reads IEN. IEN = 0 means the program does not want interrupts, and the = 0 line returns for the next instruction. IEN = 1 leads to the flags. FGI = 1 or FGO = 1 means a character is waiting or the printer is free, and R is set to 1. If both flags are 0, nothing is ready and the cycle returns without setting R. R can be set on any clock except T0, T1, and T2, because those three clocks are the fetch.",
    11,
  ],
  [
    "R = 1, the interrupt cycle",
    "At the end of execute the control reads R. R = 1 selects the interrupt cycle instead of another fetch. The right-hand column is that cycle. The return address, which is the current PC, is stored at memory location 0. The program then branches to location 1. IEN and R are both cleared, so the service program is not itself interrupted. Both columns come back to the top of the rectangle, and the next test of R decides which cycle runs.",
    11,
  ],
  [
    "RT0, RT1, and RT2",
    "The three boxes on the right are three register transfers. Fetch and decode are rewritten as R'T0, R'T1, and R'T2, so they run only when R is 0. The interrupt cycle uses the same three clocks with R = 1. RT0 clears AR and copies PC into TR. RT1 writes TR into M[AR], which is M[0], and clears PC. RT2 increments PC from 0 to 1, then clears IEN, R, and SC. Clearing SC makes the next timing signal T0, and the instruction fetched from address 1 is the start of the service program.",
    14,
  ],
  [
    "Before the interrupt",
    "The main program has been running, and PC is 256 when the interrupt is recognized. Location 0 is still empty. Location 1 holds BUN 1120 with I = 0, a direct branch to the I/O program. The I/O program ends with BUN 0 and I = 1. That indirect bit is the return: the branch target will be whatever address has been saved in location 0. Nothing has been saved yet.",
    14,
  ],
  [
    "After the interrupt",
    "RT1 writes the old PC into location 0, so that word is now 256. RT2 leaves PC equal to 1. The next fetch reads location 1, branches to 1120, and the I/O program runs. When it reaches 1 BUN 0, the indirect branch reads M[0] and jumps to 256, which is the instruction the main program was about to execute. IEN was cleared during the interrupt, so the service program must execute ION if it wants a later interrupt to be accepted.",
    14,
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
