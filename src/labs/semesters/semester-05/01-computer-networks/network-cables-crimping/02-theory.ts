import { type TheorySection } from "@/labs/lab-content.types";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A network cable carries bits between two network cards as changes in voltage or in light. Three families of cable are in use: twisted pair, coaxial cable, and optical fibre.",
    "Twisted-pair cable has eight copper wires in four pairs. The two wires of a pair are twisted around each other, so noise picked up along the way lands equally on both. The receiver reads the difference between them, and the noise cancels. Unshielded twisted pair (UTP) relies on the twist alone. Shielded twisted pair (STP) adds a foil or braid around the pairs, for rooms with motors or heavy power cables. Cat 5e carries 1 Gbit/s and Cat 6 carries 1 Gbit/s, or 10 Gbit/s over short runs. A twisted-pair link is limited to 100 m.",
    "Coaxial cable has one copper core inside a plastic dielectric, a braided shield, and a jacket. It was used for the first Ethernet buses (10BASE5 and 10BASE2) and is still used for cable TV and cable modems.",
    "Optical fibre carries light in a glass core about 9 µm (single-mode) or 50 µm (multimode) across. The cladding around the core bends the light back inside. Fibre is not affected by electrical noise and reaches from hundreds of metres to many kilometres, so it links buildings and floors.",
    "A twisted-pair cable ends in an 8-pin RJ45 plug. The order of the eight colours in the plug is set by the TIA-568 standard, in two versions. T568B, from pin 1 to 8: white-orange, orange, white-green, blue, white-blue, green, white-brown, brown. T568A swaps the orange and green pairs: white-green, green, white-orange, blue, white-blue, orange, white-brown, brown.",
    "On 10 and 100 Mbit/s Ethernet a card sends on pins 1 and 2 and receives on pins 3 and 6. A PC and a switch use opposite pins, so a cable with the same standard at both ends (straight-through) joins them. Two PCs, or two switches, use the same pins, so the cable must swap 1-2 with 3-6. A cable with T568B at one end and T568A at the other (crossover) does that.",
    "Most cards made since about 2005 detect the pins by themselves (Auto-MDIX), and Gigabit Ethernet uses all four pairs in both directions. A crossover cable is still the textbook way to join two like devices, and the tester shows clearly what it does.",
    "A cable tester has a main unit and a remote unit. The main unit drives each pin in turn and the remote lights the pin that receives it. A straight-through cable lights 1-1, 2-2 and so on. A crossover lights 1-3, 2-6, 3-1 and 6-2. A dark LED is an open wire, and two LEDs at once are a short.",
  ],
};
