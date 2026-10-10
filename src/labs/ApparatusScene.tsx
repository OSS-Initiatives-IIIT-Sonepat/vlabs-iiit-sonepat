"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

import { MathText } from "@/ui/Math";
import { type ApparatusItem } from "@/labs/lab-content.types";
import {
  buildResistorStandalone,
  buildLedStandalone,
  buildCapacitorStandalone,
  buildBatteryStandalone,
  buildDcPowerSupplyStandalone,
  buildIcMeterStandalone,
  buildDip14Standalone,
  buildWireStandalone,
  buildBreadboardStandalone,
  buildPotentiometerStandalone,
  buildDiodeStandalone,
  buildZenerDiodeStandalone,
  buildAmmeterStandalone,
  buildVoltmeterStandalone,
  buildBjtStandalone,
  buildMosfetStandalone,
  buildOpAmpStandalone,
  buildSevenSegmentStandalone,
  buildOscilloscopeStandalone,
  buildFunctionGeneratorStandalone,
  buildTransformerStandalone,
  buildDipSwitchStandalone,
  buildLogicAnalyzerStandalone,
} from "@/components";

// ── Model builder ─────────────────────────────────────────────────────────
function buildItemModel(item: ApparatusItem): THREE.Group {
  const n = `${item.name} ${item.specification ?? ""}`.toLowerCase();

  if (n.includes("wire") || n.includes("jumper")) {
    return buildWireStandalone(
      n.includes("black")
        ? "black"
        : n.includes("blue")
          ? "blue"
          : n.includes("orange")
            ? "orange"
            : "red",
    );
  }
  if (n.includes("resistor") || n.includes("ω") || n.includes("ohm")) {
    return buildResistorStandalone(parseOhms(n) ?? 470);
  }
  if (n.includes("1n4148")) {
    return buildDiodeStandalone("1N4148");
  }
  if (n.includes("1n4007")) {
    return buildDiodeStandalone("1N4007");
  }
  if (n.includes("1n4733a") || n.includes("zener")) {
    return buildZenerDiodeStandalone();
  }
  if (n.includes("diode")) {
    return buildDiodeStandalone("1N4148");
  }
  if (n.includes("led")) {
    return buildLedStandalone(
      n.includes("red") ? "red" : n.includes("blue") ? "blue" : "green",
    );
  }
  if (n.includes("dip-switch")) {
    return buildDipSwitchStandalone();
  }
  if (n.includes("bc547") || n.includes("bjt") || n.includes("transistor")) {
    return buildBjtStandalone();
  }
  if (n.includes("capacitor") || n.includes("µf") || n.includes("nf")) {
    return buildCapacitorStandalone(47e-6);
  }
  if (n.includes("2n7000") || n.includes("mosfet")) {
    return buildMosfetStandalone();
  }
  if (n.includes("op-amp") || n.includes("LM741")) {
    return buildOpAmpStandalone();
  }
  if (n.includes("function-generator")) {
    return buildFunctionGeneratorStandalone();
  }
  if (n.includes("seven-segment")) {
    return buildSevenSegmentStandalone();
  }
  if (n.includes("transformer")) {
    return buildTransformerStandalone();
  }
  if (n.includes("logic-analyser")) {
    return buildLogicAnalyzerStandalone();
  }
  if (n.includes("power supply") || n.includes("supply") || n.includes("psu")) {
    return buildDcPowerSupplyStandalone();
  }
  if (n.includes("ammeter") || n.includes("milliammeter")) {
    return buildAmmeterStandalone();
  }
  if (n.includes("voltmeter")) {
    return buildVoltmeterStandalone();
  }
  if (n.includes("multimeter") || n.includes("dmm") || n.includes("meter")) {
    return buildIcMeterStandalone(); // proper DMM model
  }
  if (n.includes("battery")) {
    return buildBatteryStandalone();
  }
  if (n.includes("oscilloscope") || n.includes("CRO")) {
    return buildOscilloscopeStandalone();
  }
  if (n.includes("breadboard")) {
    const g = buildBreadboardStandalone();
    g.scale.setScalar(0.35);
    return g;
  }
  if (
    n.includes("74hc") ||
    n.includes("ic ") ||
    n.includes("gate") ||
    n.includes("chip")
  ) {
    return buildDip14Standalone("IC");
  }
  if (n.includes("potentiometer") || n.includes("variable")) {
    return buildPotentiometerStandalone();
  }

  return buildResistorStandalone(470);
}

function parseOhms(name: string): number | null {
  const m = name.match(/(\d+(?:\.\d+)?)\s*k?[Ωω]/i);
  if (!m) return null;
  const val = parseFloat(m[1]);
  return /\d\s*k/i.test(name) ? val * 1000 : val;
}

