import { type TheorySection } from "@/labs/lab-content.types";
import { step03 as circuitDiagram } from "@/labs/schematics/semester-01/03-FEE/kirchhoff-laws";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Kirchhoff's Current Law (KCL): the algebraic sum of all currents entering and leaving any node is zero " +
      "($\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$). " +
      "This is a direct consequence of conservation of electric charge.",

    "Kirchhoff's Voltage Law (KVL): the algebraic sum of all potential differences around any closed loop is zero " +
      "($\\sum V = 0$). This follows from conservation of energy — a charge carrier traversing a closed loop " +
      "returns to its starting potential.",

    "Together KCL and KVL form the foundation for mesh analysis, nodal analysis, superposition, " +
      "and Thevenin/Norton equivalents. They hold for any network — DC or AC, linear or nonlinear — " +
      "as long as the lumped-circuit assumption is valid.",

    "In this experiment a resistor network with two DC sources is built. " +
      "Currents at each node and voltages around each loop are measured. " +
      "The algebraic sums are confirmed to be zero within experimental error.",
  ],
  circuitDiagram,
};
