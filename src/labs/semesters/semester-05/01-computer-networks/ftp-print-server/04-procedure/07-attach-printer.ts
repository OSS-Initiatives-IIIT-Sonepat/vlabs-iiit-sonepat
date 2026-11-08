import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  hot: ["ps", "prn", "ps-prn"],
  focus: ["ps", "prn"],
  tags: { prn: "✓ driver installed" },
};

export const step: SceneProcedureStep = {
  label: "Attach the printer to the print server",
  body: "Plug the printer's USB cable into the print server and switch the printer on. Windows finds it and installs the driver, or install the maker's driver yourself.\n\nPrint a test page locally from Printers & scanners to check the printer works before sharing it.",
  show: [],
  schematic: figure(net),
  net,
};
