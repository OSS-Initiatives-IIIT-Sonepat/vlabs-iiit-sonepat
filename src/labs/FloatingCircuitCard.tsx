"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

type Offset = { x: number; y: number };

type DragSession = {
  pointerId: number;
  startX: number;
  startY: number;
  orig: Offset;
  anchorLeft: number;
  anchorTop: number;
  cardW: number;
  cardH: number;
  boundsW: number;
  boundsH: number;
};

function clampOffset(raw: Offset, session: DragSession): Offset {
  const pad = 12;
  return {
    x: Math.max(pad - session.anchorLeft, Math.min(raw.x, session.boundsW - session.cardW - pad - session.anchorLeft)),
    y: Math.max(pad - session.anchorTop, Math.min(raw.y, session.boundsH - session.cardH - pad - session.anchorTop)),
  };
}

export function FloatingCircuitCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragSession | null>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !cardRef.current) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const card = cardRef.current;
    const parent = card.offsetParent as HTMLElement | null;
    const pr = parent?.getBoundingClientRect() ?? { left: 0, top: 0, width: innerWidth, height: innerHeight };
    const cr = card.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, orig: offset,
      anchorLeft: cr.left - offset.x - pr.left, anchorTop: cr.top - offset.y - pr.top,
      cardW: cr.width, cardH: cr.height, boundsW: pr.width, boundsH: pr.height,
    };
    setDragging(true);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    setOffset(clampOffset({ x: d.orig.x + e.clientX - d.startX, y: d.orig.y + e.clientY - d.startY }, d));
  };
  const onEnd = (e: PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={cardRef}
      className={`absolute z-[99] flex flex-col overflow-hidden ${dragging ? "select-none" : ""}`}
      style={{
        right: 24,
        bottom: 24,
        width: 300,
        maxHeight: 280,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        borderRadius: 10,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {/* drag handle */}
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: dragging ? "grabbing" : "grab",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "#fafafa",
          touchAction: "none",
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onEnd}
        onPointerCancel={onEnd}
      >
        {/* 3 grip dots */}
        <span style={{ display: "flex", gap: 3 }}>
          <span style={{ width: 4, height: 4, borderRadius: 2, background: "#ccc" }} />
          <span style={{ width: 4, height: 4, borderRadius: 2, background: "#ccc" }} />
          <span style={{ width: 4, height: 4, borderRadius: 2, background: "#ccc" }} />
        </span>
      </div>

      {/* body */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
