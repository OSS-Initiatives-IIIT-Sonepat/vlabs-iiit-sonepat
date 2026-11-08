import { type ObservationSection } from "@/labs/lab-content.types";

import { FTP_TABLE_HEADERS, FTP_TABLE_ROWS } from "@/labs/networks/ftp-print";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "The client logged in to the FTP server over the control connection on port 21, with the password sent in clear text.",
    "Each LIST, RETR and STOR opened a new data connection to a passive port given in the server's 227 reply, and ended with 226 Transfer complete.",
    "Once the printer was shared, the client added \\\\PRINTSRV\\LabPrinter, took the driver from the print server, and printed a test page through the print server's queue.",
  ],
  table: {
    headers: FTP_TABLE_HEADERS,
    rows: FTP_TABLE_ROWS,
  },
};
