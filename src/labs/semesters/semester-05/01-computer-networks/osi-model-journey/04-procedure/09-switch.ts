import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Switch: read the MAC, pick a port",
  body: "The switch receives the bits on one port and turns them back into a frame. It checks the FCS and drops the frame if it is damaged. Then it reads one field: the destination MAC.\n\nThe switch keeps a MAC address table. Each time a frame arrives, it notes which port the source MAC came in on. It learned long ago that 00:1a:2b:00:01:01 is behind the router's port, so it sends the frame out of that port only. If the MAC were not in the table, it would flood the frame out of every port except the one it came in on.\n\nThe switch works at layers 1 and 2. It never looks at the IP header, and it does not change the frame. The laptop and the router cannot tell it is there.",
  show: [],
  schematic: osiFigure("data-link"),
  osi: {
    device: "switch",
    blocks: ["eth", "ip", "tcp", "tls", "data", "tag", "fcs"],
    captions: {
      eth: "→ router MAC",
      ip: "→ 203.0.113.10",
      tcp: ":49152 → :443",
    },
    focus: ["eth"],
    encrypted: true,
    note: {
      title: "Switch reads layer 2 only",
      text: "Destination MAC, then the port from its table. The frame goes out unchanged.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
