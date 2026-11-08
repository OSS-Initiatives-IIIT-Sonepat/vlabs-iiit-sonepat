import { type ObservationSection } from "@/labs/lab-content.types";

import {
  HSR_TABLE_HEADERS,
  HSR_TABLE_ROWS,
} from "@/labs/networks/hub-switch-router";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A frame from PC 1 to PC 3 came out of every hub port, so PC 2 received it too and threw it away. When PC 1 and PC 2 sent together, the frames collided and both had to back off and resend.",
    "The switch's MAC table started empty. The first frame from PC 4 was flooded, and the switch learned PC 4's port. PC 6's reply went to PC 4's port only, and after it the table held both MACs.",
    "The two rooms could not reach each other until the router's ports had addresses and the PCs had a default gateway. PC 1 then pinged PC 6, with the TTL lowered by one at the router.",
  ],
  table: {
    headers: HSR_TABLE_HEADERS,
    rows: HSR_TABLE_ROWS,
  },
};
