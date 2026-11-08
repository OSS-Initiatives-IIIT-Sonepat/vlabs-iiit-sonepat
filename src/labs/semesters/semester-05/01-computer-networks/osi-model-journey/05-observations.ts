import { type ObservationSection } from "@/labs/lab-content.types";

import { OSI_TABLE_HEADERS, OSI_TABLE_ROWS } from "@/labs/networks/osi";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "On the way down the laptop's stack, the data unit grew from 60 bytes to 148 bytes. Each layer added its block on the outside of what it was given. Ethernet was the only layer to add a block at the back as well, the FCS. The session layer added nothing.",
    "The switch read only the destination MAC and sent the frame on unchanged. The router removed the frame, lowered the TTL from 64 to 63, and sent the packet on in a new frame. Both MAC addresses changed at the router. Both IP addresses and both ports stayed the same from end to end.",
    "On the server, each layer removed exactly the block that the same layer had added on the laptop. The web server received the same 60 bytes the browser wrote.",
  ],
  table: {
    headers: OSI_TABLE_HEADERS,
    rows: OSI_TABLE_ROWS,
  },
};
