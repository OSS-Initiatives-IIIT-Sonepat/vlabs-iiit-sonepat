import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NO_PRINTER } from "@/labs/networks/ftp-print";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  show: [...NO_PRINTER, "prn"],
  note: {
    at: "ftp",
    title: "Two servers",
    text: "The FTP server stores files. The print server will own the printer.",
  },
};

export const step: SceneProcedureStep = {
  label: "The office LAN",
  body: "The switch joins three machines: the client PC at 192.168.1.10, the FTP server at 192.168.1.20, and the print server at 192.168.1.30. The printer is next to the print server, not yet connected.\n\nFirst you will set up FTP and move files with it. Then you will share the printer.",
  show: [],
  schematic: figure(net, "FTP server and print server"),
  net,
};
