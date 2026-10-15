import { type TheorySection } from "@/labs/lab-content.types";
import { s2GateMinimizationTheoryDiagram } from "@/labs/schematics/s2-gate-minimization-schematics";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "Gate-level minimization is the process of finding a logic network for a Boolean function that uses as few gates and gate inputs (literals) as possible. A cheaper network needs less hardware, less board area and less power. Minimization can be done with Boolean algebra or, for functions of up to four or five variables, graphically with a Karnaugh map (K-map).",
    "A K-map arranges the minterms of a function in Gray-code order, so that physically adjacent cells differ in exactly one variable. A group of $2^k$ adjacent 1s can be merged into one product term in which $k$ variables are eliminated. For the function used here, $F(A,B,C) = \\sum m(5,6,7)$, the canonical sum of products is $F = AB'C + ABC' + ABC$, which needs nine literals.",
    "On the map, cells 6 and 7 form a pair in which $A = 1$ and $B = 1$ are constant, giving the term $AB$. Cells 5 and 7 form a second pair in which $A = 1$ and $C = 1$ are constant, giving the term $AC$. Cell 7 is used in both groups, which is allowed. The minimized sum of products is $F = AB + AC$, which needs four literals.",
    "A **two-level implementation** has only two levels of gates between the inputs and the output. For a sum of products this is an AND level that forms the product terms, followed by an OR level that adds them (AND-OR). The network for $F = AB + AC$ uses two AND gates and one OR gate: 3 gates, 4 literals and 6 gate inputs. Its delay is two gate delays, and the structure is regular and easy to design. The same network can be built with NAND gates only (NAND-NAND).",
    "A **multi-level implementation** reduces cost further by factoring common literals out of the expression so that gate outputs feed other gates through more levels. Factoring $A$ out of $F = AB + AC$ gives $F = A(B + C)$. The network needs one OR gate for $B + C$ and one AND gate that combines the result with $A$: 2 gates, 3 literals and 4 gate inputs. Cost is therefore saved in gates and wiring.",
    "The trade-off of multi-level design is speed and design effort. Each extra level adds one gate propagation delay, so the delay is roughly the number of levels multiplied by the delay of one gate, and multi-level networks are harder to design and analyse than two-level ones. In this small example the factored circuit is still two gates deep, so the saving comes without a delay penalty. For larger functions, factoring increases the depth.",
    "Both networks realise the same function, so their truth tables must be identical. The output is 1 only when $A = 1$ and at least one of $B$ and $C$ is 1, which is 3 of the 8 input combinations. Comparing the two LED outputs for every input combination verifies the equivalence.",
  ],
  circuitDiagram: s2GateMinimizationTheoryDiagram,
};
