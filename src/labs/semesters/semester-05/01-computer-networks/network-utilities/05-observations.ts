import { type ObservationSection } from "@/labs/lab-content.types";

import {
  UTIL_TABLE_HEADERS,
  UTIL_TABLE_ROWS,
} from "@/labs/networks/net-utilities";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The router took 203.0.113.45 from the ISP, and the client took 192.168.1.10 from the router in four DHCP messages.",
    "ping 8.8.8.8 got four replies in about 14 ms, and nslookup turned www.example.com into 198.51.100.20.",
    "tracert listed four hops: the router, the ISP's router, a router in the Internet's core, and the web server. Each hop answered the probe whose TTL ran out there.",
    "netstat -an showed an ESTABLISHED connection from a local port to 198.51.100.20:443 while the site was open.",
    "With the cable out, ipconfig reported Media disconnected. With a wrong DNS server, ping by address worked but ping by name failed.",
  ],
  table: {
    headers: UTIL_TABLE_HEADERS,
    rows: UTIL_TABLE_ROWS,
  },
};
