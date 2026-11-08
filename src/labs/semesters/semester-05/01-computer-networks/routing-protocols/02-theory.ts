import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A router knows the networks attached to its own ports. To reach any other network it needs a route: the destination network, and the next router to send to. Routes come from the administrator (static routes) or from a routing protocol that the routers run among themselves (dynamic routes).",
    "A static route is typed by hand, such as ip route 192.168.3.0 255.255.255.0 10.0.13.2. It costs nothing to run and is fully predictable, but it never changes by itself: if the next hop fails, traffic is lost until someone fixes the route. Static routes suit small networks and default routes to the ISP.",
    "RIP (Routing Information Protocol) is a distance-vector protocol. Every 30 seconds each router sends its whole table to its neighbours, version 2 to the multicast address 224.0.0.9. The metric is the hop count, and 16 means unreachable. RIP counts routers, not speed, so it prefers one slow hop to two fast ones, and it can take minutes to settle after a change.",
    "OSPF (Open Shortest Path First) is a link-state protocol. Routers greet their neighbours with Hello packets to 224.0.0.5, swap descriptions of every link, and each builds the same map of the network. Each router then runs Dijkstra's shortest-path algorithm on that map. The metric is cost, by default 100 Mbit/s divided by the link's bandwidth: a gigabit link costs 1 and a 1.544 Mbit/s serial link costs 64. OSPF reacts to a failure within seconds.",
    "Every route has an administrative distance that says how much to trust its source: connected 0, static 1, OSPF 110, RIP 120. show ip route prints each route with a code (C, L, S, R, O), [distance/metric], and the next hop.",
    "In this network R1 can reach R3 directly over a slow serial link (1 hop) or through R2 over two gigabit links (2 hops). That one difference makes RIP and OSPF choose different paths.",
  ],
};
