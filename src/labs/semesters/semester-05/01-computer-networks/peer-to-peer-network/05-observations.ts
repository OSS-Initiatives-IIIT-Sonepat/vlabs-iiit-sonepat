import { type ObservationSection } from "@/labs/lab-content.types";

import {
  P2P_TABLE_HEADERS,
  P2P_TABLE_ROWS,
} from "@/labs/networks/peer-to-peer";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With one crossover cable and addresses 192.168.0.1 and .2, the PCs pinged each other and shared a folder with no other device.",
    "Through the switch, nothing changed for the PCs: the same addresses worked and the TTL stayed at 128.",
    "Through the router, PC B had to move to 10.0.0.2 in a different network, both PCs needed a gateway, and the TTL arrived as 127.",
  ],
  table: {
    headers: P2P_TABLE_HEADERS,
    rows: P2P_TABLE_ROWS,
  },
};
