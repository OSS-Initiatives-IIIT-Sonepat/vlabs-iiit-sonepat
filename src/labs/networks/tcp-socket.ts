export {
  SOCKET_BENCH,
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  C2_TO_S,
  S_TO_C2,
} from "@/labs/networks/socket-bench";

export const TCP_TABLE_HEADERS = ["Stage", "Calls", "Segments", "State after"];

export const TCP_TABLE_ROWS: (string | number)[][] = [
  ["Connect", "connect() / accept()", "SYN, SYN-ACK, ACK", "ESTABLISHED"],
  ["Send", "sendall(b'hello')", "Data 5 B, ACK", "ESTABLISHED"],
  ["Reply", "recv() / sendall()", "Data 5 B, ACK", "ESTABLISHED"],
  ["Lost segment", "none", "Resent after timeout", "Data arrives once"],
  ["Close", "close()", "FIN, ACK, FIN, ACK", "TIME_WAIT, then CLOSED"],
  [
    "Second client",
    "accept() again",
    "New handshake from port 50822",
    "2 connections",
  ],
];
