import { type ObservationSection } from "@/labs/lab-content.types";

import { TCP_TABLE_HEADERS, TCP_TABLE_ROWS } from "@/labs/networks/tcp-socket";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "connect() and accept() returned only after the SYN, SYN-ACK, ACK handshake, and netstat showed the connection as ESTABLISHED on both machines.",
    "The client's 5 bytes arrived as one segment with sequence number 1001 and were acknowledged with 1006, the number of the next byte expected.",
    "When a segment was lost, the client's TCP resent it after the retransmission timeout. The server program received the bytes once and in order, without knowing anything had gone wrong.",
    "close() sent FIN on each side, and the client stayed in TIME_WAIT before the connection was gone. A second client got its own connection, from a different port, on the same server port 5000.",
  ],
  table: {
    headers: TCP_TABLE_HEADERS,
    rows: TCP_TABLE_ROWS,
  },
};
