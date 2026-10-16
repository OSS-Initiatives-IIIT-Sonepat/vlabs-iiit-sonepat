import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step08 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/05-half-wave-rectifier";

export const step: SceneProcedureStep = {
  label: "Connect the multimeter across R_L",
  body: "Probe the multimeter across $R_L$ (DC volts range). With $V_m = 12\\,V$ and no filtering yet, the theoretical average is $V_{dc} = V_m/\\pi \\approx 3.82\\,V$; expect a slightly lower reading due to the diode\u2019s forward drop.",
  show: ["bb", "ac_src", "d1", "w_src_d1", "r1", "w_d1_r1", "w_r1_gnd", "dmm"],
  highlight: "dmm",
  readings: { dmm: "3.6 V" },
  schematic,
};
