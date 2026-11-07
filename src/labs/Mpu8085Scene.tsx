"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { textLabel } from "@/components/shared/primitives";
import { PINS_8085 } from "@/labs/mpu8085/pins";
import { type PinLandmark } from "@/labs/mpu8085/steps";

const PITCH = 0.36;
const BODY_W = 1.85;
const BODY_H = 0.42;
const BODY_LEN = (20 - 1) * PITCH + 0.85;

type Props = {
  /** Pin ids this step is explaining. Drawn blue and lifted. */
  focus: readonly string[];
  /** Short notes that pop out beside the focused pins. */
  landmarks?: readonly PinLandmark[];
  /** Subject-card cover: the package only, slowly turning, no drag. */
  preview?: boolean;
};

function pinX(index: number): number {
  return -BODY_LEN / 2 + 0.42 + index * PITCH;
}

/**
 * A 40-pin 8085. Numbers stay printed on the package.
 * The step's pins lift and turn blue, and a short note pops out beside them.
 */
export function Mpu8085Scene({
  focus,
  landmarks = [],
  preview = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const focusRef = useRef(focus);

  useEffect(() => {
    focusRef.current = focus;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    if (!canvas || !svg) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xfafafa, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 80);
    let controls: OrbitControls | null = null;
    if (preview) {
      camera.fov = 36;
      camera.updateProjectionMatrix();
      camera.position.set(0.8, 3.4, 7.6);
      camera.lookAt(0, 0.25, 0);
    } else {
      camera.position.set(0.4, 13.8, 9.2);
      controls = new OrbitControls(camera, canvas);
      controls.target.set(-1.7, 0, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.minDistance = 4;
      controls.maxDistance = 26;
      controls.maxPolarAngle = Math.PI * 0.48;
      controls.minPolarAngle = 0.25;
      controls.enablePan = false;
      controls.update();
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 0.7);
    key.position.set(3, 8, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.28);
    fill.position.set(-4, 3, -2);
    scene.add(fill);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.52,
      metalness: 0.06,
    });
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      roughness: 0.4,
      metalness: 0.35,
    });
    const hotMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.32,
      metalness: 0.4,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.32,
      metalness: 0.55,
    });
    const root = new THREE.Group();
    if (preview) root.rotation.y = 0.62;
    scene.add(root);

    const bodyGeo = new THREE.BoxGeometry(BODY_LEN, BODY_H, BODY_W);
    const body = new THREE.Group();
    body.position.y = BODY_H / 2;
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    body.add(bodyMesh);
    body.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(bodyGeo),
        new THREE.LineBasicMaterial({ color: 0x3a3a3a }),
      ),
    );
    root.add(body);

    const notch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.16, 0.16, BODY_W * 0.55, 16),
      bodyMat,
    );
    notch.rotation.x = Math.PI / 2;
    notch.position.set(-BODY_LEN / 2 + 0.02, BODY_H * 0.72, 0);
    root.add(notch);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), gold);
    dot.position.set(-BODY_LEN / 2 + 0.42, BODY_H + 0.06, -BODY_W * 0.28);
    root.add(dot);

    const title = textLabel("8085A", 1.5, 0.38, {
      textColor: "#f4f4f5",
      fontSize: 64,
    });
    if (title) {
      title.rotation.x = -Math.PI / 2;
      title.position.set(0.15, BODY_H + 0.012, -0.08);
      root.add(title);
    }

    const pinGeo = new THREE.BoxGeometry(0.11, 0.16, 0.62);
    const anchors = new Map<string, THREE.Object3D>();
    const pinMeshes = new Map<string, THREE.Mesh>();
    const pinBase = new Map<string, THREE.Vector3>();

    for (const pin of PINS_8085) {
      const x = pinX(pin.index);
      const side = pin.side === "L" ? -1 : 1;
      const mesh = new THREE.Mesh(pinGeo, pinMat);
      mesh.position.set(x, BODY_H * 0.42, side * (BODY_W / 2 + 0.22));
      root.add(mesh);
      pinMeshes.set(pin.id, mesh);
      pinBase.set(pin.id, mesh.position.clone());

      const anchor = new THREE.Object3D();
      anchor.position.set(x, BODY_H * 0.5, side * (BODY_W / 2 + 0.34));
      root.add(anchor);
      anchors.set(pin.id, anchor);

      const number = textLabel(String(pin.n), 0.32, 0.18, {
        textColor: "#f4f4f5",
        fontSize: 72,
      });
      if (number) {
        number.rotation.x = -Math.PI / 2;
        number.position.set(x, BODY_H + 0.014, side * (BODY_W / 2 - 0.28));
        root.add(number);
      }
    }
    const tmp = new THREE.Vector3();
    const depth = new THREE.Vector3();
    const overviewTarget = new THREE.Vector3(-1.7, 0, 0);
    const overviewPos = new THREE.Vector3(0.4, 13.8, 9.2);
    let framed = "";
    let focusAt = 0;
    let glide: {
      t: number;
      fromPos: THREE.Vector3;
      toPos: THREE.Vector3;
      fromTarget: THREE.Vector3;
      toTarget: THREE.Vector3;
    } | null = null;
    let frame = 0;

    const stopGlide = () => {
      glide = null;
    };
    controls?.addEventListener("start", stopGlide);

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    function placeLandmarks(
      w: number,
      h: number,
      projected: Map<string, { x: number; y: number; behind: boolean }>,
    ) {
      const host = canvas.parentElement;
      if (!host) return;
      const notes = [...host.querySelectorAll<HTMLElement>("[data-lm]")];
      if (notes.length === 0) return;
      const width = notes[0].offsetWidth || 280;
      const heights = notes.map((note) => note.offsetHeight || 72);
      const rawHeight = heights.reduce((sum, item) => sum + item, 0);
      // Language and step controls occupy the top-right. Keep the stack under them.
      const header = 68;
      const budget = h - header - 12;
      let gap = 8;
      if (notes.length > 1 && rawHeight + gap * (notes.length - 1) > budget) {
        gap = Math.max(2, (budget - rawHeight) / (notes.length - 1));
      }
      const margin = 16;
      const total = rawHeight + gap * Math.max(0, notes.length - 1);
      let chipBottom = 0;
      for (const at of projected.values()) {
        if (!at.behind) chipBottom = Math.max(chipBottom, at.y);
      }
      const below = chipBottom + 18;
      let y =
        below + total < h - 28 ? below : Math.max(margin, (h - total) / 2);
      if (y + total > h - 28) y = margin;
      if (y < header && total <= budget) y = header;
      const canvasBox = canvas.getBoundingClientRect();
      const blockers = [...document.querySelectorAll("div")]
        .filter((el) => {
          if (host.contains(el) || el.contains(canvas)) return false;
          const positioned = getComputedStyle(el).position;
          if (positioned !== "absolute" && positioned !== "fixed") return false;
          const rect = el.getBoundingClientRect();
          return rect.width > 160 && rect.width < w * 0.85 && rect.height > 80;
        })
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left - canvasBox.left,
            right: rect.right - canvasBox.left,
          };
        });
      const leftEdge = blockers
        .filter((box) => box.x < w * 0.55)
        .reduce((edge, box) => Math.max(edge, box.right), 16);
      const rightEdge = blockers
        .filter((box) => box.x > w * 0.45)
        .reduce((edge, box) => Math.min(edge, box.x), w - 12);
      let x = rightEdge - width - 14;
      if (x < leftEdge + 12) x = Math.max(16, w - width - 16);
      x = Math.max(8, Math.min(x, w - width - 8));

      notes.forEach((note, i) => {
        const ids = (note.dataset.pins ?? "").split(",").filter(Boolean);
        const points = ids
          .map((id) => projected.get(id))
          .filter((at): at is { x: number; y: number; behind: boolean } =>
            Boolean(at && !at.behind),
          );
        note.style.left = `${x}px`;
        note.style.top = `${y}px`;
        const top = y;
        const noteH = heights[i];
        y += noteH + gap;

        const lead = host.querySelector<SVGLineElement>(
          `[data-lm-line="${note.dataset.lm}"]`,
        );
        const dot = host.querySelector<SVGCircleElement>(
          `[data-lm-dot="${note.dataset.lm}"]`,
        );
        if (!lead || !dot || points.length === 0) {
          lead?.setAttribute("opacity", "0");
          dot?.setAttribute("opacity", "0");
          return;
        }
        let nearest = points[0];
        for (const point of points) {
          if (Math.abs(point.x - x) < Math.abs(nearest.x - x)) nearest = point;
        }
        const fromX = nearest.x >= x ? x + width : x;
        const fromY = Math.max(top + 12, Math.min(nearest.y, top + noteH - 12));
        lead.setAttribute("x1", String(fromX));
        lead.setAttribute("y1", String(fromY));
        lead.setAttribute("x2", String(nearest.x));
        lead.setAttribute("y2", String(nearest.y));
        lead.setAttribute("opacity", "1");
        dot.setAttribute("cx", String(nearest.x));
        dot.setAttribute("cy", String(nearest.y));
        dot.setAttribute("opacity", "1");
      });
    }

    function layout() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      const focusSet = new Set(focusRef.current);
      const projected = new Map<
        string,
        { x: number; y: number; behind: boolean }
      >();

      for (const pin of PINS_8085) {
        const anchor = anchors.get(pin.id);
        if (!anchor) continue;
        anchor.getWorldPosition(tmp);
        depth.copy(tmp).project(camera);
        const behind = depth.z > 1;
        const x = (depth.x * 0.5 + 0.5) * w;
        const y = (-depth.y * 0.5 + 0.5) * h;
        projected.set(pin.id, { x, y, behind });
        const mesh = pinMeshes.get(pin.id);
        const hot = focusSet.has(pin.id);
        if (mesh) mesh.material = hot ? hotMat : pinMat;
      }

      if (!preview) placeLandmarks(w, h, projected);
    }

    function frameFocus(now: number) {
      if (!controls || preview) return;
      const noted = [
        ...document.querySelectorAll<HTMLElement>("[data-lm]"),
      ].flatMap((el) => (el.dataset.pins ?? "").split(",").filter(Boolean));
      const ids = focusRef.current.length > 0 ? focusRef.current : noted;
      const key = ids.join("|");
      if (key === framed) return;
      framed = key;
      focusAt = now;
      const toTarget = overviewTarget.clone();
      const toPos = overviewPos.clone();
      if (ids.length > 0) {
        const center = new THREE.Vector3();
        let count = 0;
        let zAcc = 0;
        for (const id of ids) {
          const anchor = anchors.get(id);
          const pin = PINS_8085.find((item) => item.id === id);
          if (!anchor || !pin) continue;
          anchor.getWorldPosition(tmp);
          center.add(tmp);
          count += 1;
          zAcc += pin.side === "L" ? -1 : 1;
        }
        if (count > 0) {
          center.multiplyScalar(1 / count);
          const sides = new Set(
            ids.map(
              (id) => PINS_8085.find((item) => item.id === id)?.side ?? "R",
            ),
          );
          const both = sides.size > 1;
          const zSign = both || zAcc === 0 ? 1 : Math.sign(zAcc);
          // Stay far enough that the whole package remains in frame.
          // Only the side we are talking about turns toward the camera.
          toTarget.set(-1.35, 0, both ? 0 : center.z * 0.2);
          toPos.set(-0.15, 12.4, zSign * 9.2);
        }
      }
      glide = {
        t: 0,
        fromPos: camera.position.clone(),
        toPos,
        fromTarget: controls.target.clone(),
        toTarget,
      };
    }

    function posePins(now: number) {
      const focusSet = new Set(focusRef.current);
      for (const pin of PINS_8085) {
        const mesh = pinMeshes.get(pin.id);
        const base = pinBase.get(pin.id);
        if (!mesh || !base) continue;
        const hot = focusSet.has(pin.id);
        const appear = hot
          ? Math.min(1, Math.max(0, (now - focusAt - pin.index * 28) / 220))
          : 0;
        const wave =
          appear * (0.05 + 0.03 * Math.sin(now / 280 + pin.index * 0.45));
        const side = pin.side === "L" ? -1 : 1;
        mesh.position.set(base.x, base.y + appear * 0.03, base.z + side * wave);
        const fat = hot ? 1.08 : 1;
        const long = 1 + appear * 0.34;
        mesh.scale.x += (fat - mesh.scale.x) * 0.2;
        mesh.scale.y += (fat - mesh.scale.y) * 0.2;
        mesh.scale.z += (long - mesh.scale.z) * 0.2;
      }
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (controls) {
        frameFocus(now);
        if (glide) {
          glide.t = Math.min(1, glide.t + 0.02);
          const k = 1 - (1 - glide.t) ** 3;
          camera.position.lerpVectors(glide.fromPos, glide.toPos, k);
          controls.target.lerpVectors(glide.fromTarget, glide.toTarget, k);
          if (glide.t >= 1) glide = null;
        }
        controls.update();
        posePins(now);
      } else {
        root.rotation.y += 0.003;
      }
      layout();
      renderer.render(scene, camera);
    }
    tick(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls?.removeEventListener("start", stopGlide);
      controls?.dispose();
      const seen = new Set<THREE.Material | THREE.BufferGeometry>();
      root.traverse((child) => {
        if (
          !(child instanceof THREE.Mesh) &&
          !(child instanceof THREE.LineSegments)
        ) {
          return;
        }
        if (!seen.has(child.geometry)) {
          seen.add(child.geometry);
          child.geometry.dispose();
        }
        const material = child.material;
        const list = Array.isArray(material) ? material : [material];
        for (const entry of list) {
          if (seen.has(entry)) continue;
          seen.add(entry);
          if (entry instanceof THREE.MeshBasicMaterial && entry.map)
            entry.map.dispose();
          entry.dispose();
        }
      });
      renderer.dispose();
    };
  }, [preview]);

  return (
    <div
      className={`relative h-full w-full bg-[#fafafa] ${preview ? "pointer-events-none" : ""}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <svg
        ref={svgRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {landmarks.map((note) => (
          <g key={note.id}>
            <line
              data-lm-line={note.id}
              stroke="#2563eb"
              strokeWidth="1.25"
              opacity="0"
            />
            <circle
              data-lm-dot={note.id}
              r="4"
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0"
            />
          </g>
        ))}
      </svg>
      {!preview && (
        <>
          <style>{`
            @keyframes mpu-lm {
              from { opacity: 0; translate: 12px 8px; }
              to { opacity: 1; translate: 0 0; }
            }
          `}</style>
          {landmarks.map((note, i) => (
            <div
              key={note.id}
              data-lm={note.id}
              data-pins={note.pins.join(",")}
              className="pointer-events-none absolute w-[280px] rounded-lg bg-white px-2.5 py-1.5 shadow-[0_10px_28px_rgba(23,23,23,0.14)] ring-1 ring-[#e4e4e7]"
              style={{
                animation: `mpu-lm 480ms cubic-bezier(0.22,1,0.36,1) ${i * 70}ms both`,
              }}
            >
              <p className="font-sans text-[12px] font-semibold leading-tight text-[#1d4ed8]">
                {note.title}
              </p>
              <p className="mt-0.5 font-sans text-[12px] leading-snug text-[#262626]">
                {note.text}
              </p>
            </div>
          ))}
          <p className="pointer-events-none absolute bottom-3 left-4 z-[1] font-sans text-[12px] text-[#525252]">
            Gold dot is pin 1. Drag to turn the package.
          </p>
        </>
      )}
    </div>
  );
}
