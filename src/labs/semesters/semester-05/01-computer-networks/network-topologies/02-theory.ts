import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A network's topology is the pattern of its links: which node is cabled to which. The physical topology is how the cables run; the logical topology is how the signals flow, and the two can differ.",
    "In a bus, every node taps into one shared cable, the backbone, with a terminator at each end to stop the signal reflecting back. A frame from any node travels both ways along the whole bus and every node hears it. A bus needs little cable, but one break in the backbone brings down the whole network, and only one node can send at a time.",
    "In a star, every node has its own cable to a central switch or hub. A broken cable cuts off only one node, and nodes are easy to add, but the centre is a single point of failure. Almost every wired LAN today is a star around a switch.",
    "In a ring, each node is cabled to the next and the last to the first. Data goes round in one direction, often with a token that gives one node at a time the right to send, as in Token Ring and FDDI. One break stops a single ring, so real rings such as FDDI and SONET use two rings in opposite directions.",
    "In a full mesh, every node is cabled to every other: n nodes need n(n − 1)/2 links, so 4 nodes need 6. There is always another path when a link fails, which is why the Internet's core routers are richly meshed, but the cost of cables and ports grows fast.",
    "A tree is a hierarchy of stars: a core switch at the root, distribution switches below it, and the hosts on the leaves. It scales to a whole campus, but a failure in a branch cuts off everything below it.",
    "In Packet Tracer each topology is built by placing the devices and choosing the cable for each link; the simulation mode then shows each frame moving, which is what the room shows here.",
  ],
};
