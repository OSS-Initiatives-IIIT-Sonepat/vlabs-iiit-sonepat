import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Inspect and place the long breadboard and connect +5 V power.",
  body:
    "Place the 60-column solderless breadboard on the workbench. " +
    "Connect the regulated +5 V DC power supply (psu) to the top power distribution rails. " +
    "Bridge the top and bottom VCC distribution buses at column 59 using purple jumper wire w_rail_link.",
  show: ["bb", "psu", "w_rail_link"],
  highlight: "psu",
};
