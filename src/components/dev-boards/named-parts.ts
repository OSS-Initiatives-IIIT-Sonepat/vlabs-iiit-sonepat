import * as THREE from "three";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";
import {
  DEV_BOARDS,
  DEV_HEADER_H,
  DEV_PCB_H,
  type DevBoardKind,
} from "@/components/dev-boards/pinouts";

// ── Trainer boards, bench chips and displays with named pins ───────────────
// Built centred on the origin. Pin positions come from DEV_BOARDS[kind], so a
// wire always lands on the pin it names.

type NamedKind = Extract<
  DevBoardKind,
  "mcu-8051" | "pic18f4550" | "adc0804" | "seg7"
>;

const TITLE: Record<NamedKind, string> = {
  "mcu-8051": "8051 TRAINER",
  pic18f4550: "PIC18F4550 TRAINER",
  adc0804: "ADC0804",
  seg7: "7-SEG",
};

export function buildNamedPartStandalone(kind: NamedKind): THREE.Group {
  const root = new THREE.Group();
  const { w, d, pins } = DEV_BOARDS[kind];

  if (kind === "mcu-8051" || kind === "pic18f4550") {
    root.add(solidBox(w, DEV_PCB_H, d, M.hex(0x1d3d6b)));
    // The 40-pin chip in the middle of the trainer.
    const chip = solidBox(1.7, 0.24, 2.4, M.ic());
    chip.position.set(0, DEV_PCB_H / 2 + 0.12, 0);
    root.add(chip);
    const label = textLabel(
      kind === "mcu-8051" ? "8051" : "PIC18F4550",
      1.5,
      0.35,
      {
        bgColor: "#1c1c28",
        textColor: "#ffffff",
        fontSize: 42,
        bold: true,
      },
    );
    if (label) {
      label.rotation.x = -Math.PI / 2;
      label.position.set(0, DEV_PCB_H / 2 + 0.25, 0);
      root.add(label);
    }
  } else if (kind === "adc0804") {
    // DIP-20 body. Pins 1 to 10 on the left, 11 to 20 on the right.
    root.add(solidBox(w, 0.3, d, M.ic()));
    const notch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.02, 10),
      M.gray(),
    );
    notch.position.set(-w / 2 + 0.2, 0.16, -d / 2 + 0.2);
    root.add(notch);
  } else {
    // Seven-segment display: a dark bezel with a lit window.
    root.add(solidBox(w, 0.34, d, M.dark()));
    const window = solidBox(w * 0.8, 0.02, d * 0.55, M.gray());
    window.position.set(0, 0.18, -0.1);
    root.add(window);
  }

  const tipGeo = new THREE.BoxGeometry(0.06, DEV_HEADER_H, 0.06);
  const bodyTop =
    kind === "adc0804" || kind === "seg7" ? 0.3 / 2 : DEV_PCB_H / 2;
  for (const p of pins) {
    const tip = new THREE.Mesh(tipGeo, M.metal());
    tip.position.set(p.x, bodyTop + DEV_HEADER_H / 2, p.z);
    root.add(tip);
  }

  // Pin names, flat on the surface, next to each pin.
  for (const p of pins) {
    const text = textLabel(p.name, 0.2 * Math.max(1, p.name.length / 2), 0.13, {
      bgColor: kind === "adc0804" || kind === "seg7" ? "#1c1c28" : "#1d3d6b",
      textColor: "#ffffff",
      fontSize: 26,
    });
    if (!text) continue;
    text.rotation.x = -Math.PI / 2;
    const towardEdge = p.z < 0 ? -0.18 : 0.18;
    text.position.set(p.x, bodyTop + 0.006, p.z + towardEdge);
    root.add(text);
  }

  const title = textLabel(TITLE[kind], Math.min(w * 0.7, 2.6), 0.3, {
    bgColor: kind === "adc0804" || kind === "seg7" ? "#1c1c28" : "#1d3d6b",
    textColor: "#ffffff",
    fontSize: 36,
    bold: true,
  });
  if (title && (kind === "adc0804" || kind === "seg7")) {
    title.rotation.x = -Math.PI / 2;
    title.position.set(0, bodyTop + 0.007, -d / 4);
    root.add(title);
  }

  return root;
}
