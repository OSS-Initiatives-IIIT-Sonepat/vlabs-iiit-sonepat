import { type SceneProcedureStep } from "@/labs/experiments/types";
import { basicComputerStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/basic-computer";
import { stages } from "../components";
const all = [...stages.power, ...stages.cpu, ...stages.ram];
export const procedureSteps: SceneProcedureStep[] = [
  { label: "Place the CPU and the memory", body: "The CPU's address pins drive the RAM. Chip-select and output-enable on the RAM are tied active. Leave the clock low. Address 0 is the first word.", show: all, highlight: "cpu", activeInputs: { clk: 0 }, schematic: fig[0] },
  { label: "Read address 0", body: "With the clock still low the lamps show 0001. On this board that word stands for the instruction. The textbook instruction is the one at address 22.", show: all, highlight: "led_d0", activeInputs: { clk: 0 }, schematic: fig[0] },
  { label: "Clock once", body: "Raise the clock. The program counter moves from 0 to 1 and the lamps change to 0101. Go back to the low clock if you need to see 0001 again, then come forward once. Do not skip the low step: the counter advances on the rising edge.", show: all, highlight: "ram", activeInputs: { clk: 1 }, schematic: fig[1] },
  { label: "Direct addressing", body: "Mode 0 at address 22 is ADD 457. The address field is the operand address, so the operand is the word stored at 457. The board cannot hold 457; the diagram carries the textbook number.", show: all, activeInputs: { clk: 1 }, schematic: fig[2] },
  { label: "Indirect addressing", body: "Mode 1 at address 35 is ADD 300. Location 300 does not hold the operand. It holds 1350, and the operand is the word at 1350.", show: all, activeInputs: { clk: 1 }, schematic: fig[3] },
  { label: "Fetch, then decode", body: "T0 copies M[PC] into the instruction register. The next time slot decodes the opcode and reads the addressing mode. Those two slots are the start of the instruction cycle. The board you just clocked is the fetch.", show: all, activeInputs: { clk: 1 }, schematic: fig[5] },
];
