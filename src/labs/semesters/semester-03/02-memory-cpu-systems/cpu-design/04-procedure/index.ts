import { type SceneProcedureStep } from "@/labs/experiments/types";
import { cpuDesignStepSchematics as fig } from "@/labs/schematics/semester-03/02-memory-cpu-systems/cpu-design";

import { stages } from "../components";

const placed = [...stages.power, ...stages.place];
const all = [...placed, ...stages.wire, ...stages.lamps];

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Fetch means the PC selects an instruction",
    body: "The machine cycle starts by reading the instruction the program counter points at. On this board the 74HC161 is the PC. Its low bits drive a 74HC138, and each Y output is one instruction slot. Lighting Y's inverter is the fetch: 'this is the instruction we are about to decode.'",
    show: stages.power,
    highlight: "psu",
    schematic: fig[0],
  },
  {
    label: "Place the PC and the decoder",
    body: "Seat the counter, the decoder, and two inverters. Tie CLR' and LD' high so the PC is not cleared and not loaded. Tie ENP and ENT high so it will count. Enable the decoder. Q0, Q1, and Q2 are the address into A0, A1, and A2. Invert Y0 and Y1 because those outputs are active-low and the LEDs want an active-high fetch lamp.",
    show: placed,
    highlight: "pc",
    schematic: fig[1],
  },
  {
    label: "PC is 0, so instruction 0 is fetched",
    body: "Wire the clock and the two LEDs, and leave the clock low. The counter starts at 0, so Y0 is the selected line and the instruction-0 LED is on. Instruction 1 is dark. That lamp is the fetch of address 0. A decode stage would now look at the bits stored at that address. Click Next only after this step — the following edge needs the clock to have been low.",
    show: all,
    highlight: "led_i0",
    activeInputs: { CLK: 0 },
    schematic: fig[2],
  },
  {
    label: "The PC holds while the clock is low",
    body: "The clock is still low, so the same instruction stays fetched. Execute would use this time. The PC does not move until the clock rises, which is the end of the instruction and the start of the next fetch.",
    show: all,
    highlight: "pc",
    activeInputs: { CLK: 0 },
    schematic: fig[3],
  },
  {
    label: "One clock fetches the next instruction",
    body: "The clock rises. The PC becomes 1. Instruction 0 goes out and instruction 1 lights. Fetch, then (off this board) decode and execute, then the PC advances and fetches again. That loop is the machine. A real PC is wider and the decoder is the control unit, but the order is this one.",
    show: all,
    highlight: "led_i1",
    activeInputs: { CLK: 1 },
    schematic: fig[4],
  },
];
