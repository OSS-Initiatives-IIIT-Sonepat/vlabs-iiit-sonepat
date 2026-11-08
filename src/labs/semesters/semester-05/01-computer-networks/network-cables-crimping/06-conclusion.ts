import { type ConclusionSection } from "@/labs/lab-content.types";

export const conclusion: ConclusionSection = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "A straight-through and a crossover cable are the same cable with a different colour order at one end. The T568B and T568A orders differ only by the orange and green pairs, which are the pairs on pins 1-2 and 3-6.",
    "A straight-through cable joins unlike devices, such as a PC and a switch. A crossover joins like devices, such as two PCs, when the cards cannot swap their pins themselves. A cable tester shows which kind a cable is, and finds open or shorted wires before the cable goes into a wall.",
    "Twisted pair is cheap and quick to terminate for runs up to 100 m. Coaxial cable remains in cable TV networks, and fibre is used where the distance or the noise is too great for copper.",
  ],
};
