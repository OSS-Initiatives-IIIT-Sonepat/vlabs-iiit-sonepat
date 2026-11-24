import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Inspect and place the long breadboard and connect +5 V power.",
  body: "Place the 60-column solderless breadboard on the workbench. Connect the regulated +5 V supply to the top rails and bridge the top and bottom +5 V rails with a purple jumper at the far right. The binary → Gray converter is built in the top half of the board and the Gray → binary converter in the bottom half.",
  show: ["bb", "psu", "w_rail_link"],
  highlight: "psu",
};
