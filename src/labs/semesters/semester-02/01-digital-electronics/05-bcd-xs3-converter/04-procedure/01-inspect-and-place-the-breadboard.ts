import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Inspect and place the long breadboard and connect +5 V power.",
  body: "Place the 60-column solderless breadboard on the workbench. Connect the regulated +5 V DC supply to the top rails and bridge the top and bottom +5 V rails with a purple jumper at the far right. Inputs A–D go on the left (columns 2, 4, 6, 8), the four ICs in the middle and the LEDs on the right.",
  show: ["bb", "psu", "w_rail_link"],
  highlight: "psu",
};
