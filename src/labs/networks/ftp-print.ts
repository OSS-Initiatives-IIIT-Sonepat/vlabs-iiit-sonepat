import { type NetBench } from "@/labs/networks/bench";

/**
 * An office LAN: a client PC, an FTP server, and a print server with a USB
 * printer, all on one switch.
 */
export const FTP_BENCH: NetBench = {
  zones: [
    {
      id: "lan",
      label: "Office LAN · 192.168.1.0/24",
      x: 0,
      z: 0.6,
      w: 18,
      d: 9,
    },
  ],
  devices: [
    { id: "sw", kind: "switch", name: "Switch", x: 0, z: -2.6 },
    {
      id: "client",
      kind: "pc",
      name: "Client PC",
      x: -6,
      z: 0.4,
      addresses: ["192.168.1.10"],
    },
    {
      id: "ftp",
      kind: "server",
      name: "FTP server",
      x: 6,
      z: -0.2,
      addresses: ["192.168.1.20"],
    },
    {
      id: "ps",
      kind: "pc",
      name: "Print server",
      x: -2.6,
      z: 3,
      addresses: ["192.168.1.30"],
    },
    {
      id: "prn",
      kind: "printer",
      name: "Printer",
      x: -7.2,
      z: 3,
      addresses: ["LabPrinter"],
    },
  ],
  links: [
    {
      id: "client-sw",
      a: "client",
      b: "sw",
      kind: "straight",
      via: [[-6, -2.6]],
    },
    { id: "ftp-sw", a: "ftp", b: "sw", kind: "straight", via: [[6, -2.6]] },
    { id: "ps-sw", a: "ps", b: "sw", kind: "straight", via: [[-0.4, 3]] },
    { id: "ps-prn", a: "ps", b: "prn", kind: "console", label: "USB" },
  ],
};

export const NO_PRINTER = [
  "sw",
  "client",
  "ftp",
  "ps",
  "client-sw",
  "ftp-sw",
  "ps-sw",
];

export const FTP_TABLE_HEADERS = [
  "Task",
  "Protocol, port",
  "From → to",
  "Result",
];

export const FTP_TABLE_ROWS: (string | number)[][] = [
  [
    "Log in",
    "FTP control, TCP 21",
    "Client → FTP server",
    "230 Login successful",
  ],
  [
    "Download notes.pdf",
    "FTP data, passive port",
    "FTP server → client",
    "226 Transfer complete",
  ],
  [
    "Upload report.docx",
    "FTP data, passive port",
    "Client → FTP server",
    "226 Transfer complete",
  ],
  [
    "Add the printer",
    "SMB, TCP 445",
    "Client → print server",
    "Driver installed",
  ],
  [
    "Print a test page",
    "SMB, then USB",
    "Client → print server → printer",
    "Page printed",
  ],
];
