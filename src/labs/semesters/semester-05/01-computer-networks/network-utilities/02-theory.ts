import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A home or lab network reaches the Internet through a router. Its WAN port connects to the Internet service provider (ISP), which gives it a public address. Its LAN side hands out private addresses, such as 192.168.1.x, to the computers by DHCP, and translates them to the public address on the way out (NAT).",
    "DHCP gives a client its settings in four messages: Discover (the client broadcasts, asking for a server), Offer (the server offers an address), Request (the client asks for that address), and Acknowledge (the server confirms it, with a lease time). The client also learns its mask, gateway and DNS server.",
    "ipconfig shows the client's settings. ipconfig /all adds the MAC address, DHCP server, lease and DNS servers. ipconfig /release and /renew give the address back and ask for a new one.",
    "ping sends ICMP echo requests and waits for echo replies. It shows whether a host can be reached, the round-trip time, and the TTL of the reply, which hints at how many routers the reply crossed.",
    "tracert (traceroute on Linux) finds every router on the path. It sends probes with TTL 1, 2, 3 and so on. Each router lowers the TTL by one, and the router where it reaches zero drops the probe and sends back an ICMP Time Exceeded message, revealing its address. The last probe reaches the destination itself.",
    "netstat lists the TCP connections and listening ports on the computer: netstat -an shows them with numeric addresses, and the state of each, such as LISTENING or ESTABLISHED. nslookup asks the DNS server for the address of a name.",
    "Faults are found fastest from the bottom up: link (is the cable in?), address (ipconfig), gateway (ping 192.168.1.1), Internet (ping 8.8.8.8), and names (nslookup or ping by name).",
  ],
};
