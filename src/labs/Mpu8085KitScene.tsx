"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { type KitKey } from "@/labs/mpu8085/kit-session";

type Props = {
  digits: string;
  leds: number;
  pressed: KitKey | null;
  onKey?: (key: KitKey) => void;
};

const SEGMENTS: Record<string, string> = {
  "0": "abcdef",
  "1": "bc",
  "2": "abdeg",
  "3": "abcdg",
  "4": "bcfg",
  "5": "acdfg",
  "6": "acdefg",
  "7": "abc",
  "8": "abcdefg",
  "9": "abcdfg",
  A: "abcefg",
  B: "cdefg",
  C: "adef",
  D: "bcdeg",
  E: "adefg",
  F: "aefg",
  U: "bcdef",
  P: "abefg",
  "-": "g",
  " ": "",
};

const HEX_ROWS = ["CDEF", "89AB", "4567", "0123"];
const FN_ROWS = [
  ["BRK", "STP", "INS", "DEL"],
  ["REG", "INP", "SHIFT", "MOV"],
  ["DEC", "OUT", "DNL", "FIL"],
  ["INC", "CODE", "HLP", "EXE"],
];

/** Six session digits become the eight-digit UPC-8085 window. */
function panelDigits(digits: string): string {
  const raw = (digits + "      ").slice(0, 6);
  if (!raw.trim()) return "        ";
  if (raw === "8085  ") return "UPC-8085";
  return `${raw.slice(0, 4)}- ${raw.slice(4, 6)}`;
}

/**
 * The open 8085 trainer: green board in a metal case, eight red digits,
 * RES, and the two white keypads.
 */
