import type { SchematicData } from "@/labs/CircuitSchematic";
import { type NetFrame } from "@/labs/networks/bench";
import { RCLI_BENCH } from "@/labs/networks/router-cli";

import { cliFigure, netFigure } from "./net-figures";

export const figure = (frame: NetFrame, title?: string): SchematicData =>
  netFigure(RCLI_BENCH, frame, title);

export const theoryDiagram = figure({}, "R1 between LAN 10 and LAN 20");

export type IosMode = "user" | "priv" | "global" | "iface" | "line";

type Line = { text: string; tone?: "input" | "output" };

const UP_TO: Record<IosMode, Line[]> = {
  user: [
    { text: "Press RETURN to get started!", tone: "output" },
    { text: "R1>" },
  ],
  priv: [{ text: "R1>enable" }, { text: "R1#" }],
  global: [
    { text: "R1>enable" },
    { text: "R1#configure terminal" },
    {
      text: "Enter configuration commands, one per line.  End with CNTL/Z.",
      tone: "output",
    },
    { text: "R1(config)#" },
  ],
  iface: [
    { text: "R1>enable" },
    { text: "R1#configure terminal" },
    {
      text: "Enter configuration commands, one per line.  End with CNTL/Z.",
      tone: "output",
    },
    { text: "R1(config)#interface g0/0" },
    { text: "R1(config-if)#" },
  ],
  line: [
    { text: "R1>enable" },
    { text: "R1#configure terminal" },
    {
      text: "Enter configuration commands, one per line.  End with CNTL/Z.",
      tone: "output",
    },
    { text: "R1(config)#line console 0" },
    { text: "R1(config-line)#" },
  ],
};

const MODE_NAME: Record<IosMode, string> = {
  user: "User EXEC",
  priv: "Privileged EXEC",
  global: "Global configuration",
  iface: "Interface configuration",
  line: "Line configuration",
};

/** R1's CLI tab, with the commands that reach mode `hot` typed in. */
export function modesFigure(hot: IosMode): SchematicData {
  return cliFigure(
    "R1",
    UP_TO[hot],
    `${MODE_NAME[hot]} mode · exit goes up one level · end returns to R1#`,
  );
}
