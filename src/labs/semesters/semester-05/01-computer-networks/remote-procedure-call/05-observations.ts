import { type ObservationSection } from "@/labs/lab-content.types";

import { RPC_TABLE_HEADERS, RPC_TABLE_ROWS } from "@/labs/networks/rpc";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "rpcgen turned the 8-line add.x into a header, two stubs and the XDR routines. The programmer wrote only add_1_svc() on the server and the call on the client.",
    "rpcinfo -p on the server listed program 591728913 (0x23451111), version 1, on TCP port 40123, next to the portmapper on port 111.",
    "The client asked rpcbind for the port, then sent one CALL with the arguments 5 and 7 encoded as two 4-byte big-endian integers. The REPLY carried 12, and the client printed 5 + 7 = 12.",
    "With the server stopped, the client failed with RPC: Program not registered, an error a local call never has.",
  ],
  table: {
    headers: RPC_TABLE_HEADERS,
    rows: RPC_TABLE_ROWS,
  },
};
