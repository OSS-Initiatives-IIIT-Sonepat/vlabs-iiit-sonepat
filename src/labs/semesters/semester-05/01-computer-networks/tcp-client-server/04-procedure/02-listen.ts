import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { ONE_CLIENT } from "@/labs/networks/tcp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

const net: NetFrame = {
  show: ONE_CLIENT,
  hot: ["server"],
  focus: ["server", "sw"],
  tags: { server: "LISTEN :5000" },
  consoles: [
    {
      at: "server",
      title: "Terminal · server",
      lines: [
        "$ python3 server.py &",
        "$ ss -ltn | grep 5000",
        "LISTEN  0  128  0.0.0.0:5000  0.0.0.0:*",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Server: socket, bind, listen",
  body: "Run python3 server.py on the server. socket() makes a TCP socket (SOCK_STREAM). bind() ties it to port 5000 on every address of the server. listen() tells the operating system to accept connections on it.\n\nss -ltn now shows the server LISTENING on port 5000. Nothing has been sent on the network yet.",
  show: [],
  schematic: figure(net),
  net,
};
