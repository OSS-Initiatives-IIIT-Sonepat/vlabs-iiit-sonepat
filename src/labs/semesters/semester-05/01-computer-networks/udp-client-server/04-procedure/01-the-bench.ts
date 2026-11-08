import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { ONE_CLIENT } from "@/labs/networks/udp-socket";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/udp-socket";

const net: NetFrame = {
  show: ONE_CLIENT,
  consoles: [
    {
      at: "server",
      title: "udp_server.py",
      lines: [
        "import socket",
        "s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)",
        's.bind(("", 5001))',
        "while True:",
        "    data, addr = s.recvfrom(1024)",
        "    s.sendto(data.upper(), addr)",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Client, switch and server",
  body: "The server will run a UDP echo server on port 5001 and send back each message in capitals. The code is shorter than the TCP version: there is no listen() and no accept().\n\nThe server answers each datagram with sendto() to the address recvfrom() reports.",
  show: [],
  schematic: figure(net, "Client and server on one switch"),
  net,
};
