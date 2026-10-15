import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step02 as schematic } from "@/labs/schematics/zener-diode-schematics";

export const step: SceneProcedureStep = {
  label: "Connect the ammeter (DMM) in series.",
  body:
    "Place the **Digital Multimeter** (DMM) beside the breadboard and set it to **DC mA** mode.\n" +
    "Connect the ammeter in series using **orange jumper wires**:\n" +
    "**Orange wire 1**: VCC rail (col 5) → col 3 row d (ammeter input).\n" +
    "**Orange wire 2**: col 3 row c → R₁ input (col 5 row c).\n" +
    "Since rows c and d in the same column share a net, all circuit current flows through the ammeter, measuring $I_Z$ directly.",
  show: ["bb", "psu", "dmm", "w_amm_in", "w_amm_out"],
  schematic,
};
