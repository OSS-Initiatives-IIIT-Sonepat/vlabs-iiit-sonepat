import * as THREE from "three";
import { PITCH } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, textLabel } from "@/components/shared/primitives";

// ── UNKNOWN APPARATUS FALLBACK ──────────────────────────────────────────────
// Prominent warning placeholder rendered when an apparatus item does not match
// any 3D geometry builder. Makes missing mappings immediately obvious in dev.

export function buildUnknownApparatusStandalone(name = "Unknown Apparatus"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;

  const W = P * 4.4;
  const H = P * 3.8;
  const D = P * 3.2;

  // Prominent warning block (orange/amber with black wireframe)
  const block = solidBox(W, H, D, M.hex(0xd97706));
  root.add(block);

  // Dark front plate
  const plateW = W * 0.9;
  const plateH = H * 0.86;
  const plate = solidBox(plateW, plateH, 0.02, M.hex(0x1c1917));
  plate.position.set(0, 0, D / 2 + 0.015);
  root.add(plate);

  // Warning title
  const title = textLabel("UNKNOWN APPARATUS", plateW * 0.88, plateH * 0.28, {
    textColor: "#fbbf24",
    fontSize: 34,
    bold: true,
  });
  if (title) {
    title.position.set(0, plateH * 0.28, D / 2 + 0.03);
    root.add(title);
  }

  // Question mark symbol in center
  const questionMark = textLabel("?", plateW * 0.4, plateH * 0.35, {
    textColor: "#f59e0b",
    fontSize: 64,
    bold: true,
  });
  if (questionMark) {
    questionMark.position.set(0, 0, D / 2 + 0.03);
    root.add(questionMark);
  }

  // Name of missing apparatus
  const truncatedName = name.length > 24 ? `${name.slice(0, 22)}...` : name;
  const nameLabel = textLabel(truncatedName, plateW * 0.92, plateH * 0.24, {
    textColor: "#ffffff",
    fontSize: 26,
  });
  if (nameLabel) {
    nameLabel.position.set(0, -plateH * 0.3, D / 2 + 0.03);
    root.add(nameLabel);
  }

  return root;
}
