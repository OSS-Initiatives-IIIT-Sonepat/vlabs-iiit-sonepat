"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type PointerEvent as RPointerEvent,
  type ReactNode,
  type WheelEvent as RWheelEvent,
} from "react";

/* ================================================================
   Utility types
   ================================================================ */

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
    x: Math.max(
      pad - session.anchorLeft,
      Math.min(raw.x, session.boundsW - session.cardW - pad - session.anchorLeft),
    ),
    y: Math.max(
      pad - session.anchorTop,
      Math.min(raw.y, session.boundsH - session.cardH - pad - session.anchorTop),
    ),
  };
}

/* ================================================================
   Inline SVG icons
   ================================================================ */

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M8.5 1.5H12.5V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 12.5H1.5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 1.5L8 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M1.5 12.5L6 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 7H9M7 5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ================================================================
   PanZoomCanvas — React-Flow-style pan & zoom wrapper
   ================================================================ */

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 4;
const ZOOM_SENSITIVITY = 0.002;

function PanZoomCanvas({
  children,
  resetKey,
}: {
  children: ReactNode;
  /** Change this value to reset pan/zoom (e.g. on step change). */
  resetKey?: string | number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Offset>({ x: 0, y: 0 });
  const panSession = useRef<{ pointerId: number; startX: number; startY: number; orig: Offset } | null>(null);
  const [panning, setPanning] = useState(false);

  // Reset when step changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [resetKey]);

  const onPointerDown = useCallback((e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    panSession.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      orig: pan,
    };
    setPanning(true);
  }, [pan]);

  const onPointerMove = useCallback((e: RPointerEvent<HTMLDivElement>) => {
    const s = panSession.current;
    if (!s || s.pointerId !== e.pointerId) return;
    setPan({
      x: s.orig.x + (e.clientX - s.startX),
      y: s.orig.y + (e.clientY - s.startY),
    });
  }, []);

  const onPointerUp = useCallback((e: RPointerEvent<HTMLDivElement>) => {
    const s = panSession.current;
    if (!s || s.pointerId !== e.pointerId) return;
    panSession.current = null;
    setPanning(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const onWheel = useCallback((e: RWheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Cursor position relative to the container
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const delta = -e.deltaY * ZOOM_SENSITIVITY;
    setZoom((prevZoom) => {
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZoom * (1 + delta)));
      const scale = newZoom / prevZoom;
      // Zoom toward cursor: adjust pan so the point under cursor stays fixed
      setPan((prevPan) => ({
        x: cx - scale * (cx - prevPan.x),
        y: cy - scale * (cy - prevPan.y),
      }));
      return newZoom;
    });
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const isTransformed = zoom !== 1 || pan.x !== 0 || pan.y !== 0;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        cursor: panning ? "grabbing" : "grab",
        touchAction: "none",
        userSelect: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <div
        style={{
          transformOrigin: "0 0",
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {children}
      </div>

      {/* Reset / fit-to-view button — only visible when panned or zoomed */}
      {isTransformed && (
        <button
          onClick={(e) => { e.stopPropagation(); resetView(); }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Reset view"
          title="Fit to view"
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.9)",
            color: "#737373",
            cursor: "pointer",
            transition: "all 150ms",
            zIndex: 2,
            backdropFilter: "blur(4px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.color = "#171717";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.9)";
            e.currentTarget.style.color = "#737373";
          }}
        >
          <FitIcon />
        </button>
      )}

      {/* Zoom level indicator */}
      {zoom !== 1 && (
        <span
          style={{
            position: "absolute",
            bottom: 7,
            left: 8,
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 9,
            color: "#a3a3a3",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
          }}
        >
          {Math.round(zoom * 100)}%
        </span>
      )}
    </div>
  );
}

/* ================================================================
   Expanded overlay (center of screen, with blur)
   ================================================================ */

function ExpandedSchematicOverlay({
  children,
  stepIndex,
  totalSteps,
  onPrev,
  onNext,
  onClose,
}: {
  children: ReactNode;
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/20 backdrop-blur-[8px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(720px, 90vw)",
          maxHeight: "80vh",
          borderRadius: 16,
          background: "#fff",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#fafafa",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans, sans-serif)",
              fontSize: 13,
              fontWeight: 600,
              color: "#171717",
              letterSpacing: "-0.01em",
            }}
          >
            Circuit Schematic
          </span>

          {/* Step navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={onPrev}
              disabled={stepIndex <= 0}
              aria-label="Previous step"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: stepIndex <= 0 ? "#f5f5f5" : "#fff",
                color: stepIndex <= 0 ? "#d4d4d4" : "#525252",
                cursor: stepIndex <= 0 ? "not-allowed" : "pointer",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (stepIndex > 0) e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = stepIndex <= 0 ? "#f5f5f5" : "#fff";
              }}
            >
              <ChevronLeftIcon />
            </button>

            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 12,
                fontWeight: 500,
                color: "#525252",
                minWidth: 52,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {stepIndex + 1} / {totalSteps}
            </span>

            <button
              onClick={onNext}
              disabled={stepIndex >= totalSteps - 1}
              aria-label="Next step"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: stepIndex >= totalSteps - 1 ? "#f5f5f5" : "#fff",
                color: stepIndex >= totalSteps - 1 ? "#d4d4d4" : "#525252",
                cursor: stepIndex >= totalSteps - 1 ? "not-allowed" : "pointer",
                transition: "all 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (stepIndex < totalSteps - 1) e.currentTarget.style.background = "#f0f0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = stepIndex >= totalSteps - 1 ? "#f5f5f5" : "#fff";
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close expanded view"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff",
              color: "#737373",
              cursor: "pointer",
              transition: "all 150ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.color = "#dc2626";
              e.currentTarget.style.borderColor = "rgba(220,38,38,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#737373";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Schematic body — pan & zoom canvas */}
        <div style={{ flex: 1, minHeight: 320, overflow: "hidden" }}>
          <PanZoomCanvas resetKey={stepIndex}>
            <div style={{ padding: 20, width: "100%", height: "100%" }}>
              {children}
            </div>
          </PanZoomCanvas>
        </div>

        {/* Footer hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "8px 16px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#fafafa",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <kbd style={kbdStyle}>←</kbd>
            <kbd style={kbdStyle}>→</kbd>
            <span style={hintStyle}>navigate</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <kbd style={kbdStyle}>scroll</kbd>
            <span style={hintStyle}>zoom</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <kbd style={kbdStyle}>drag</kbd>
            <span style={hintStyle}>pan</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <kbd style={kbdStyle}>esc</kbd>
            <span style={hintStyle}>close</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* Shared footer kbd/hint styles */
const kbdStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 20,
  minWidth: 20,
  padding: "0 5px",
  borderRadius: 4,
  border: "1px solid rgba(0,0,0,0.1)",
  background: "#fff",
  fontFamily: "var(--font-mono, monospace)",
  fontSize: 10,
  color: "#737373",
  boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
};
const hintStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans, sans-serif)",
  fontSize: 11,
  color: "#a3a3a3",
  marginLeft: 2,
};

/* ================================================================
   Main floating card
   ================================================================ */

export function FloatingCircuitCard({
  children,
  stepIndex,
  totalSteps,
  onStepChange,
  expandedContent,
}: {
  children: ReactNode;
  stepIndex: number;
  totalSteps: number;
  onStepChange: (index: number) => void;
  /** Content to render inside the expanded overlay (the CircuitSchematic for the current step) */
  expandedContent: ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragSession | null>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);

  /* ── Card drag (toolbar only) ── */
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !cardRef.current) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const card = cardRef.current;
    const parent = card.offsetParent as HTMLElement | null;
    const pr = parent?.getBoundingClientRect() ?? { left: 0, top: 0, width: innerWidth, height: innerHeight };
    const cr = card.getBoundingClientRect();
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      orig: offset,
      anchorLeft: cr.left - offset.x - pr.left,
      anchorTop: cr.top - offset.y - pr.top,
      cardW: cr.width,
      cardH: cr.height,
      boundsW: pr.width,
      boundsH: pr.height,
    };
    setDragging(true);
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    setOffset(
      clampOffset(
        { x: d.orig.x + e.clientX - d.startX, y: d.orig.y + e.clientY - d.startY },
        d,
      ),
    );
  };
  const onEnd = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePrev = useCallback(() => {
    if (stepIndex > 0) onStepChange(stepIndex - 1);
  }, [stepIndex, onStepChange]);

  const handleNext = useCallback(() => {
    if (stepIndex < totalSteps - 1) onStepChange(stepIndex + 1);
  }, [stepIndex, totalSteps, onStepChange]);

  const handleClose = useCallback(() => setExpanded(false), []);

  return (
    <>
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
        {/* toolbar: drag handle + actions */}
        <div
          style={{
            height: 32,
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#fafafa",
            padding: "0 6px",
            gap: 2,
          }}
        >
          {/* Drag handle area (takes most of the space) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: dragging ? "grabbing" : "grab",
              height: "100%",
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

          {/* Step navigation (compact) */}
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <button
              onClick={handlePrev}
              disabled={stepIndex <= 0}
              aria-label="Previous step"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "none",
                background: "transparent",
                color: stepIndex <= 0 ? "#d4d4d4" : "#737373",
                cursor: stepIndex <= 0 ? "default" : "pointer",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => {
                if (stepIndex > 0) e.currentTarget.style.color = "#171717";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = stepIndex <= 0 ? "#d4d4d4" : "#737373";
              }}
            >
              <ChevronLeftIcon />
            </button>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 10,
                fontWeight: 500,
                color: "#a3a3a3",
                minWidth: 30,
                textAlign: "center",
                userSelect: "none",
              }}
            >
              {stepIndex + 1}/{totalSteps}
            </span>
            <button
              onClick={handleNext}
              disabled={stepIndex >= totalSteps - 1}
              aria-label="Next step"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "none",
                background: "transparent",
                color: stepIndex >= totalSteps - 1 ? "#d4d4d4" : "#737373",
                cursor: stepIndex >= totalSteps - 1 ? "default" : "pointer",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) => {
                if (stepIndex < totalSteps - 1) e.currentTarget.style.color = "#171717";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = stepIndex >= totalSteps - 1 ? "#d4d4d4" : "#737373";
              }}
            >
              <ChevronRightIcon />
            </button>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 16, background: "rgba(0,0,0,0.08)", margin: "0 2px" }} />

          {/* Expand button */}
          <button
            onClick={() => setExpanded(true)}
            aria-label="Expand schematic"
            title="Expand"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              borderRadius: 6,
              border: "none",
              background: "transparent",
              color: "#737373",
              cursor: "pointer",
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              e.currentTarget.style.color = "#171717";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#737373";
            }}
          >
            <ExpandIcon />
          </button>
        </div>

        {/* body — pan & zoom canvas */}
        <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <PanZoomCanvas resetKey={stepIndex}>
            {children}
          </PanZoomCanvas>
        </div>
      </div>

      {/* Expanded overlay */}
      {expanded && (
        <ExpandedSchematicOverlay
          stepIndex={stepIndex}
          totalSteps={totalSteps}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={handleClose}
        >
          {expandedContent}
        </ExpandedSchematicOverlay>
      )}
    </>
  );
}
