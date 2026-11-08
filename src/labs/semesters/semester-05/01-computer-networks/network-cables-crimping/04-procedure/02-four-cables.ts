import { type SceneProcedureStep } from "@/labs/experiments/types";
import { WORKBENCH } from "@/labs/networks/network-cables";
import { layersFigure } from "@/labs/schematics/semester-05/01-computer-networks/network-cables";

export const step: SceneProcedureStep = {
  label: "Compare the four cables",
  body: "Look at the cut ends of the four samples on the left of the bench.\n\nUTP has a plastic jacket and four twisted pairs. STP has a foil shield between the jacket and the pairs. Coaxial cable has one copper core, a white dielectric, a copper braid, and a jacket, all on the same centre. Optical fibre has a glass core inside a cladding, a buffer, and strands of Kevlar for strength.\n\nCopper carries the bits as voltage. Fibre carries them as light, so electrical noise cannot reach it.",
  show: [],
  schematic: layersFigure(),
  net: {
    show: WORKBENCH,
    hot: ["utp", "stp", "coax", "fiber"],
    focus: ["utp", "stp", "coax", "fiber"],
    zoom: 1.15,
    note: {
      at: "coax",
      title: "Copper or glass",
      text: "Three samples carry bits as voltage on copper. The fibre carries them as light.",
    },
  },
};
