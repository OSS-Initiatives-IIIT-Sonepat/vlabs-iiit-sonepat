import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Server, Application: read the request",
  body: "The web server reads GET / HTTP/1.1 and Host: www.example.com, finds the home page, and starts a response that begins HTTP/1.1 200 OK. The response goes down the server's seven floors, through the router and the switch, and up the laptop's seven floors, by the same steps in the other direction.\n\nOf the 148 bytes that crossed each cable, 60 were the request. The other 88 were blocks, each written by one floor and read by the matching floor on the other side. The application never saw any of them.",
  show: [],
  schematic: osiFigure("application"),
  osi: {
    device: "server",
    layer: 7,
    blocks: ["data"],
    focus: ["data"],
    arrived: true,
    note: {
      title: "GET / delivered",
      text: "The web server reads the same 60 bytes the browser wrote, and starts the reply.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 7),
};
