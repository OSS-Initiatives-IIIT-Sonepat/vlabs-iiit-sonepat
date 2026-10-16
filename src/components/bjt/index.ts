import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { textLabel } from "@/components/shared/primitives";

// ═══════════════════════════════════════════════════════════════════════════════
// BJT — BC547 NPN Transistor in authentic D-shaped TO-92 package
//   - Flat front face (+Z) facing the viewer with crisp edge outline & markings
//   - Semi-cylindrical curved back (-Z)
//   - Three tinned metallic leads (C, B, E) bending smoothly into board holes
// ═══════════════════════════════════════════════════════════════════════════════

export const BJT_PIN_C = "bjt-c";
export const BJT_PIN_B = "bjt-b";
export const BJT_PIN_E = "bjt-e";

const BODY_R = PITCH * 0.54;
const BODY_H = PITCH * 0.86;
const FLAT_Z = BODY_R * 0.42;

const LEAD_RADIUS = PITCH * 0.048;
const LEAD_LENGTH = PITCH * 0.75;
const NATURAL_SPACING = PITCH * 0.28;

function buildTo92Body(): THREE.Group {
  const grp = new THREE.Group();
  const shape = new THREE.Shape();
  const startAngle = Math.asin(FLAT_Z / BODY_R);

  const xEdge = Math.cos(startAngle) * BODY_R;
  shape.moveTo(xEdge, -FLAT_Z);
  shape.absarc(0, 0, BODY_R, -startAngle, Math.PI + startAngle, false);
  shape.lineTo(xEdge, -FLAT_Z);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: BODY_H,
    bevelEnabled: false,
    curveSegments: 24,
  });
  geo.rotateX(-Math.PI / 2);

  const epoxyMat = new THREE.MeshBasicMaterial({ color: 0x242834 });
  grp.add(new THREE.Mesh(geo, epoxyMat));
  grp.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 22), M.edge()));
  return grp;
}

function makeFormedLead(targetX: number, naturalX: number): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(naturalX, PITCH * 0.04, 0),
    new THREE.Vector3(naturalX, -LEAD_LENGTH * 0.22, 0),
    new THREE.Vector3(targetX, -LEAD_LENGTH * 0.58, 0),
    new THREE.Vector3(targetX, -LEAD_LENGTH - BOARD_H * 0.28, 0),
  ]);
  const geo = new THREE.TubeGeometry(curve, 14, LEAD_RADIUS, 8, false);
  return new THREE.Mesh(geo, M.gold());
}

export function buildBjt(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  options: { leadSpacing?: number; label?: string; pinLabels?: string[] } = {},
): THREE.Group {
  const root = new THREE.Group();

  const spacing = options.leadSpacing ?? NATURAL_SPACING;
  const partLabel = options.label ?? "BC547";
  const pinLabels = options.pinLabels ?? ["C", "B", "E"];

  // D-shaped TO-92 package body with crisp edge lines
  root.add(buildTo92Body());

  // Laser-etched part marking on the flat front face (+Z)
  const marking = textLabel(partLabel, BODY_R * 1.45, BODY_H * 0.36, {
    textColor: "#f0f4fa",
    fontSize: 40,
    bold: true,
  });
  if (marking) {
    marking.position.set(0, BODY_H * 0.64, FLAT_Z + PITCH * 0.015);
    root.add(marking);
  }

  // Pinout sub-marking ("C B E") on lower part of flat front face
  const pinMarking = textLabel(
    pinLabels.join("   "),
    BODY_R * 1.4,
    BODY_H * 0.26,
    {
      textColor: "#ffd454",
      fontSize: 30,
      bold: true,
    },
  );
  if (pinMarking) {
    pinMarking.position.set(0, BODY_H * 0.26, FLAT_Z + PITCH * 0.015);
    root.add(pinMarking);
  }

  // Formed leads (C = left, B = middle, E = right)
  root.add(makeFormedLead(-spacing, -NATURAL_SPACING));
  root.add(makeFormedLead(0, 0));
  root.add(makeFormedLead(spacing, NATURAL_SPACING));

  // Named pin anchors at board surface level
  const anchors: [string, number][] = [
    [BJT_PIN_C, -spacing],
    [BJT_PIN_B, 0],
    [BJT_PIN_E, spacing],
  ];
  for (const [name, x] of anchors) {
    const a = new THREE.Object3D();
    a.name = name;
    a.position.set(x, -LEAD_LENGTH, 0);
    root.add(a);
  }

  root.position.copy(mountPos);
  return root;
}

export function buildBjtStandalone(): THREE.Group {
  const root = buildBjt(new THREE.Vector3(0, 0, 0), {
    leadSpacing: PITCH * 0.45,
  });
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}