export function Mpu8085KitScene({ digits, leds, pressed, onKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const digitsRef = useRef(digits);
  const ledsRef = useRef(leds);
  const pressedRef = useRef(pressed);
  const onKeyRef = useRef(onKey);

  useEffect(() => {
    digitsRef.current = digits;
    ledsRef.current = leds;
    pressedRef.current = pressed;
    onKeyRef.current = onKey;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xf4f4f5, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 80);
    camera.position.set(0, 15.2, 1.35);
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0.15);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 8;
    controls.maxDistance = 30;
    controls.maxPolarAngle = 0.95;
    controls.minPolarAngle = 0.05;
    controls.enablePan = false;
    controls.update();

    scene.add(new THREE.AmbientLight(0xffffff, 0.82));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
    keyLight.position.set(2, 9, 4);
    scene.add(keyLight);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(4.6, 40),
      new THREE.MeshBasicMaterial({
        color: 0x18181b,
        transparent: true,
        opacity: 0.08,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.05;
    scene.add(shadow);

    const caseMat = new THREE.MeshStandardMaterial({
      color: 0xc4c4c4,
      roughness: 0.55,
      metalness: 0.35,
    });
    const tray = new THREE.Mesh(
      new THREE.BoxGeometry(7.3, 0.28, 10.1),
      caseMat,
    );
    scene.add(tray);
    for (const [w, d, x, z] of [
      [7.3, 0.18, 0, -5.05],
      [7.3, 0.18, 0, 5.05],
      [0.18, 10.1, -3.65, 0],
      [0.18, 10.1, 3.65, 0],
    ] as const) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, 0.55, d), caseMat);
      wall.position.set(x, 0.28, z);
      scene.add(wall);
    }

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(6.55, 0.08, 9.15),
      new THREE.MeshStandardMaterial({ color: 0x1f8a3a, roughness: 0.72 }),
    );
    board.position.y = 0.2;
    scene.add(board);

    const chipSpots: [number, number, number, number][] = [
      [-2.15, -3.55, 0.55, 1.35],
      [-0.85, -3.7, 0.48, 1.7],
      [0.45, -3.55, 0.42, 1.15],
      [1.7, -3.65, 0.5, 1.45],
      [-2.2, -2.15, 0.48, 1.05],
      [-0.7, -2.05, 0.7, 1.55],
      [1.15, -2.2, 0.45, 0.9],
      [2.15, -2.0, 0.4, 1.2],
      [-1.8, -0.85, 0.5, 0.85],
      [-0.2, -0.75, 0.85, 1.25],
      [1.55, -0.9, 0.42, 0.7],
    ];
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x161616,
      roughness: 0.5,
    });
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.7,
      roughness: 0.3,
    });
    for (const [x, z, w, len] of chipSpots) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, len), bodyMat);
      body.position.set(x, 0.32, z);
      scene.add(body);
      const pins = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.14, 0.04, len - 0.08),
        pinMat,
      );
      pins.position.set(x, 0.24, z);
      scene.add(pins);
    }
    const cpu = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.18, 2.05),
      bodyMat,
    );
    cpu.position.set(2.15, 0.34, -3.15);
    scene.add(cpu);
    const cpuText = faceLabel("8085", 0.55, 0.16, "#fafafa", 64);
    cpuText.position.set(2.15, 0.44, -3.05);
    scene.add(cpuText);

    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.55, 0.12, 0.72),
      new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.4 }),
    );
    bezel.position.set(-0.35, 0.3, 0.15);
    scene.add(bezel);

    const hGeo = new THREE.BoxGeometry(0.16, 0.035, 0.045);
    const vGeo = new THREE.BoxGeometry(0.042, 0.035, 0.15);
    const digitMats: THREE.MeshStandardMaterial[][] = [];
    for (let i = 0; i < 8; i++) {
      const mats: THREE.MeshStandardMaterial[] = [];
      const group = new THREE.Group();
      group.position.set(-1.72 + i * 0.39, 0.4, 0.15);
      const places: Record<string, [THREE.BufferGeometry, number, number]> = {
        a: [hGeo, 0, -0.18],
        b: [vGeo, 0.08, -0.09],
        c: [vGeo, 0.08, 0.09],
        d: [hGeo, 0, 0.18],
        e: [vGeo, -0.08, 0.09],
        f: [vGeo, -0.08, -0.09],
        g: [hGeo, 0, 0],
      };
      for (const id of "abcdefg") {
        const [geo, x, z] = places[id];
        const mat = new THREE.MeshStandardMaterial({
          color: 0x2a0c0e,
          emissive: 0x000000,
          emissiveIntensity: 0,
          roughness: 0.5,
        });
        const seg = new THREE.Mesh(geo, mat);
        seg.position.set(x, 0, z);
        group.add(seg);
        mats.push(mat);
      }
      scene.add(group);
      digitMats.push(mats);
    }

    const keys = new Map<string, THREE.Group>();
    const res = keycap("RES", 0.62, 0.48, "RES");
    res.position.set(2.15, 0.28, 0.15);
    scene.add(res);
    keys.set("RES", res);

    const placePad = (rows: string[][], originX: number, originZ: number) => {
      rows.forEach((row, rowIndex) => {
        [...row].forEach((id, col) => {
          const cap = keycap(
            id === "SHIFT" ? "SFT" : id === "CODE" ? "•" : id,
            0.58,
            0.5,
            id,
          );
          cap.position.set(
            originX + col * 0.66,
            0.28,
            originZ + rowIndex * 0.62,
          );
          scene.add(cap);
          keys.set(id, cap);
        });
      });
    };
    placePad(HEX_ROWS, -2.55, 1.05);
    placePad(FN_ROWS, 0.15, 1.05);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let down: { x: number; y: number; key: KitKey | null } | null = null;

    function pick(event: PointerEvent): KitKey | null {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects([...keys.values()], true);
      for (const hit of hits) {
        let obj: THREE.Object3D | null = hit.object;
        while (obj) {
          if (typeof obj.userData.key === "string")
            return obj.userData.key as KitKey;
          obj = obj.parent;
        }
      }
      return null;
    }

    const onPointerDown = (event: PointerEvent) => {
      down = { x: event.clientX, y: event.clientY, key: pick(event) };
    };
    const onPointerUp = (event: PointerEvent) => {
      if (!down?.key) {
        down = null;
        return;
      }
      if (Math.hypot(event.clientX - down.x, event.clientY - down.y) < 6) {
        onKeyRef.current?.(down.key);
      }
      down = null;
    };
    const onMove = (event: PointerEvent) => {
      canvas.style.cursor = pick(event) ? "pointer" : "grab";
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointermove", onMove);

    let shown = "";
    function applyDigits(value: string) {
      const text = panelDigits(value);
      if (text === shown) return;
      shown = text;
      for (let i = 0; i < 8; i++) {
        const on = SEGMENTS[text[i]] ?? "";
        digitMats[i].forEach((mat, seg) => {
          const lit = on.includes("abcdefg"[seg]);
          mat.color.set(lit ? 0xff3b30 : 0x2a0c0e);
          mat.emissive.set(lit ? 0xff1a1a : 0x000000);
          mat.emissiveIntensity = lit ? 1 : 0;
        });
      }
    }

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      applyDigits(digitsRef.current);
      const held = pressedRef.current;
      for (const [id, group] of keys) {
        const downKey = id === held;
        const mat = group.userData.bodyMat as
          THREE.MeshStandardMaterial | undefined;
        if (mat) {
          mat.emissive.set(downKey ? 0x93c5fd : 0x000000);
          mat.emissiveIntensity = downKey ? 0.35 : 0;
        }
        const target = downKey ? 0.16 : 0.28;
        group.position.y += (target - group.position.y) * 0.45;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onMove);
      controls.dispose();
      const seen = new Set<THREE.BufferGeometry>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry && !seen.has(mesh.geometry)) {
          seen.add(mesh.geometry);
          mesh.geometry.dispose();
        }
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((item) => item.dispose());
        else material?.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

function faceLabel(
  text: string,
  width: number,
  height: number,
  color: string,
  fontSize: number,
): THREE.Mesh {
  const cvs = document.createElement("canvas");
  cvs.width = 256;
  cvs.height = Math.max(48, Math.round(256 * (height / width)));
  const ctx = cvs.getContext("2d");
  if (!ctx) return new THREE.Mesh();
  ctx.fillStyle = color;
  ctx.font = `700 ${fontSize}px Helvetica, Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, cvs.width / 2, cvs.height / 2);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(cvs),
      transparent: true,
    }),
  );
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

function keycap(
  label: string,
  width: number,
  depth: number,
  key: string,
): THREE.Group {
  const group = new THREE.Group();
  group.userData.key = key;
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.14, depth),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f4, roughness: 0.55 }),
  );
  body.position.y = 0.07;
  body.userData.key = key;
  group.userData.bodyMat = body.material;
  group.add(body);
  const cvs = document.createElement("canvas");
  cvs.width = 256;
  cvs.height = 160;
  const ctx = cvs.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#27272a";
    ctx.font = `700 ${label.length > 2 ? 64 : 120}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 128, 80);
  }
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(width * 0.86, depth * 0.62),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(cvs),
      transparent: true,
    }),
  );
  face.rotation.x = -Math.PI / 2;
  face.position.y = 0.145;
  face.userData.key = key;
  group.add(face);
  return group;
}
