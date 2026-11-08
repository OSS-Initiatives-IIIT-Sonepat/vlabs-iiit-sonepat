import { type ObservationSection } from "@/labs/lab-content.types";

import { UDP_TABLE_HEADERS, UDP_TABLE_ROWS } from "@/labs/networks/udp-socket";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The first datagram left the client at once; no packets were exchanged before it. The server's recvfrom() returned the data together with the client's address and port.",
    "A lost datagram was simply gone. Nothing was resent until the client's own 2 s timeout fired and the program sent it again.",
    "One server socket answered two clients, each at the address recvfrom() gave. A datagram to 192.168.1.255 reached every host on the LAN.",
    "Each UDP datagram carried an 8-byte header, against at least 20 bytes for a TCP segment.",
  ],
  table: {
    headers: UDP_TABLE_HEADERS,
    rows: UDP_TABLE_ROWS,
  },
};
