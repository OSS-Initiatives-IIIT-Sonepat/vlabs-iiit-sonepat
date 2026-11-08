import { type ObservationSection } from "@/labs/lab-content.types";

import {
  TOPO_TABLE_HEADERS,
  TOPO_TABLE_ROWS,
} from "@/labs/networks/topologies";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "On the bus, a frame from B1 ran both ways along the backbone and reached every node. With the backbone cut, no node could reach any other.",
    "On the star, every frame went through the switch. With one cable pulled, only that PC was cut off.",
    "On the ring, data passed node to node in one direction. One broken link stopped all traffic on the single ring.",
    "The mesh of 4 routers needed 6 links. When the direct link failed, traffic took a path through another router.",
    "On the tree, traffic between branches went up through the core switch. With a branch's uplink cut, its hosts could still reach each other but nothing above.",
  ],
  table: {
    headers: TOPO_TABLE_HEADERS,
    rows: TOPO_TABLE_ROWS,
  },
};
