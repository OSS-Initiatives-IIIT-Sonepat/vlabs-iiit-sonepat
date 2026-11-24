import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step04 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/19-ce-transistor-characteristics";

export const step: SceneProcedureStep = {
  label: "Connect the base supply.",
  body: "Connect $V_{BB}$ with its positive lead on column 24 and its return on the ground rail. Leave it at 0 V until the base ammeter is in series.",
  show: ["bb", "q1", "w_e_gnd", "rb", "w_b_rb", "psu_b"],
  highlight: "psu_b",
  readings: { psu_b: "0.00 V" },
  schematic,
};
