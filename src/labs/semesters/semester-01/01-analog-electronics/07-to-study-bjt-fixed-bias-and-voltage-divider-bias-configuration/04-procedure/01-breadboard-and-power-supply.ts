import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Mount the breadboard and connect the regulated DC power supply.",
  body:
    "Mount the full-size 830-point solderless breadboard on your lab workstation. " +
    "Connect the regulated DC power supply (psu) terminals to the top distribution rails: " +
    "red lead to the top positive rail (vcc_top) at column 3, and black lead to the top ground rail (gnd_top) at column 3. " +
    "Set the DC supply voltage to $V_{CC} = 12\\text{ V}$.",
  show: ["bb", "psu"],
  highlight: "psu",
};
