import { type SceneProcedureStep } from "@/labs/experiments/types";
import { step10 as schematic } from "@/labs/schematics/zener-diode-schematics";

export const step: SceneProcedureStep = {
  label: "Reverse bias sweep: 0 → 10 V.",
  body:
    "Power on. Increase $V_s$ from 0 to 10 V. Use **0.5 V steps**; switch to **0.1 V steps** near $V_Z \\approx 5\\,\\text{V}$.\n" +
    "Observe: $|V_Z|$ stays near **5.1 V** as current rises steeply — this is the **voltage-regulation** property.\n" +
    "Calculate $Z_Z = \\Delta V_Z / \\Delta I_Z$ in the breakdown region. For the 1N4733A at $I_Z = 20\\,\\text{mA}$, expect $Z_Z \\approx 7\\,\\Omega$.",
  show: [
    "bb",
    "psu",
    "dmm",
    "w_amm_in",
    "w_amm_out",
    "r1",
    "zener_rev",
    "w_r1_zrev",
    "w_zrev_gnd",
    "w_vm_rev_pos",
    "w_vm_rev_neg",
  ],
  activeInputs: { Vcc: 1 },
  supplyVoltage: 8.0,
  readings: { psu: "8.00 V", dmm: "-5.12 V  6.13 mA" },
  ledBrightness: { zener_rev: 0.4 },
  schematic,
};
