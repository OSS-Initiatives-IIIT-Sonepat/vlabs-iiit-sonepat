import { type SceneProcedureStep } from "@/labs/experiments/types";
import { osiFigure } from "@/labs/schematics/semester-05/01-computer-networks/osi-model-journey";
import { OSI_OVERVIEW } from "@/labs/networks/osi";

export const step: SceneProcedureStep = {
  label: "The bench",
  body: "Two stacks of seven floors stand at the ends of the bench. The left one is the laptop, 192.168.1.10. The right one is the web server, 203.0.113.10. Each floor is one layer of the OSI model, Application at the top and Physical at the bottom. Between the stacks, one cable runs through a switch and a router.\n\nThe browser on the laptop is about to ask the server for its home page. The request starts on the top floor of the laptop, goes down all seven floors, crosses the cables as bits, and climbs the seven floors of the server. On the way down every floor wraps the data in one more block. On the way up every floor reads its own block and removes it.\n\nOn each step the data unit sits on the floor the step is about, and the new block drops onto it. The orange line is the path the request has taken so far. From the next step, the table in the corner fills in one row per floor.",
  show: [],
  schematic: osiFigure(),
  osi: OSI_OVERVIEW,
};
