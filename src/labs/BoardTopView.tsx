"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { type TopViewBoard } from "@/labs/lab-content.types";
import { topViewOf, type Callout, type Side } from "@/labs/top-view-callouts";

// A labelled top view of a board or chip, like a datasheet figure: the 3D
// model rendered straight from above, with red leader lines from each label
// to the part it names. Used as the scene of an intro's Observations.

const RED = "#d62828";
const SIDEBAR = 290; // the lab sidebar covers this much of a wide canvas
const TOP_BAR = 150; // nav pill and the short observation card above the figure
const CHAR_W = 6.7; // approximate width of one 12.5 px label character

type Placed = Callout & {
  /** The part box on screen. */
  ax: number;
  ay: number;
  lx: number;
  ly: number;
  frame?: { x: number; y: number; w: number; h: number };
};

type Layout = {
  w: number;
  h: number;
  /** Board rectangle on screen. */
  rect: { x: number; y: number; w: number; h: number };
  placed: Placed[];
  image: string;
};

/** Spread labels along one side, keeping their order and a minimum gap. */
function spread(
  values: number[],
  lo: number,
  hi: number,
  gap: number,
): number[] {
  const n = values.length;
  if (!n) return [];
  const out = values.map((v) => Math.min(hi, Math.max(lo, v)));
  for (let i = 1; i < n; i++) out[i] = Math.max(out[i], out[i - 1] + gap);
  const over = out[n - 1] - hi;
  if (over > 0) for (let i = 0; i < n; i++) out[i] -= over;
  for (let i = n - 2; i >= 0; i--) out[i] = Math.min(out[i], out[i + 1] - gap);
  return out;
}

function layoutFor(board: TopViewBoard, w: number, h: number): Layout | null {
  const { model, callouts } = topViewOf(board);
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());

  // Leave gutters for labels on all four sides.
  const left = w >= 1024 ? SIDEBAR : 16;
  const areaX = left + 210;
  const areaW = w - areaX - 240;
  const areaY = TOP_BAR + 70;
  const areaH = h - areaY - 90;
  if (areaW < 120 || areaH < 80) return null;
  const scale = Math.min(areaW / size.x, areaH / size.z); // px per world unit
  const rw = size.x * scale;
  const rh = size.z * scale;
  const rect = {
    x: areaX + (areaW - rw) / 2,
    y: areaY + (areaH - rh) / 2,
    w: rw,
    h: rh,
  };

  // Render the model from straight above into an image of the board rect.
  const px = Math.min(2, window.devicePixelRatio || 1);
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(px);
  renderer.setSize(Math.round(rw), Math.round(rh), false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(model);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const sun = new THREE.DirectionalLight(0xffffff, 0.55);
  sun.position.set(-2, 10, 4);
  scene.add(sun);
  const cam = new THREE.OrthographicCamera(
    -size.x / 2,
    size.x / 2,
    size.z / 2,
    -size.z / 2,
    0.01,
    100,
  );
  cam.up.set(0, 0, -1);
  cam.position.set(centre.x, box.max.y + 10, centre.z);
  cam.lookAt(centre.x, centre.y, centre.z);
  renderer.render(scene, cam);
  const image = renderer.domElement.toDataURL("image/png");
  renderer.dispose();
  model.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.geometry.dispose();
      const m = o.material as THREE.Material | THREE.Material[];
      (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
    }
  });

  const toScreen = (x: number, z: number) => ({
    x: rect.x + (x - box.min.x) * scale,
    y: rect.y + (z - box.min.z) * scale,
  });

  const placed: Placed[] = callouts.map((c) => {
    const a = toScreen(c.at.x, c.at.z);
    const b = c.box
      ? {
          x: a.x - (c.box.w * scale) / 2,
          y: a.y - (c.box.d * scale) / 2,
          w: c.box.w * scale,
          h: c.box.d * scale,
        }
      : undefined;
    return { ...c, ax: a.x, ay: a.y, lx: 0, ly: 0, frame: b };
  });

  const bySide = (s: Side) => placed.filter((p) => p.side === s);
  for (const s of ["left", "right"] as Side[]) {
    const list = bySide(s).sort((p, q) => p.ay - q.ay);
    const ys = spread(
      list.map((p) => p.ay),
      rect.y - 40,
      rect.y + rect.h + 40,
      26,
    );
    list.forEach((p, i) => {
      p.ly = ys[i];
      p.lx = s === "left" ? rect.x - 34 : rect.x + rect.w + 34;
    });
  }
  for (const s of ["top", "bottom"] as Side[]) {
    const list = bySide(s).sort((p, q) => p.ax - q.ax);
    // Two staggered rows so long labels do not collide.
    // Two staggered rows; within a row, labels keep clear of each other by
    // their own widths.
    for (const row of [0, 1]) {
      const inRow = list.filter((_, i) => i % 2 === row);
      const widths = inRow.map((p) => p.label.length * CHAR_W);
      const xs = inRow.map((p) => p.ax);
      for (let i = 1; i < xs.length; i++)
        xs[i] = Math.max(
          xs[i],
          xs[i - 1] + (widths[i - 1] + widths[i]) / 2 + 14,
        );
      const hi = rect.x + rect.w + 200;
      const over = xs.length
        ? xs[xs.length - 1] + widths[widths.length - 1] / 2 - hi
        : 0;
      if (over > 0) for (let i = 0; i < xs.length; i++) xs[i] -= over;
      inRow.forEach((p, i) => {
        p.lx = xs[i];
        p.ly =
          s === "top"
            ? rect.y - 30 - row * 26
            : rect.y + rect.h + 38 + row * 26;
      });
    }
  }
  return { w, h, rect, placed, image };
}

