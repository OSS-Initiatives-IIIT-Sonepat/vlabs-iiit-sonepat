import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Every network card has a 48-bit MAC address, set by its maker and written as six pairs of hex digits, such as 00-1A-2B-3C-4D-10. The first three pairs identify the maker. Ethernet frames are delivered by MAC address, but programs address each other by IP address. ARP connects the two.",
    "When a host wants to send to an IP address on its own network, it first looks in its ARP cache. If the address is not there, it broadcasts an ARP request to FF-FF-FF-FF-FF-FF: who has 192.168.1.12? Tell 192.168.1.10. The switch floods the broadcast to every port.",
    "Only the host that owns the address answers, with an ARP reply sent straight to the asker: 192.168.1.12 is at 00-1A-2B-3C-4D-12. Both hosts put each other in their ARP caches, and the waiting packet is sent. On Windows a dynamic entry stays for about 15 to 45 seconds after its last use, then is asked for again.",
    "A host never ARPs for an address outside its own network. For those it ARPs for its default gateway, and sends every remote packet in a frame addressed to the gateway's MAC.",
    "getmac and ipconfig /all show the host's own MAC address. arp -a lists the ARP cache with the type of each entry, dynamic or static. arp -d deletes entries, and a static entry can be added with netsh interface ipv4 add neighbors (or arp -s).",
    "ARP has no authentication: any host can send a reply claiming any IP address. This is the basis of ARP spoofing attacks, which managed switches stop with Dynamic ARP Inspection.",
  ],
};
