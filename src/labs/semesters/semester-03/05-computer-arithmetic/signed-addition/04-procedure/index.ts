import { type SceneProcedureStep } from "@/labs/experiments/types";
import { signedAdditionStepSchematics as fig } from "@/labs/schematics/semester-03/05-computer-arithmetic/signed-addition";

export const procedureSteps: SceneProcedureStep[] = [
  {
    label: "Read the two signs",
    body: "As is the sign of A and Bs is the sign of B. Write them down before you touch the magnitudes. In the check at the end, A is +6 so As = 0, and B is +3 so Bs = 0.",
    show: [],
    schematic: fig[0],
  },
  {
    label: "Compare the signs",
    body: "Ask whether As equals Bs. Equal signs mean the operation is an addition of magnitudes. Unequal signs mean you will add the complement of B instead, which subtracts.",
    show: [],
    schematic: fig[1],
  },
  {
    label: "Same sign: add the magnitudes",
    body: "0110 is the magnitude of 6 and 0011 is the magnitude of 3. Add them: EA = 1001. The result sign will be As, which is 0.",
    show: [],
    schematic: fig[2],
  },
  {
    label: "Different sign: add the complement",
    body: "If the signs had differed, EA would be A plus the two's complement of B. You do not take that branch for +6 and +3. The box is here so the other path is visible.",
    show: [],
    schematic: fig[3],
  },
  {
    label: "Test the end carry",
    body: "E is the carry out of the four magnitude bits. 0110 + 0011 = 1001, and nothing carries out, so E = 0. AVF is set only when the magnitude overflows.",
    show: [],
    schematic: fig[4],
  },
  {
    label: "Read +9",
    body: "As stays 0, EA is 1001, and AVF stays 0. The result is +9. Nine fits in four magnitude bits, which is why the overflow flag is clear.",
    show: [],
    schematic: fig[5],
  },
];
