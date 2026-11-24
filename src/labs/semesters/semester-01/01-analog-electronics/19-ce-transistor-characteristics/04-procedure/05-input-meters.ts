import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step05 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Read VBE and IB.",
  body: "Put the microammeter between column 24 and column 21, and the voltmeter across base and emitter. Set $V_{BB} = 4.69\\,\\mathrm{V}$. Then $V_{BE} = 0.69\\,\\mathrm{V}$ and $I_B = 40\\,\\mu\\mathrm{A}$.",
  show: ["bb", "q1", "w_e_gnd", "rb", "w_b_rb", "psu_b", "am_ib", "vm_be"],
  highlight: "vm_be",
  readings: { psu_b: "4.69 V", am_ib: "40 µA", vm_be: "0.69 V" },
  schematic,
};
