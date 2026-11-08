import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "UDP, the User Datagram Protocol, sends single messages called datagrams over IP. It sets up no connection, numbers nothing, acknowledges nothing and resends nothing. Each datagram either arrives whole or does not arrive. UDP is called connectionless for this reason.",
    "Its header is 8 bytes: source port, destination port, length and checksum. TCP's header is 20 bytes or more and comes with a handshake, acknowledgements and retransmission. UDP's low cost suits DNS lookups, DHCP, online games, voice and video, where a late answer is worth less than no answer.",
    "A UDP server creates a socket with SOCK_DGRAM and binds it to a port. There is no listen() and no accept(): recvfrom() simply returns the next datagram and the address and port it came from. The server answers with sendto() to that address. One socket serves every client.",
    "A UDP client creates a socket and calls sendto() with the server's address and port; the first datagram leaves at once, with no handshake. If the reply matters, the program must set a timeout on recvfrom() and send again itself when nothing comes back.",
    "Datagrams can be lost, duplicated or arrive out of order, and UDP will not say so. A UDP socket can also send to a broadcast address, such as 192.168.1.255, reaching every host on the LAN at once, which TCP cannot do.",
  ],
};
