import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "In a peer-to-peer network every computer is equal. Each one shares its own files and printers and uses the others', and there is no server in charge of accounts or storage. A Windows workgroup is a peer-to-peer network. It suits a handful of computers; beyond about ten, a client-server network with a domain controller is easier to manage.",
    "The smallest network is two PCs and one cable. Two NICs of the same kind send on the same pair of wires, so a direct cable must be a crossover, unless both NICs support Auto-MDIX. Both PCs need an address in the same network.",
    "A switch lets more PCs join. Each PC uses a straight-through cable to the switch. The switch forwards frames between ports by MAC address and does not change them, so the two PCs still see each other as being on the same network, and the IP packet arrives with its TTL unchanged.",
    "A router joins two different networks. Each PC is in its own network and needs the router's address on that network as its default gateway. The router forwards the packet from one network to the other and lowers its TTL by one. Windows sends with TTL 128, so a ping that crosses one router comes back with TTL 127.",
    "Peer-to-peer file sharing works the same in all three cases: one PC shares a folder, and the other opens it by address with net use or File Explorer, over SMB on TCP port 445.",
  ],
};
