import { type SceneProcedureStep } from "@/labs/experiments/types";
import { instructionPipelineStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/instruction-pipeline";
import { shown } from "../components";
const all = [...shown.power, ...shown.chips, ...shown.lamps];
const on = (t0, t1, t2, t3) => ({ t0, t1, t2, t3 });
export const procedureSteps: SceneProcedureStep[] = [
  { label: "Place the four stages", body: "IF fetches, ID decodes, EX executes, and WB writes the result back. Each package is only a label and a lamp. The lamp is the occupancy of that stage.", show: all, highlight: "if0", activeInputs: on(0, 0, 0, 0), schematic: fig[11] },
  { label: "Clock 1", body: "I1 enters IF. Only the IF lamp is on.", show: all, highlight: "led_if", activeInputs: on(1, 0, 0, 0), schematic: fig[0] },
  { label: "Clock 2", body: "I1 moves to ID and I2 enters IF. Two lamps are on.", show: all, activeInputs: on(1, 1, 0, 0), schematic: fig[1] },
  { label: "Clock 3", body: "I1 is in EX, I2 is in ID, and I3 is in IF.", show: all, activeInputs: on(1, 1, 1, 0), schematic: fig[2] },
  { label: "Clock 4", body: "I1 reaches WB. No fourth instruction was fetched, so IF is dark.", show: all, activeInputs: on(0, 1, 1, 1), schematic: fig[3] },
  { label: "Clock 5", body: "I2 is in WB and I3 is in EX.", show: all, activeInputs: on(0, 0, 1, 1), schematic: fig[4] },
  { label: "Clock 6", body: "I3 writes back. The three-instruction sequence has left the pipe. Only WB is lit.", show: all, highlight: "led_wb", activeInputs: on(0, 0, 0, 1), schematic: fig[5] },
  { label: "A branch empties the pipe", body: "A taken branch throws away the instructions that were fetched after it. Every stage lamp goes out, and the pipe starts again from the branch target.", show: all, activeInputs: on(0, 0, 0, 0), schematic: fig[6] },
  { label: "Add two normalised floats", body: "X = 0.9504 × 10² and Y = 0.8200 × 10². The mantissas add to 1.7704. One right shift normalises that to 0.1770 × 10³. This is the arithmetic pipeline from the floating-point unit, not a second instruction pipe.", show: all, activeInputs: on(0, 0, 0, 0), schematic: fig[7] },
  { label: "Flynn's four classes", body: "SISD is one instruction stream and one data stream. SIMD is one instruction and many data streams. MISD is many instructions and one data stream. MIMD is many of both.", show: all, activeInputs: on(0, 0, 0, 0), schematic: fig[8] },
  { label: "Two CPUs share one memory", body: "Both CPUs want the RAM. Only one CPU's address wires are in the picture at a time. The other waits.", show: all, activeInputs: on(0, 0, 0, 0), schematic: fig[9] },
  { label: "A crossbar", body: "A crossbar can connect every CPU to every memory at once. This frame is the switch. It is not a second breadboard.", show: all, activeInputs: on(0, 0, 0, 0), schematic: fig[10] },
];
