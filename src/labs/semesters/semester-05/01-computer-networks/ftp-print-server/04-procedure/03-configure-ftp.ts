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
      title: "/etc/vsftpd.conf",
      lines: [
        "local_enable=YES",
        "write_enable=YES",
        "chroot_local_user=YES",
        "allow_writeable_chroot=YES",
        "pasv_min_port=40000",
        "pasv_max_port=40100",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Add a user and configure vsftpd",
  body: "Create the user student with a password and a folder of files. In /etc/vsftpd.conf, allow local users to log in and upload, keep each user inside their home folder, and fix the passive data ports to 40000-40100. Restart vsftpd.\n\nOpen ports 21 and 40000-40100 in the server's firewall.",
  show: [],
  schematic: figure(net),
  net,
};
