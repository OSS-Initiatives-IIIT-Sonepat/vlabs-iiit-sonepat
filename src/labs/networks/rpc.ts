export {
  SOCKET_BENCH,
  ONE_CLIENT,
  C_TO_S,
  S_TO_C,
} from "@/labs/networks/socket-bench";

export const RPC_TABLE_HEADERS = ["Stage", "Who", "Message", "Port"];

export const RPC_TABLE_ROWS: (string | number)[][] = [
  ["Register", "Server → rpcbind", "SET prog 0x23451111, v1, TCP", "111"],
  ["Look up", "Client → rpcbind", "GETPORT → 40123", "111"],
  ["Call", "Client stub → server", "CALL proc 1, args 5 and 7 in XDR", "40123"],
  ["Reply", "Server stub → client", "REPLY, result 12 in XDR", "40123"],
  ["Server down", "Client → rpcbind", "GETPORT: program not registered", "111"],
];
