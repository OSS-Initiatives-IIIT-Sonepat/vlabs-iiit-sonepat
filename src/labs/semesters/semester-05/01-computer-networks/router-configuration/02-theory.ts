import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A Cisco router runs the IOS operating system and is set up from a text command line. A new router is reached through its console port with a console (rollover) cable and a terminal program set to 9600 baud, 8 data bits, no parity, 1 stop bit. In Packet Tracer the same is done by clicking the router and opening its CLI tab, or by cabling a PC's RS-232 port to the console port and using the PC's Terminal.",
    "IOS has a ladder of modes. User EXEC (Router>) allows only a few show commands. enable moves to privileged EXEC (Router#), where every show command, copy and reload work. configure terminal moves to global configuration (Router(config)#), where the router's settings are changed. interface g0/0 or line console 0 moves into the settings of one port or line. exit goes up one level and end goes straight back to privileged EXEC.",
    "Router ports are shut down until told otherwise. Each one needs an IP address and mask in the network it connects to, and the command no shutdown. Its link lights then turn green, and the router adds two routes to its table: a connected route (C) for the network and a local route (L) for its own address.",
    "The router's working setup, the running-config, lives in RAM and is lost at power-off. copy running-config startup-config saves it to NVRAM, so it loads again at the next start-up.",
    "Basic security: enable secret sets a hashed password for privileged mode, a password on line console 0 with login protects the console, service password-encryption hides the other passwords in the config, and a banner motd warns off unauthorised users.",
    "show ip interface brief lists every port with its address and its state (up/up when the cable is in and the port is on). show ip route prints the routing table. Hosts in each LAN use the router's port address as their default gateway.",
  ],
};
