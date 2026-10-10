import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl, textLabel } from "@/components/shared/primitives";

// ─────────────────────────────────────────────────────────────────────────────
// MOSFET — TO-220F (fully isolated full-pack), modelled from the photo
// Scaled down slightly to fit better on a breadboard visually.
// ─────────────────────────────────────────────────────────────────────────────

const MM = PITCH / 2.54;

const SCALE = 0.65; // Scale down so it doesn't look massive
const BODY_W = 10.2 * SCALE;
const BODY_D = 4.5 * SCALE;
const MAIN_H = 9.4 * SCALE;
const TAB_D = 2.9 * SCALE;
const TOTAL_H = 15.9 * SCALE;
const HOLE_D = 3.2 * SCALE;
const HOLE_Y = 12.9 * SCALE;
const TAB_CHAMFER = 1.4 * SCALE;
const BEVEL = 0.18 * SCALE;

const BODY_LIFT = 5.0 * MM; // How high the body sits above the breadboard
const LEAD_RADIUS = PITCH * 0.045; // Match BJT lead thickness for consistency

function extrude(shape: THREE.Shape, depthMM: number): THREE.ExtrudeGeometry {
  return new THREE.ExtrudeGeometry(shape, {
    depth: depthMM * MM,
    bevelEnabled: true,
    bevelSize: BEVEL * MM,
    bevelThickness: BEVEL * MM,
    bevelSegments: 2,
    curveSegments: 32,
  });
}

function makeMainBody(): THREE.Mesh {
  const w = (BODY_W / 2) * MM;
  const shape = new THREE.Shape();
  shape.moveTo(-w, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, MAIN_H * MM);
  shape.lineTo(-w, MAIN_H * MM);
  shape.closePath();

  const geo = extrude(shape, BODY_D);
  geo.translate(0, 0, -(BODY_D * MM) / 2);
  return new THREE.Mesh(geo, M.dark());
}

function makeTab(): THREE.Mesh {
  const w = (BODY_W / 2) * MM;
  const c = TAB_CHAMFER * MM;
  const yBottom = (MAIN_H - 0.4) * MM;
  const yTop = TOTAL_H * MM;

  const shape = new THREE.Shape();
  shape.moveTo(-w, yBottom);
  shape.lineTo(w, yBottom);
  shape.lineTo(w, yTop - c);
  shape.lineTo(w - c, yTop);
  shape.lineTo(-w + c, yTop);
  shape.lineTo(-w, yTop - c);
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, HOLE_Y * MM, (HOLE_D / 2) * MM, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = extrude(shape, TAB_D);
  geo.translate(0, 0, (BODY_D / 2) * MM - TAB_D * MM);
  return new THREE.Mesh(geo, M.dark());
}

// Draw a cylindrical lead from the bottom of the lifted body down to the hole
function makeLead(targetX: number, naturalX: number): THREE.Group {
  const g = new THREE.Group();

  // Leads drop from the lifted body (Y=BODY_LIFT) down to the board (Y=0)
  const drop1 = BODY_LIFT * 0.3;
  const drop2 = BODY_LIFT - drop1;

  if (Math.abs(targetX - naturalX) < 0.001) {
    const lead = solidCyl(LEAD_RADIUS, BODY_LIFT, M.metal(), 10);
    // Center of cylinder spanning from Y=0 to Y=BODY_LIFT is BODY_LIFT / 2
    lead.position.set(targetX, BODY_LIFT / 2, 0);
    g.add(lead);
    return g;
  }

  // Bent lead
  const stub = solidCyl(LEAD_RADIUS, drop1, M.metal(), 10);
  stub.position.set(naturalX, BODY_LIFT - drop1 / 2, 0);
  g.add(stub);

  const horizLen = Math.abs(targetX - naturalX);
  const horiz = solidCyl(LEAD_RADIUS, horizLen, M.metal(), 10);
  horiz.rotation.z = Math.PI / 2;
  horiz.position.set((naturalX + targetX) / 2, BODY_LIFT - drop1, 0);
  g.add(horiz);

  const leg = solidCyl(LEAD_RADIUS, drop2, M.metal(), 10);
  leg.position.set(targetX, drop2 / 2, 0);
  g.add(leg);

  return g;
}

export function buildMosfet(
  mountPos: THREE.Vector3 = new THREE.Vector3(),
  partNumber = "K3878",
): THREE.Group {
  const root = new THREE.Group();

  // The physical body group, lifted above the board
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = BODY_LIFT;

  bodyGroup.add(makeMainBody());
  bodyGroup.add(makeTab());

  const frontZ = (BODY_D / 2 + BEVEL) * MM + 0.02 * MM;

  const logo = textLabel("WG", 3.2 * SCALE * MM, 1.8 * SCALE * MM, {
    textColor: "#eeeeee",
    fontSize: 24,
  });
  if (logo) {
    logo.position.set(-1.8 * SCALE * MM, 7.0 * SCALE * MM, frontZ);
    bodyGroup.add(logo);
  }

  const dimple = new THREE.Mesh(
    new THREE.TorusGeometry(0.55 * SCALE * MM, 0.09 * SCALE * MM, 8, 28),
    M.metal(),
  );
  dimple.position.set(3.4 * SCALE * MM, 7.2 * SCALE * MM, frontZ);
  bodyGroup.add(dimple);

  const marking = textLabel(partNumber, BODY_W * 0.75 * MM, 2.0 * SCALE * MM, {
    textColor: "#eeeeee",
    fontSize: 20,
  });
  if (marking) {
    marking.position.set(0, 4.6 * SCALE * MM, frontZ);
    bodyGroup.add(marking);
  }

  root.add(bodyGroup);

  // Leads go from BODY_LIFT down to 0 (breadboard surface)
  // Natural TO-220 pitch is 2.54mm (PITCH), but we scaled the body.
  // We'll just drop the leads straight down since they perfectly match breadboard holes.
  root.add(
    makeLead(-PITCH, -PITCH), // Gate
    makeLead(0, 0), // Drain
    makeLead(PITCH, PITCH), // Source
  );

  // Pin labels
  const labels = [
    { text: "G", x: -PITCH },
    { text: "D", x: 0 },
    { text: "S", x: PITCH },
  ];

  for (const item of labels) {
    const label = textLabel(item.text, PITCH * 0.32, PITCH * 0.22, {
      textColor: "#222222",
      fontSize: 24,
    });
    if (!label) continue;
    // Place label slightly in front of the leg hole
    label.position.set(item.x, PITCH * 0.1, PITCH * 0.3);
    label.rotation.x = -Math.PI / 8;
    root.add(label);
  }

  root.position.copy(mountPos);
  return root;
}

export function buildMosfetStandalone(): THREE.Group {
  const root = buildMosfet(new THREE.Vector3(0, 0, 0));
  root.position.y = TOP_Y + BOARD_H * 0.04;
  return root;
}
