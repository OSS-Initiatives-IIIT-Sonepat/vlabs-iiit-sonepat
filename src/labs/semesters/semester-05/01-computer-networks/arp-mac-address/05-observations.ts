import { type ObservationSection } from "@/labs/lab-content.types";

import { ARP_TABLE_HEADERS, ARP_TABLE_ROWS } from "@/labs/networks/arp";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "getmac and ipconfig /all both gave PC A's MAC address as 00-1A-2B-3C-4D-10.",
    "Before the first ping, PC A's ARP cache held no entry for 192.168.1.12. The ARP request went to every host, and only PC C replied, straight to PC A.",
    "After the reply, arp -a showed 192.168.1.12 at 00-1A-2B-3C-4D-12, type dynamic, and the ping went ahead.",
    "Pinging 8.8.8.8 added an entry for the gateway 192.168.1.1, not for 8.8.8.8. A static entry stayed in the cache and needed no request.",
  ],
  table: {
    headers: ARP_TABLE_HEADERS,
    rows: ARP_TABLE_ROWS,
  },
};