// ── Component ─────────────────────────────────────────────────────────────
type Props = { items: ApparatusItem[] };

export function ApparatusScene({ items }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // chip label DOM refs — one per callout across all items (we reuse them)
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const activeIdxRef = useRef(0);

  const modelsRef = useRef<THREE.Group[]>([]);
  // callout world positions per item (already centred)
  const calloutsRef = useRef<Array<{ pts: THREE.Vector3[]; labels: string[] }>>(
    [],
  );
  const pivotRef = useRef<THREE.Group>(new THREE.Group());
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const zoomRef = useRef(1);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // ── Build scene once ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xf7f6f3, 1);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 200);
    camera.position.set(0, 0.8, 4.0);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const pivot = new THREE.Group();
    scene.add(pivot);
    pivotRef.current = pivot;

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dl = new THREE.DirectionalLight(0xffffff, 0.6);
    dl.position.set(3, 5, 4);
    scene.add(dl);
    const fl = new THREE.DirectionalLight(0xffffff, 0.25);
    fl.position.set(-2, 2, -3);
    scene.add(fl);

    // Build all models, centre each, store callout world positions
    const allCallouts: Array<{ pts: THREE.Vector3[]; labels: string[] }> = [];
    const models = items.map((item) => {
      const g = buildItemModel(item);
      g.visible = false;

      // Centre
      const box = new THREE.Box3().setFromObject(g);
      const c = new THREE.Vector3();
      box.getCenter(c);
      g.position.sub(c);

      pivot.add(g);

      const callouts = item.callouts ?? [];
      allCallouts.push({
        pts: callouts.map((co) =>
          new THREE.Vector3(co.pos[0], co.pos[1], co.pos[2]).sub(c),
        ),
        labels: callouts.map((co) => co.label),
      });

      return g;
    });
    modelsRef.current = models;
    calloutsRef.current = allCallouts;

    if (models[0]) models[0].visible = true;

    // Resize
    function resize() {
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Drag orbit
    let dragging = false,
      lx = 0,
      ly = 0,
      ry = 0,
      rx = 0.1;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      ry += (e.clientX - lx) * 0.013;
      rx += (e.clientY - ly) * 0.008;
      rx = Math.max(-0.6, Math.min(1.3, rx));
      lx = e.clientX;
      ly = e.clientY;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomRef.current = Math.max(
        0.2,
        Math.min(7, zoomRef.current * (e.deltaY > 0 ? 1.12 : 0.89)),
      );
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    // ── RAF loop: render + update callout DOM directly (no React state) ──
    let raf: number;
    function loop() {
      raf = requestAnimationFrame(loop);

      // slow auto-spin when not dragging
      if (!dragging) ry += 0.005;
      pivot.rotation.y = ry;
      pivot.rotation.x = rx;
      camera.fov = 34 / zoomRef.current;
      camera.updateProjectionMatrix();

      renderer.render(scene, camera);

      // ── Project callout positions and update DOM chips in-place ────────
      const idx = activeIdxRef.current;
      const co = calloutsRef.current[idx];
      const chips = chipRefs.current;
      const svg = svgRef.current;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;

      if (!co || !svg) return;

      // Clear SVG lines
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const nChips = co.pts.length;

      co.pts.forEach((worldPt, i) => {
        // Apply pivot rotation to world point
        const rotated = worldPt.clone();
        rotated.applyEuler(pivot.rotation);

        // Project through camera
        const v = rotated.clone().project(camera);
        if (v.z >= 1) {
          // Behind camera — hide chip
          if (chips[i]) chips[i]!.style.display = "none";
          return;
        }

        const sx = (v.x * 0.5 + 0.5) * cw;
        const sy = (-v.y * 0.5 + 0.5) * ch;

        // Determine chip offset (alternate left/right to avoid overlap)
        const goRight = sx < cw / 2;
        const offX = goRight ? 70 : -70;
        const offY = -30;
        const cx2 = sx + offX;
        const cy2 = sy + offY;

        // Draw leader line in SVG
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line",
        );
        line.setAttribute("x1", String(sx));
        line.setAttribute("y1", String(sy));
        line.setAttribute("x2", String(cx2));
        line.setAttribute("y2", String(cy2));
        line.setAttribute("stroke", "#e6502e");
        line.setAttribute("stroke-width", "1.2");
        line.setAttribute("stroke-dasharray", "3 2");
        line.setAttribute("opacity", "0.75");
        svg.appendChild(line);

        // Draw target dot
        const dot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        dot.setAttribute("cx", String(sx));
        dot.setAttribute("cy", String(sy));
        dot.setAttribute("r", "3");
        dot.setAttribute("fill", "#e6502e");
        dot.setAttribute("opacity", "0.8");
        svg.appendChild(dot);

        // Update chip position
        if (chips[i]) {
          const el = chips[i]!;
          el.style.display = "flex";
          el.style.left = `${cx2}px`;
          el.style.top = `${cy2}px`;
        }
      });

      // Hide chips beyond current count
      chips.forEach((el, i) => {
        if (el && i >= nChips) el.style.display = "none";
      });
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("wheel", onWheel);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Switch active item ───────────────────────────────────────────────────
  useEffect(() => {
    activeIdxRef.current = activeIdx;
    modelsRef.current.forEach((m, i) => {
      m.visible = i === activeIdx;
    });
    if (pivotRef.current) {
      pivotRef.current.rotation.y = 0;
      pivotRef.current.rotation.x = 0.1;
    }
    zoomRef.current = 1;
    // Hide all chips immediately on switch
    chipRefs.current.forEach((el) => {
      if (el) el.style.display = "none";
    });
    if (svgRef.current)
      while (svgRef.current.firstChild)
        svgRef.current.removeChild(svgRef.current.firstChild);
  }, [activeIdx]);

  const prev = useCallback(() => setActiveIdx((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setActiveIdx((i) => Math.min(items.length - 1, i + 1)),
    [items.length],
  );

  const item = items[activeIdx];

  const activeCallouts = items[activeIdx]?.callouts ?? [];

  return (
    <div ref={wrapRef} className="h-full overflow-hidden relative w-full">
      <canvas
        ref={canvasRef}
        className="cursor-grab block h-full touch-none w-full active:cursor-grabbing"
      />

      {/* SVG leader lines — raw DOM manipulation in RAF loop */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="inset-0 overflow-visible pointer-events-none absolute z-[4]"
      />

      {/* Pre-rendered chip labels for active item — DOM positions set directly in RAF loop */}
      {activeCallouts.map((callout, i) => (
        <div
          key={`${activeIdx}-${i}`}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          style={{ display: "none" }}
          className="items-center bg-white/95 border-[1.5px] border-[rgba(20,20,20,0.4)] rounded-[6px] flex font-sans text-[11px] font-medium gap-[6px] leading-[1.3] px-2 py-[2px] pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-[5]"
        >
          <span className="bg-[#e6502e] rounded-full block shrink-0 h-[6px] w-[6px]" />
          <MathText text={callout.label} />
        </div>
      ))}

      {/* Bottom bar */}
      <div
        className="items-center flex flex-col gap-[calc(var(--spacing-base)*3)] left-0 pointer-events-none absolute right-0"
        style={{ bottom: "calc(var(--spacing-base) * 5)" }}
      >
        <div
          className="bg-white/[0.92] border border-[var(--color-black-10)] rounded-[calc(var(--radius-base)*2)] font-sans pointer-events-none text-center"
          style={{
            padding:
              "calc(var(--spacing-base) * 2) calc(var(--spacing-base) * 4)",
          }}
        >
          <div className="text-[var(--ink)] text-[13.5px] font-medium">
            <MathText text={item?.name ?? ""} />
          </div>
          {item?.specification && (
            <div className="text-[var(--ink-muted)] text-[11.5px] mt-[2px]">
              <MathText text={item.specification} />
            </div>
          )}
        </div>

        <div className="items-center flex gap-[calc(var(--spacing-base)*2)] justify-center pointer-events-auto">
          <button
            onClick={prev}
            aria-label="Previous"
            className="appearance-none bg-white/90 border border-[var(--color-black-10)] rounded-[4px] text-[var(--ink-muted)] cursor-pointer font-sans text-[12px] font-medium pointer-events-auto transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] motion-reduce:transition-none"
            style={{
              padding:
                "calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 3)",
            }}
          >
            ←
          </button>
          {items.map((_, i) => (
            <button
              key={i}
              className={`appearance-none border-[1.5px] border-[rgba(20,20,20,0.3)] rounded-full cursor-pointer h-2 transition-[background] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-2 motion-reduce:transition-none p-0 ${
                i === activeIdx ? "bg-[#141414]" : "bg-white/60"
              }`}
              onClick={() => setActiveIdx(i)}
            />
          ))}
          <button
            onClick={next}
            aria-label="Next"
            className="appearance-none bg-white/90 border border-[var(--color-black-10)] rounded-[4px] text-[var(--ink-muted)] cursor-pointer font-sans text-[12px] font-medium pointer-events-auto transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--ink)] motion-reduce:transition-none"
            style={{
              padding:
                "calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 3)",
            }}
          >
            →
          </button>
        </div>

        <div className="text-black/20 font-sans text-[10px]">
          drag · scroll to zoom · arrows to browse all {items.length} items
        </div>
      </div>
    </div>
  );
}
