import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step01 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/02-pn-junction-diode";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and connect the DC power supply.",
  body:
    "Place the 830-point breadboard. Place the **variable DC supply** beside the breadboard (set to 0 V initially).\n" +
    "**Red wire**: supply (+) terminal → VCC rail at col 2.\n" +
    "**Black wire**: supply (−) terminal → GND rail at col 2.\n" +
    "The red rails carry $V_s$ throughout; the blue rails are $\\text{GND}$. Do **not** power on yet.",
  show: ["bb", "psu"],
  schematic,
};
