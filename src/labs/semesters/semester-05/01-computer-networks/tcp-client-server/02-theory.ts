import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "TCP gives two programs a reliable, ordered stream of bytes over IP. Before any data moves, the two ends set up a connection; while it is open, every byte is numbered and acknowledged; and at the end, each side closes its half. TCP is called connection-oriented for this reason.",
    "A socket is one end of the connection, named by an IP address and a port. The server creates a socket, binds it to a well-known port such as 5000, and calls listen() to accept connections. accept() then waits until a client arrives and returns a new socket for that one connection. The client creates a socket and calls connect() with the server's address and port. The operating system picks a free local port for the client, such as 50821.",
    "connect() starts the three-way handshake. The client sends SYN with its initial sequence number; the server answers SYN-ACK with its own sequence number and an acknowledgement of the client's; the client sends ACK. Both sides are then ESTABLISHED.",
    "Each data segment carries the sequence number of its first byte. The receiver acknowledges with the number of the next byte it expects. If an acknowledgement does not come back in time, the sender sends the segment again. The receiver puts bytes in order and drops duplicates, so the program sees each byte exactly once.",
    "close() sends FIN. The other side acknowledges it and, when it has finished too, sends its own FIN, which is acknowledged in turn. The side that closed first waits in TIME_WAIT for twice the maximum segment lifetime before the port is reused.",
    "The calls are the same in C, Python and Java: socket, bind, listen, accept, connect, send, recv, close. This lab uses Python's socket module for brevity. A server that loops on accept() serves one client after another, and with threads it can serve many at once.",
  ],
};
