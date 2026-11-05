import { type SceneProcedureStep } from "@/labs/experiments/types";
import { registerOrganisationStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/register-organisation";
import { stages } from "../components";
const all = [...stages.power, ...stages.file];
export const procedureSteps: SceneProcedureStep[] = [
  { label: "Two registers and a mux", body: "R0 is tied to 1 and R1 is tied to 0. Leave the clock low so the flip-flops have not captured yet.", show: all, highlight: "r0", activeInputs: { clk: 0, sel: 0 }, schematic: fig[0] },
  { label: "Clock the file", body: "Raise the clock. R0 stores 1 and R1 stores 0. The rising edge is the capture. The clock had to be low on the previous step.", show: all, highlight: "r1", activeInputs: { clk: 1, sel: 0 }, schematic: fig[1] },
  { label: "Read R0, then R1", body: "Select 0 lights the lamp, because the mux copies R0. Change the select to 1 and the lamp goes out, because the mux copies R1. One set of wires, two sources.", show: all, highlight: "led_bus", activeInputs: { clk: 1, sel: 1 }, schematic: fig[2] },
  { label: "A memory stack", body: "A stack pointer is a counter. The diagram's address 0 holds 0101, the value just pushed. Address 1 holds 0011, the next word. A push writes at SP and then moves SP. The control-memory lab is the same counter-plus-memory arrangement, used there for microinstructions.", show: all, activeInputs: { clk: 1, sel: 1 }, schematic: fig[3] },
  { label: "Three more addressing modes", body: "Immediate means the operand is in the instruction. Register means the field names R0 or R1, which is what the mux just did. Indexed means the address plus an index register. Direct and indirect stay in the basic-computer lab.", show: all, activeInputs: { clk: 1, sel: 1 }, schematic: fig[4] },
];
