import { type ObservationTable } from "@/labs/lab-content.types";

/**
 * The rows of an observation table revealed so far.
 * Pass a larger `count` on the next procedure step and the card grows.
 */
export function revealedTable(
  headers: string[],
  rows: (string | number)[][],
  count: number,
): ObservationTable {
  return { headers, rows: rows.slice(0, count) };
}
