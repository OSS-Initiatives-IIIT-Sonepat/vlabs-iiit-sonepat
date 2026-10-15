import { type TheorySection } from "@/labs/lab-content.types";
import { step03 as circuitDiagram } from "@/labs/schematics/ohms-law-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  circuitDiagram,
  paragraphs: [
    "Ohm's Law states that the current $I$ flowing through a conductor is directly proportional to the " +
      "potential difference $V$ applied across it, provided temperature and other physical conditions " +
      "remain constant: $V = IR$, where $R$ is resistance in ohms ($\\Omega$).",

    "The V-I characteristic of an ohmic conductor is a straight line through the origin. " +
      "The slope gives resistance: $R = \\Delta V / \\Delta I$. " +
      "Resistance depends on material (resistivity $\\rho$), length $L$, and cross-sectional area $A$: " +
      "$R = \\rho L / A$.",

    "Standard colour-coded resistors carry a tolerance ($\\pm 1\\%$, $\\pm 5\\%$, etc.) that limits " +
      "how closely the nominal value matches the actual resistance. " +
      "Plotting $V$ (y-axis) vs $I$ (x-axis) and computing the slope verifies Ohm's Law " +
      "and the percentage deviation from the nominal value.",

    "In this experiment a known resistor is connected in series with a milliammeter and a variable " +
      "DC supply. Voltage is measured across the resistor for several supply settings, yielding " +
      "a linear V-I graph whose slope equals $R$, thereby verifying Ohm's Law.",
  ],
};
