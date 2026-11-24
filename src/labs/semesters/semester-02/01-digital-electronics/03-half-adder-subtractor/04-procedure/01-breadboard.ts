import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the long breadboard.",
  body: "Place the 60-column breadboard on the workbench. We use the long board so the three ICs and the output stage have plenty of room and every jumper wire stays clearly visible. Input tie-points will be on the left (columns 2 and 4) and the LEDs on the right.",
  show: ["bb", "psu", "w_rail_link"],
  audioPath:
    "/semesters/semester-02/01-digital-electronics/half-adder-subtractor/01_procedure_english.mp3",
};
