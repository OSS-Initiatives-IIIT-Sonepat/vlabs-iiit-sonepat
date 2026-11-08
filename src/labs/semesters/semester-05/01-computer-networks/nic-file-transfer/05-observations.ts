import { type ObservationSection } from "@/labs/lab-content.types";

import {
  NIC_TABLE_HEADERS,
  NIC_TABLE_ROWS,
} from "@/labs/networks/nic-lan-wlan";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "After the driver was installed, the NIC appeared under Network adapters, and ipconfig /all showed its MAC address. The link LED lit as soon as the cable reached the switch, at 1.0 Gbit/s.",
    "The two PCs pinged each other in under 1 ms, and the 100 MB file copied over the wired LAN in about 0.9 s, close to the 125 MB/s a gigabit link can carry.",
    "The laptops took their addresses from the Wi-Fi router by DHCP. They pinged each other in about 3 ms, and the same file took about 6.8 s, because every frame crossed the shared radio channel twice.",
  ],
  table: {
    headers: NIC_TABLE_HEADERS,
    rows: NIC_TABLE_ROWS,
  },
};
