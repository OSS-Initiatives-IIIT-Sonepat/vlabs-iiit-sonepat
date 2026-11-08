import { type SceneProcedureStep } from "@/labs/experiments/types";
import { revealedTable } from "@/labs/experiments/reveal-table";
import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "Application: write the request",
  body: "The browser writes an HTTP request. GET asks for a resource, / is the home page, and HTTP/1.1 is the version. The Host line names the site, www.example.com, because one server can hold many sites. Accept says the browser wants HTML. A blank line ends the request.\n\nEach line ends with a carriage return and a line feed, so the request is 60 bytes. This is the only part of the data unit the user cares about. Every block added below it exists to deliver these 60 bytes to the right program on the right machine.\n\nThe browser already knows where the server is. A DNS lookup turned www.example.com into 203.0.113.10 before this request was written.",
  show: [],
  osi: {
    device: "laptop",
    layer: 7,
    blocks: ["data"],
    focus: ["data"],
    note: {
      title: "HTTP request · 60 B",
      text: "Three header lines and a blank line. Nothing here says how the bytes will travel.",
    },
  },
  table: revealedTable(OSI_TABLE_HEADERS, OSI_TABLE_ROWS, 1),
};
