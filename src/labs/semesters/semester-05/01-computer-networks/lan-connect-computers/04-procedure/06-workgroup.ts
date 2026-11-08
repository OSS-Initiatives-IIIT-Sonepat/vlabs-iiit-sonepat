import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { LAN_ALL, LAN_ADDR } from "@/labs/networks/lan-setup";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/lan-setup";

const net: NetFrame = {
  show: LAN_ALL,
  hot: ["pc1", "pc2", "pc3", "pc4", "pc5", "pc6"],
  addr: LAN_ADDR,
  consoles: [
    {
      at: "pc1",
      title: "Command Prompt · PC 1",
      lines: [
        'C:\\>systeminfo | findstr /B "Domain"',
        "Domain:                    LAB",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Join one workgroup",
  body: "Open System Properties (sysdm.cpl), choose Change, and put every PC in the workgroup LAB. Restart when asked.\n\nThen mark the network as Private and turn on network discovery and file and printer sharing. Windows now announces each PC to the others.",
  show: [],
  schematic: figure(net),
  net,
};
