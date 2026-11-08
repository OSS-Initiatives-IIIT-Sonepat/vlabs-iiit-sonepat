import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_DEVICES } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_DEVICES,
  hot: ["sw"],
  focus: ["sw"],
  busy: ["sw"],
  note: {
    at: "sw",
    title: "Self-test",
    text: "Every port light blinks once at power-on.",
  },
};

export const step: SceneProcedureStep = {
  label: "Mount and power the switch",
  body: "Fix the switch to the back wall at desk height and plug in its power. The power light turns on and the switch runs its self-test, blinking every port light once.\n\nAn unmanaged switch needs no setup. It will learn the PCs' MAC addresses from the first frames they send.",
  show: [],
  schematic: figure(net),
  net,
};
