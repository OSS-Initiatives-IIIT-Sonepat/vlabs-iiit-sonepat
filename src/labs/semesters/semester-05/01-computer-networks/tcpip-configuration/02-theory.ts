import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Every host on a TCP/IP network needs three settings to reach other hosts: an IP address, a subnet mask, and a default gateway. A fourth, the DNS server, is needed to use names instead of addresses.",
    "An IPv4 address is 32 bits, written as four decimal numbers from 0 to 255, such as 192.168.1.10. Part of it names the network and the rest names the host on that network.",
    "The subnet mask says where the split is. 255.255.255.0 is 24 one-bits followed by 8 zero-bits, written /24. The host ANDs its address with the mask to get its network: 192.168.1.10 AND 255.255.255.0 = 192.168.1.0. A /24 network has 256 addresses: the first (.0) names the network, the last (.255) is the broadcast address, and .1 to .254 are for hosts.",
    "Before sending a packet the host ANDs the destination with the same mask. If the result is its own network, the destination is local and the host sends the frame straight to it. If not, the host sends the frame to its default gateway, the router on its network, which forwards it on.",
    "Without a gateway a host can reach only its own network. With a wrong mask it makes the wrong choice: it may try to reach a remote host directly and get no answer, or send a local host's traffic to the router.",
    "When a Windows PC is set to obtain an address automatically and no DHCP server answers, it gives itself an address from 169.254.0.0/16 (APIPA). Such an address works only with other APIPA hosts, and is a sign that DHCP has failed.",
    "Settings are entered in the adapter's Internet Protocol Version 4 (TCP/IPv4) properties, or with netsh, and checked with ipconfig /all.",
  ],
};
