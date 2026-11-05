import { type SceneProcedureStep } from "@/labs/experiments/types";
import { memoryMapStepSchematics as fig } from "@/labs/schematics/semester-03/07-memory-and-io/memory-address-map";
import { stages } from "../components";
const all = [...stages.power, ...stages.decoder, ...stages.roms];
export const procedureSteps: SceneProcedureStep[] = [
  { label: "The hierarchy", body: "Tape, disk, main memory, cache, registers. Each step closer to the CPU is smaller and faster. This board is the main-memory slice: a decoder and two ROMs.", show: [...stages.power, ...stages.decoder], highlight: "dec", schematic: fig[0] },
  { label: "SRAM and DRAM", body: "SRAM holds the bit in a latch, so it is fast and it does not forget while power is on. DRAM holds the bit on a capacitor, so it must be read and written back. The ROMs on this board stand in for the PROM map, not for a DRAM cell.", show: all, schematic: fig[1] },
  { label: "Place the two ROMs", body: "Both ROMs share D0 to D3. Each chip-select comes from a different decoder output. Y0 enables ROM 0, which holds 0011. Y1 enables ROM 1, which holds 1100. The ROM address pins are tied to 0.", show: all, highlight: "rom0", schematic: fig[2] },
  { label: "Select ROM 0", body: "Set the select input to 0. The decoder enables ROM 0 and disables ROM 1. The lamps show 0011. ROM 1 must not drive the same wires while it is disabled.", show: all, highlight: "led_d0", activeInputs: { a0: 0 }, schematic: fig[3] },
  { label: "Select ROM 1", body: "Set the select input to 1. ROM 1 turns on, ROM 0 turns off, and the lamps change to 1100. The high address bit chose the chip. That is a memory map.", show: all, highlight: "led_d2", activeInputs: { a0: 1 }, schematic: fig[4] },
];
