"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

import {
  buildKitSession,
  pressKey,
  replay,
  type KitKey,
  type Monitor,
} from "@/labs/mpu8085/kit-session";

const KitScene = dynamic(
  () => import("@/labs/Mpu8085KitScene").then((m) => m.Mpu8085KitScene),
  { ssr: false },
);

type Props = {
  source: string;
  memoryInit?: Record<string, number>;
  expected?: string;
};

/**
 * The trainer, added above the editor. It does not replace the editor,
 * the run buttons, or the register panel.
 */
export function KitBench({ source, memoryInit, expected }: Props) {
  const session = useMemo(
    () => buildKitSession(source, memoryInit, expected ?? ""),
    [source, memoryInit, expected],
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hands, setHands] = useState(false);
  const [live, setLive] = useState<Monitor | null>(null);
  const [held, setHeld] = useState<KitKey | null>(null);
  const [epoch, setEpoch] = useState(source);

  if (epoch !== source) {
    setEpoch(source);
    setIndex(0);
    setPlaying(false);
    setHands(false);
    setLive(null);
    setHeld(null);
  }

  useEffect(() => {
    if (!playing || hands) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= session.frames.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 680);
    return () => window.clearInterval(timer);
  }, [playing, hands, session.frames.length]);

  const frame = session.frames[Math.min(index, session.frames.length - 1)];
  const shown = hands && live ? live : frame;
  const pressed = hands ? held : (frame?.key ?? null);

  function press(key: KitKey) {
    setPlaying(false);
    setHands(true);
    setHeld(key);
    setLive((current) => {
      const base =
        current ??
        replay(
          session.frames
            .slice(0, index + 1)
            .map((item) => item.key)
            .filter((item): item is KitKey => item !== null),
        );
      return pressKey(base, key);
    });
  }

  if (!frame || !shown) return null;

  function step(dir: number) {
    setPlaying(false);
    setHands(false);
    setLive(null);
    setIndex((current) =>
      Math.max(0, Math.min(session.frames.length - 1, current + dir)),
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, minHeight: 0, background: "#f4f4f5" }}>
        <KitScene
          digits={shown.digits}
          leds={shown.leds}
          pressed={pressed}
          onKey={press}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          padding: "6px 10px",
          background: "#161b22",
          borderTop: "1px solid #30363d",
        }}
      >
        <button type="button" style={stepBtn} onClick={() => step(-1)}>
          Prev
        </button>
        <button
          type="button"
          style={{
            ...stepBtn,
            background: "#238636",
            color: "#fff",
            borderColor: "#238636",
          }}
          onClick={() => {
            setHands(false);
            setLive(null);
            setPlaying((current) => !current);
          }}
        >
          {playing && !hands ? "Pause" : "Play"}
        </button>
        <button type="button" style={stepBtn} onClick={() => step(1)}>
          Next
        </button>
        <span
          style={{
            flex: 1,
            minWidth: 0,
            color: "#c9d1d9",
            fontSize: "12px",
            lineHeight: 1.35,
          }}
        >
          {shown.caption}
        </span>
        <span style={{ color: "#8b949e", fontSize: "11px", flexShrink: 0 }}>
          {hands ? "Keys" : `${index + 1}/${session.frames.length}`}
        </span>
      </div>
    </div>
  );
}

const stepBtn: CSSProperties = {
  border: "1px solid #30363d",
  background: "#21262d",
  color: "#e6edf3",
  borderRadius: "6px",
  padding: "3px 8px",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
};
