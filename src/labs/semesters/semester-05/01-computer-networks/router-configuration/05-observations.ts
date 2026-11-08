import { type ObservationSection } from "@/labs/lab-content.types";

import {
  RCLI_TABLE_HEADERS,
  RCLI_TABLE_ROWS,
} from "@/labs/networks/router-cli";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The router started in user EXEC mode with the prompt Router>. enable and configure terminal moved it to privileged and global configuration mode, and the prompt changed at each step.",
    "Both Gigabit ports stayed red until each had an address and no shutdown, then turned green, and show ip interface brief reported them up/up.",
    "show ip route listed a connected route and a local route for each LAN. After copy running-config startup-config, the setup survived a reload.",
    "PC A in LAN 10 pinged PC C in LAN 20 through R1, with gateways 192.168.10.1 and 192.168.20.1.",
  ],
  table: {
    headers: RCLI_TABLE_HEADERS,
    rows: RCLI_TABLE_ROWS,
  },
};
