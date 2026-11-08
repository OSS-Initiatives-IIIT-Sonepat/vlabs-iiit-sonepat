import { type ObservationSection } from "@/labs/lab-content.types";

import { LAN_TABLE_HEADERS, LAN_TABLE_ROWS } from "@/labs/networks/lan-setup";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "Each PC's link light came on as its cable reached the switch, and a fault in one cable affected only that PC.",
    "With addresses 192.168.1.11 to .16 in the same /24 network, PC 1 reached every other PC with ping in under 1 ms.",
    "An ARP broadcast from PC 1 was delivered to all five other PCs, and net view listed all six PCs in the LAB workgroup.",
  ],
  table: {
    headers: LAN_TABLE_HEADERS,
    rows: LAN_TABLE_ROWS,
  },
};
