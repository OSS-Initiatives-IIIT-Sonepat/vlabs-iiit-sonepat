import { type SceneProcedureStep } from "@/labs/experiments/types";
import { memoryDesignStepSchematics as fig } from "@/labs/schematics/semester-03/02-memory-cpu-systems/memory-design";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const all = [...placed, ...stages.wire, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "An address picks one cell",
    body: "A memory location is a stored bit with a decoder in front of it. The address goes into the 74HC138. Exactly one Y output goes low. That word line is the write-select for the cell, and the cell on this board is one flip-flop.",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Enable the decoder",
    body: "Place the 74HC138, a 74HC04, and a 74HC74. The decoder only speaks when E1 is high and both E2 and E3 are low. Tie them that way. Y0 is active-low, so the inverter turns the selected word line into a high the LED can show. Tie the flip-flop's preset and clear high so only the clock writes the bit.",
    show: placed,
    highlight: "dec",
    schematic: fig[1],
  },
  {
    label: "Wire address, data, and clock",
    body: "A0, A1, and A2 are the address. D is the data bit into the flip-flop. The clock is the write strobe. Y0 goes into the inverter, and the inverter drives the word LED. Q drives the data LED.",
    show: all,
    highlight: "bit",
    schematic: fig[2],
  },
  {
    label: "Address 000 selects word 0",
    body: "Set the address to 000 and leave the clock low. Y0 goes low, the inverter goes high, and the word LED lights. No other address does that. The data LED stays off because nothing has been written yet.",
    show: all,
    highlight: "led_word",
    activeInputs: { A0: 0, A1: 0, A2: 0, D: 0, CLK: 0 },
    schematic: fig[3],
  },
  {
    label: "Address 001 selects a different row",
    body: "Change A0 to 1. The word-0 LED goes out. Y1 is the line that went low, and it is not wired to this cell. A real memory has a cell on every Y output. This board has the one cell, so you can see the select move off it.",
    show: all,
    highlight: "dec",
    activeInputs: { A0: 1, A1: 0, A2: 0, D: 0, CLK: 0 },
    schematic: fig[4],
  },
  {
    label: "Present D = 1, clock still low",
    body: "Come back to address 000 so the word LED is on again, and set D = 1. Leave the clock low. The cell sees the data but a 74HC74 copies D only on the rising edge. Q is still dark. Click Next for the edge. Do not skip: the clock has to be low on this step.",
    show: all,
    highlight: "led_q",
    activeInputs: { A0: 0, A1: 0, A2: 0, D: 1, CLK: 0 },
    schematic: fig[5],
  },
  {
    label: "Rising clock writes the bit",
    body: "The clock rises. Q lights. The bit is stored. Drop D later and Q will hold until the next rising edge, which is the difference between the word line (which track the address right now) and the cell (which remembers). A wider memory is this pair, repeated for every bit of the word and every row of the decoder.",
    show: all,
    highlight: "led_q",
    activeInputs: { A0: 0, A1: 0, A2: 0, D: 1, CLK: 1 },
    schematic: fig[6],
  },
];