function leader(p: Placed): string {
  if (p.side === "left" || p.side === "right") {
    const x0 = p.side === "left" ? p.lx + 6 : p.lx - 6;
    return `M${x0},${p.ly} H${p.ax} V${p.ay}`;
  }
  // Down (or up) from under the label to the anchor's row, then across.
  const y0 = p.side === "top" ? p.ly + 5 : p.ly - 14;
  return `M${p.lx},${y0} V${p.ay} H${p.ax}`;
}

export function BoardTopView({ board }: { board: TopViewBoard }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const titleOf = topViewTitle(board);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setLayout(layoutFor(board, el.clientWidth, el.clientHeight)),
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, [board]);

  return (
    <div ref={wrap} className="relative h-full w-full bg-[#fafafa]">
      {layout && (
        <svg
          width={layout.w}
          height={layout.h}
          className="absolute inset-0"
          role="img"
          aria-label={titleOf}
        >
          <image
            href={layout.image}
            x={layout.rect.x}
            y={layout.rect.y}
            width={layout.rect.w}
            height={layout.rect.h}
          />
          {layout.placed.map((p, i) => (
            <g key={i}>
              {p.frame && (
                <rect
                  x={p.frame.x}
                  y={p.frame.y}
                  width={p.frame.w}
                  height={p.frame.h}
                  fill="none"
                  stroke={RED}
                  strokeWidth={1.6}
                  rx={2}
                />
              )}
              <path d={leader(p)} fill="none" stroke={RED} strokeWidth={1.4} />
              {!p.frame && <circle cx={p.ax} cy={p.ay} r={2.6} fill={RED} />}
            </g>
          ))}
          {/* Labels last, with a halo, so no leader line runs through them. */}
          {layout.placed.map((p, i) => (
            <g key={`t${i}`}>
              <text
                stroke="#fafafa"
                strokeWidth={5}
                strokeLinejoin="round"
                paintOrder="stroke"
                x={p.lx}
                y={p.ly + 4}
                textAnchor={
                  p.side === "left"
                    ? "end"
                    : p.side === "right"
                      ? "start"
                      : "middle"
                }
                fontSize={12.5}
                fill="#1f2328"
                fontFamily="inherit"
              >
                {p.label}
              </text>
            </g>
          ))}
          <text
            x={layout.rect.x + layout.rect.w / 2}
            y={layout.h - 28}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fill="#525252"
          >
            {titleOf}
          </text>
        </svg>
      )}
    </div>
  );
}

function topViewTitle(board: TopViewBoard): string {
  switch (board) {
    case "arduino-uno":
      return "Arduino Uno R3, top view";
    case "esp32-devkit":
      return "ESP32-DevKitC (38 pins), top view";
    case "at89s52":
      return "AT89S52 (8051), top view";
    case "pic18f4550":
      return "PIC18F4550, top view";
  }
}
