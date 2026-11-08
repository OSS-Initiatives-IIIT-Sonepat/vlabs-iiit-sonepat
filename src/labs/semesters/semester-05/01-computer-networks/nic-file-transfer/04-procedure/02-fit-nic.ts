import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NIC_DEVICES, NIC_SEATED } from "@/labs/networks/nic-lan-wlan";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/nic-lan-wlan";

const net: NetFrame = {
  show: NIC_DEVICES,
  hot: ["nic", "pcA"],
  focus: ["pcA", "nic"],
  moves: NIC_SEATED,
  note: {
    at: "pcA",
    title: "Into the slot",
    text: "Gold edge fully down, bracket screwed to the case, socket at the back.",
  },
};

export const step: SceneProcedureStep = {
  label: "Fit the NIC in a PCIe slot",
  body: "Shut PC A down and unplug it. Touch the metal case to discharge static, then open the side panel.\n\nPush the NIC straight down into a free PCIe x1 slot until the gold edge is fully seated, and screw its metal bracket to the back of the case. The RJ45 socket now looks out of the back. Close the case and power the PC on.",
  show: [],
  schematic: figure(net),
  net,
};
