import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { ONE_CLIENT } from "@/labs/networks/tcp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

const net: NetFrame = {
  show: ONE_CLIENT,
  hot: ["client"],
  focus: ["client", "server", "sw"],
  tags: { server: "LISTEN :5000" },
  consoles: [
    {
      at: "client",
      title: "client.py",
      lines: [
        "import socket",
        "s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
        's.connect(("192.168.1.20", 5000))',
        's.sendall(b"hello")',
        "print(s.recv(1024))",
        "s.close()",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Server: accept() waits",
  body: "The server's program now sits in accept(), blocked until a client connects.\n\nOn the client, the program is just as short: make a socket, connect to 192.168.1.20 port 5000, send hello, print the reply, and close.",
  show: [],
  schematic: figure(net),
  net,
};
