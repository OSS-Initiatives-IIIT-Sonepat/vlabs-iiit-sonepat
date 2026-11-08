import { buildCircuit, buildLabContent } from "@/labs/experiments/build";
import { type LabContent } from "@/labs/lab-content.types";
import { type ExperimentDefinition } from "@/labs/experiments/types";
import { FTP_BENCH } from "@/labs/networks/ftp-print";

import { aim } from "./01-aim";
import { theory } from "./02-theory";
import { apparatus } from "./03-apparatus";
import { observations } from "./05-observations";
import { conclusion } from "./06-conclusion";
import { components } from "./components";
import { procedureSteps } from "./04-procedure";

export const ftpPrintServerExperiment: ExperimentDefinition = {
  id: "ftp-print-server",
  title: "Transfer Files with FTP and Share a Printer through a Print Server",
  description:
    "Set up an FTP server, log in and move files over its control and data connections, then attach a printer to a print server and print to it from another PC.",
  labType: "text",
  components,
  sections: [aim, theory, apparatus, observations, conclusion],
  procedureSteps,
};

export const FtpPrintServerCircuit = buildCircuit(ftpPrintServerExperiment);
export const FtpPrintServerContent: LabContent = {
  ...buildLabContent(ftpPrintServerExperiment),
  scene: "net",
  bench: FTP_BENCH,
};
