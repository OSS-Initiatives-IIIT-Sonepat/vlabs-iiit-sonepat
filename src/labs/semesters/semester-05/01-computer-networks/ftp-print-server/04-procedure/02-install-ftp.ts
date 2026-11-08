import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { NO_PRINTER } from "@/labs/networks/ftp-print";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/ftp-print";

const net: NetFrame = {
  show: [...NO_PRINTER, "prn"],
  hot: ["ftp"],
  focus: ["ftp", "sw"],
  tags: { ftp: "LISTEN :21" },
  consoles: [
    {
      at: "ftp",
      title: "Terminal · FTP server",
      lines: [
        "$ sudo apt install vsftpd",
        "$ sudo systemctl enable --now vsftpd",
        "$ sudo ss -ltn | grep :21",
        "LISTEN  0  32   *:21   *:*",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Install the FTP server",
  body: "On the FTP server, install vsftpd and start it. The service listens on TCP port 21, waiting for clients.\n\nCheck it with systemctl status and with ss, which lists the listening sockets.",
  show: [],
  schematic: figure(net),
  net,
};
