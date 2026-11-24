import { type SceneProcedureStep } from "@/labs/experiments/types";

import { SHOW } from "../components";

export const step: SceneProcedureStep = {
  label: "Generalise: determine D0, D1 for any function",
  body: "For an arbitrary 2-variable function f(A,B), write the truth table and read off: D0 = f evaluated with A=0 (a function of B alone); D1 = f evaluated with A=1 (a function of B alone). If D0 or D1 evaluates to a constant {0,1} or to B or B', wire accordingly. This procedure generalises to any n-variable function using a 2^(n-1):1 MUX with one variable as the data inputs. Demonstrate with NAND(A,B) as an additional exercise.",
  show: SHOW.xor,
  activeInputs: {
    A: 0,
    B: 0,
  },
};
