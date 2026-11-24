import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the gate supply (VGS)",
  body: "Place the second variable DC supply. Plug its (+) lead straight into the gate column (col 14) and its (−) lead into the GND rail, so it shares ground with $V_{DD}$. Keep its output at 0 V.",
  show: ["bb", "psu_vds", "r_d", "q1", "psu_vgs"],
  highlight: "psu_vgs",
  supplyVoltage: 0,
};
