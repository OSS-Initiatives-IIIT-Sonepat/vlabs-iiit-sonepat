import { type ObservationSection } from "@/labs/lab-content.types";

import {
  TCPIP_TABLE_HEADERS,
  TCPIP_TABLE_ROWS,
} from "@/labs/networks/tcpip-config";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With no DHCP server, PC 1 gave itself 169.254.18.7 and could reach no one.",
    "With 192.168.1.10/24 and no gateway, PC 1 reached PC 2 but not the server: Windows did not even send the packet, because it had no route to 192.168.2.0.",
    "With the gateway 192.168.1.1, PC 1 reached the server through the router, and the replies came back with TTL 127, one less than the server's 128.",
    "With the mask wrongly set to /16, PC 1 thought the server was local, asked for its MAC with ARP, got no answer because the router does not pass broadcasts, and reported Destination host unreachable.",
  ],
  table: {
    headers: TCPIP_TABLE_HEADERS,
    rows: TCPIP_TABLE_ROWS,
  },
};
