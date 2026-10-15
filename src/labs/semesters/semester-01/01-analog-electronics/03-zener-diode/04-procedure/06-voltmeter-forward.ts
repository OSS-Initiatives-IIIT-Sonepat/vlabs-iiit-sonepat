import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step06 as schematic } from "@/labs/schematics/zener-diode-schematics";

export const step: SceneProcedureStep = {
  label: "Connect voltmeter across the forward-biased Zener.",
  body:
    "Set DMM 1 to **DC Voltage, 20 V range**.\n" +
    "**Blue wire** (+): col 10, spanning row a → row e (anode side).\n" +
    "**Blue wire** (−): col 11, spanning row a → row e (cathode side).\n" +
    "These probes measure $V_Z$ directly across the diode.",
  show: [
    "bb",
    "psu",
    "dmm",
    "w_amm_in",
    "w_amm_out",
    "r1",
    "zener_fwd",
    "w_r1_zfwd",
    "w_zfwd_gnd",
    "w_vm_fwd_pos",
    "w_vm_fwd_neg",
  ],
  schematic,
};
