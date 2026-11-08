import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ONE_CLIENT } from "@/labs/networks/rpc";
import { rpcFigure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "Describe the procedure in add.x",
  body: "Write the interface in add.x. It defines a struct for the two arguments and a program, ADD_PROG, with program number 0x23451111. Version 1 of it has one procedure, ADD, number 1, which takes the struct and returns an int.\n\nThe program number must be unique on the server. Numbers from 0x20000000 to 0x3FFFFFFF are free for user programs.",
  show: [],
  schematic: rpcFigure(["idl"]),
  net: {
    show: ONE_CLIENT,
    hot: ["client"],
    focus: ["client", "server"],
    consoles: [
      {
        at: "client",
        title: "add.x",
        lines: [
          "struct numbers { int a; int b; };",
          "program ADD_PROG {",
          "    version ADD_VERS {",
          "        int ADD(numbers) = 1;",
          "    } = 1;",
          "} = 0x23451111;",
        ],
      },
    ],
  },
};
