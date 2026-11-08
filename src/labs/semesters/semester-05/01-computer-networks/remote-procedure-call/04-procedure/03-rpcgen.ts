import { type SceneProcedureStep } from "@/labs/experiments/types";
import { ONE_CLIENT } from "@/labs/networks/rpc";
import { rpcFigure } from "@/labs/schematics/semester-05/01-computer-networks/rpc";

export const step: SceneProcedureStep = {
  label: "Generate the stubs with rpcgen",
  body: "Run rpcgen -a -C add.x. It writes add.h, the client stub add_clnt.c, the server stub add_svc.c, the XDR routines add_xdr.c, and templates for the client and the server code.\n\nIn add_server.c fill in add_1_svc(): add the two numbers and return a pointer to the result. In add_client.c, call add_1() with 5 and 7. Build both with make -f Makefile.add.",
  show: [],
  schematic: rpcFigure(["cstub", "sstub", "idl"]),
  net: {
    show: ONE_CLIENT,
    hot: ["client", "server"],
    focus: ["client", "server"],
    consoles: [
      {
        at: "server",
        title: "add_server.c",
        lines: [
          "int *add_1_svc(numbers *argp, struct svc_req *rq)",
          "{",
          "    static int result;",
          "    result = argp->a + argp->b;",
          "    return &result;",
          "}",
        ],
      },
    ],
  },
};
