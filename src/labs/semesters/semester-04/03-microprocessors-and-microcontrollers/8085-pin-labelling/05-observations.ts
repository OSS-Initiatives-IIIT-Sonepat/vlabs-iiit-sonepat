import { type ObservationSection } from "@/labs/lab-content.types";

import { PIN_TABLE_HEADERS, PIN_TABLE_ROWS } from "@/labs/mpu8085/steps";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The package has 40 pins. Pin 1 is at the notch. Pins 1 to 20 run away from the notch, and pins 21 to 40 run back toward it. VCC is pin 40 and VSS is pin 20.",
    "AD0 to AD7 carry the low address in T1 and the data byte afterwards. ALE is what lets an external latch keep that address. A8 to A15 stay an address for the whole cycle. RD and WR say when the byte moves. IO/M, S1, and S0 say what kind of cycle it is. READY can stretch it.",
    "RESET OUT repeats RESET IN for the other chips. INTA answers only INTR. HLDA answers HOLD. SOD and SID are single bits moved by SIM and RIM, not a second data bus.",
  ],
  table: {
    headers: PIN_TABLE_HEADERS,
    rows: PIN_TABLE_ROWS,
  },
};
