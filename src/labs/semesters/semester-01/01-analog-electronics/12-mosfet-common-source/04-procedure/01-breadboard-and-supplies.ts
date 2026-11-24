import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "Place the breadboard and the two DC supplies.",
  body: "Place the breadboard on the bench. Keep both DC power supplies **switched off**. The first supply provides the drain supply $V_{DD}$ on the top rails. The second provides the gate bias $V_{GG}$: its (+) lead goes to column 8 and its (−) lead to the top ground rail, so both supplies share one ground.",
  show: ["bb", "psu", "vgg"],
  highlight: "bb",
};
