import { type SceneProcedureStep } from "@/labs/experiments/types";
import { microprogramStepSchematics as fig } from "@/labs/schematics/semester-03/06-processor-design/microprogrammed-control";
import { stages } from "../components";
const all = [...stages.power, ...stages.counter, ...stages.rom];
export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Place the counter and the ROM",
    body: "The counter's outputs are the ROM address. Clear, load, and both enables are tied so the counter is free to count. The parallel-load inputs are tied low. Leave the clock low.",
    show: all,
    highlight: "car",
    activeInputs: { clk: 0 },
    schematic: fig[0],
  },
  {
    label: "Read the first control word",
    body: "CAR is 0 while the clock is low. The lamps show 0001, the microinstruction stored at address 0. Each lamp is one bit of that control word.",
    show: all,
    highlight: "led_d0",
    activeInputs: { clk: 0 },
    schematic: fig[2],
  },
  {
    label: "Clock the control address",
    body: "Raise the clock once. CAR becomes 1 and the lamps change to 0010. That is the next microinstruction. The edge only happens if you came from the low clock.",
    show: all,
    highlight: "rom",
    activeInputs: { clk: 1 },
    schematic: fig[3],
  },
  {
    label: "One word, several fields",
    body: "A microinstruction is one memory word split into fields. One field might load a register. Another might select a memory read. The lamps are showing the whole word, not one field.",
    show: all,
    activeInputs: { clk: 1 },
    schematic: fig[1],
  },
  {
    label: "Hardwired control",
    body: "The same sequence can be built from a counter and gates, with no control ROM. That is hardwired control. The board in front of you is the microprogrammed version.",
    show: all,
    activeInputs: { clk: 1 },
    schematic: fig[4],
  },
];
