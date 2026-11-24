import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/semester-01/01-analog-electronics/03-zener-diode";

export const step: SceneProcedureStep = {
  label: "Connect the ammeter (DMM) in series.",
  body:
    "Place the **Digital Multimeter** (DMM) beside the breadboard and set it to **DC mA** mode.\n" +
    "Connect it **in series**: the (+) lead goes to the VCC rail and the (−) lead goes to col 5, where R₁ will start.\n" +
    "The meter is now the only path from the supply into the circuit, so all of $I_Z$ flows through it. Never put both leads in the same column: that shorts the meter and it reads zero.",
  show: ["bb", "psu", "dmm"],
  schematic,
};
