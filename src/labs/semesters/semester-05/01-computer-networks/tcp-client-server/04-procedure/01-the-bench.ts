import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { ONE_CLIENT } from "@/labs/networks/tcp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/tcp-socket";

const net: NetFrame = {
  show: ONE_CLIENT,
  consoles: [
    {
      at: "server",
      title: "server.py",
      lines: [
        "import socket",
        "srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
        'srv.bind(("", 5000))',
        "srv.listen()",
        "conn, addr = srv.accept()",
        "data = conn.recv(1024)",
        "conn.sendall(data.upper())",
        "conn.close()",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Client, switch and server",
  body: "The server, 192.168.1.20, will run an echo server on TCP port 5000: it sends back whatever it receives, in capitals. The client, 192.168.1.10, will connect to it and send a word.\n\nThe server's code is shown beside it. Each line is one socket call.",
  show: [],
  schematic: figure(net, "Client and server on one switch"),
  net,
};
