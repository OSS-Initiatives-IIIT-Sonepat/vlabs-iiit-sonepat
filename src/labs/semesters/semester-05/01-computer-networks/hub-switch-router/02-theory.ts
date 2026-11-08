import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A hub is a multiport repeater. It works at layer 1: whatever bits arrive on one port are copied out of every other port. It reads no address. All PCs on a hub share one channel, so they form one collision domain, and only one of them can send at a time.",
    "When two PCs on a hub send at once, their signals collide. Classic Ethernet handles this with CSMA/CD: listen before sending, detect a collision while sending, send a jam signal, wait a random back-off time, and try again. The more PCs there are, the more time is lost to collisions.",
    "A switch works at layer 2. It reads the source MAC address of each frame and records which port it came in on, in its MAC address table. It then sends each frame out of the one port where the destination MAC was learned. A frame for an unknown MAC, or for the broadcast address FF-FF-FF-FF-FF-FF, is flooded out of every port except the one it came in on.",
    "Each switch port is its own collision domain, and the link is full duplex, so collisions do not happen at all. But a switch still forwards broadcasts everywhere, so all its ports are one broadcast domain.",
    "A router works at layer 3. It joins different IP networks and forwards packets by their destination IP address, using its routing table. Each router interface has an address in the network it is attached to, and that address is the default gateway for the PCs there. A router does not forward broadcasts, so each interface is a separate broadcast domain.",
    "A router changes the frame at every hop: it removes the incoming Ethernet header, lowers the IP time-to-live by one, and builds a new frame for the next link. A hub and a switch leave the frame as it is.",
    "In Cisco Packet Tracer the same devices appear as Hub-PT, a 2960 switch and a 1941 or ISR router, and the steps below are the same on real hardware.",
  ],
};
