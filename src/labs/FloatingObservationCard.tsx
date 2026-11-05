"use client";

import { useEffect, useRef } from "react";

import { type ObservationTable } from "@/labs/lab-content.types";
import { MathText } from "@/ui/Math";

/**
 * Sits above the bottom-right schematic card. Each procedure step passes
 * the rows revealed so far, so the table grows as the learner advances.
 */
export function FloatingObservationCard({
  table,
  bottom,
}: {
  table: ObservationTable;
  bottom: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [table.rows.length]);

  const last = table.rows.length - 1;

  return (
    <div
      className="absolute z-[98] flex flex-col overflow-hidden"
      style={{
        right: 24,
        bottom,
        width: 360,
        maxHeight: 220,
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: 32,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          padding: "0 12px",
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#737373",
        }}
      >
        Observations
      </div>
      <div ref={scroller} style={{ overflow: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: 12,
          }}
        >
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "#fff",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    color: "#737373",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    textAlign: "left",
                    padding: "6px 8px",
                  }}
                >
                  <MathText text={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr
                key={ri}
                className={ri === last ? "observation-row-in" : undefined}
                style={{
                  background: ri === last ? "#eff6ff" : "transparent",
                }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    style={{
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      color: "#171717",
                      padding: "6px 8px",
                      fontWeight: ri === last ? 600 : 400,
                    }}
                  >
                    <MathText text={String(cell)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
