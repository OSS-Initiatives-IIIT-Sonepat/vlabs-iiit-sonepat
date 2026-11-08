export {
  SOCKET_BENCH,
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
  C2_TO_S,
  S_TO_C2,
} from "@/labs/networks/socket-bench";

export const UDP_TABLE_HEADERS = [
  "Test",
  "Datagrams",
  "Delivered",
  "What it shows",
];

export const UDP_TABLE_ROWS: (string | number)[][] = [
  ["Send hello", "1", "Yes", "No handshake before data"],
  ["Reply", "1", "Yes", "recvfrom() gives the sender's address"],
  ["Lost datagram", "1", "No", "Client times out and must retry itself"],
  ["Two clients", "2", "Yes", "One socket serves both"],
  ["Broadcast", "1 to 192.168.1.255", "Every host", "Not possible with TCP"],
  ["Header", "8 B", "—", "TCP's is 20 B or more"],
];
