import { type SceneProcedureStep } from "@/labs/experiments/types";

export const step: SceneProcedureStep = {
  label: "UP counter: add the MOD-5 reset gate.",
  body: "Use one gate of the **74HC00**. Connect $Q_A$ and $Q_C$ to its two inputs. Connect its output to the **CLR** inputs of all three flip-flops ($A$, $B$ and $C$). The gate output goes LOW when $Q_A = Q_C = 1$, which first happens at state 101. All flip-flops clear and the counter returns to 000. This gives $\\overline{CLR} = \\overline{Q_A \\cdot Q_C}$.",
  show: [],
};
