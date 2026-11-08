import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { layersFigure } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Look inside a UTP cable",
  body: "Take the UTP sample. Inside the jacket are eight wires in four pairs: orange, green, blue and brown. In each pair one wire is a solid colour and the other is white with a stripe of that colour.\n\nEach pair is twisted, with a different twist rate for each pair. Noise from outside lands on both wires of a pair, and the receiver reads only the difference between them, so the noise cancels.",
  show: [],
  schematic: layersFigure("utp"),
  net: {
    show: WORKBENCH,
    hot: ["utp"],
    focus: ["utp", "stp"],
    zoom: 0.9,
    note: {
      at: "utp",
      title: "Four pairs",
      text: "Orange, green, blue, brown. Each solid wire is twisted with its white-striped partner.",
    },
  },
};
