import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A request crosses a network by being wrapped once per layer on the sender and unwrapped once per layer on the receiver. Each layer solves one problem and writes one block for its peer on the other machine: the port for the program, the IP address for the machine, the MAC address for the next box on the cable, and bits for the cable itself.",
    "Devices in the middle only open the data unit as far as their job needs. A switch reads layer 2. A router reads layer 3 and rebuilds layer 2 for the next link. That is why MAC addresses change at every hop and IP addresses do not.",
    "The OSI model names seven jobs, even where the Internet's protocols merge some of them, as TLS does for the session and presentation layers. When a network fails, the same layers give the order in which to check it: the cable, the link, the route, the port, and then the application.",
  ],
};
