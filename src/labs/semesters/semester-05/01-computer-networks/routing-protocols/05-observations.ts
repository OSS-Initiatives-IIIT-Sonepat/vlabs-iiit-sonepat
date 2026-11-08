import { type ObservationSection } from "@/labs/lab-content.types";

import {
  ROUTING_TABLE_HEADERS,
  ROUTING_TABLE_ROWS,
} from "@/labs/networks/routing";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "With only connected routes, R1 had no route to 192.168.3.0 and dropped PC A's packets. Two static routes, one on each end, made the ping work over the serial link, and the ping failed again as soon as that link went down.",
    "With RIP v2, R1 learned 192.168.3.0 as R [120/1] via 10.0.13.2: one hop over the 1.544 Mbit/s serial link, although a gigabit path existed.",
    "With OSPF, R1 learned O [110/3] via 10.0.12.2: three gigabit links of cost 1, against 64 + 1 = 65 over the serial link.",
    "When the R1–R2 link was shut down, OSPF moved the route to the serial link, O [110/65], within a few seconds, and the ping lost at most one or two replies.",
  ],
  table: {
    headers: ROUTING_TABLE_HEADERS,
    rows: ROUTING_TABLE_ROWS,
  },
};
