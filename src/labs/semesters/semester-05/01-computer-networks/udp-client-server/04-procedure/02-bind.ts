import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { ONE_CLIENT } from "@/labs/networks/udp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

const net: NetFrame = {
  show: ONE_CLIENT,
  hot: ["server"],
  focus: ["server", "sw"],
  tags: { server: "UDP :5001" },
  consoles: [
    {
      at: "server",
      title: "Terminal · server",
      lines: [
        "$ python3 udp_server.py &",
        "$ ss -lun | grep 5001",
        "UNCONN  0  0  0.0.0.0:5001  0.0.0.0:*",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Server: socket and bind",
  body: "Run python3 udp_server.py. socket() with SOCK_DGRAM makes a UDP socket, and bind() ties it to port 5001. The program then waits in recvfrom().\n\nss -lun shows the socket as UNCONN: a UDP socket is never connected, it just receives whatever datagrams come to its port.",
  show: [],
  schematic: figure(net),
  net,
};
