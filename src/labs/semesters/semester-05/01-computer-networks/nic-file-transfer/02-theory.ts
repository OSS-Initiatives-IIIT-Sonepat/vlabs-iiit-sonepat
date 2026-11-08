import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A network interface card (NIC) joins a computer to a network. It turns the frames the operating system builds into signals on a cable or radio waves, and back. Every NIC has a 48-bit MAC address burnt in by its maker, written as six pairs of hex digits such as 00-1A-2B-3C-4D-10.",
    "A wired NIC has an RJ45 socket and speaks Ethernet (IEEE 802.3) over twisted pair. A desktop NIC is a card in a PCIe slot, and most motherboards also have one built in. Two LEDs beside the socket show the link: one lights when the cable reaches a powered port, the other blinks with traffic.",
    "A wireless NIC speaks Wi-Fi (IEEE 802.11) to an access point over radio in the 2.4 GHz or 5 GHz band. It may be built into a laptop, a PCIe card with antennas, or a USB dongle. The access point announces a network name, the SSID, and the NIC joins it with a pass phrase. WPA2 or WPA3 encrypts every frame on the air.",
    "The operating system needs a driver to use the card. On Windows the card appears in Device Manager under Network adapters once its driver is installed, and ipconfig /all lists its MAC address and IP settings.",
    "On a switched wired LAN each PC has its own full-duplex link to the switch, so both directions run at full speed at once. On Wi-Fi all stations in a cell share one channel and take turns. A file between two laptops crosses the air twice, laptop to access point and access point to laptop, so it moves much more slowly than the link rate printed on the box.",
    "Windows shares folders with the SMB protocol on TCP port 445. One PC shares a folder, and the other opens it by name or address, such as \\\\192.168.10.2\\Lab, and copies files as if it were a local drive. Both PCs must be in the same network, or reach each other through a router, and the firewall must allow File and Printer Sharing.",
  ],
};
