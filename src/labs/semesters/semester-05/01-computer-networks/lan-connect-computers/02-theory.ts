import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A local area network (LAN) joins computers in one room, floor or building, so they can share files, printers and an Internet connection. Almost every wired LAN today is switched Ethernet in a star: each computer has its own cable to a central switch.",
    "In a star, a fault in one cable cuts off only one computer, and a computer can be added or moved by patching one cable. The switch is the single point that all traffic passes through, so it must be powered and placed where every cable can reach it, within 100 m.",
    "Every computer on the LAN needs an IP address in the same network. With a /24 network such as 192.168.1.0/24, the first three numbers are the network and the last is the host, from 1 to 254. No two computers may share an address. A plan written before cabling keeps track of which computer has which address and switch port.",
    "Windows computers on a small LAN join a workgroup. Computers in the same workgroup show up together in the Network folder, as long as network discovery is on and the network is marked Private.",
    "ping checks that one host can reach another: it sends ICMP echo requests and waits for echo replies. A broadcast, such as an ARP request, is sent to every host on the LAN at once. Every PC on one switch is in the same broadcast domain.",
  ],
};
