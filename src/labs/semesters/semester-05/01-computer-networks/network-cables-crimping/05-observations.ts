import { type ObservationSection } from "@/labs/lab-content.types";

import {
  CABLE_TABLE_HEADERS,
  CABLE_TABLE_ROWS,
} from "@/labs/networks/network-cables";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The first cable had T568B at both ends. The tester lit the same pin on the remote as on the main unit, from 1 to 8, so each wire ran to the same pin at the other end.",
    "The second cable had T568B at End A and T568A at End B. The tester lit 3, 6, 1, 4, 5, 2, 7, 8 on the remote for pins 1 to 8 of the main unit. Only the orange and green pairs had changed places, and pins 4, 5, 7 and 8 stayed straight.",
    "A wire pushed short of the tip of the plug gave a dark LED, and the crimp had to be cut off and done again. Every pair stayed twisted to within about 1 cm of the plug.",
  ],
  table: {
    headers: CABLE_TABLE_HEADERS,
    rows: CABLE_TABLE_ROWS,
  },
};
