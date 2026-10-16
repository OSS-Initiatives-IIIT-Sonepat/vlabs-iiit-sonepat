import * as THREE from "three";
import { PITCH, BOARD_H, TOP_Y } from "@/labs/coords";
import { M } from "@/components/shared/materials";
import { solidBox, solidCyl } from "@/components/shared/primitives";

// ── LED ───────────────────────────────────────────────────────────────────
// Exact original VLabs LED design from HEAD (glowing dome + rim + dark cylinder
// + flat cathode mark + gold leads), scaled down by S = 0.72 so it sits cleanly
// across two adjacent breadboard holes.

export const LED_PIN_ANODE = "led-anode";
export const LED_PIN_CATHODE = "led-cathode";

function ledHex(color: string): number {
  switch (color) {
    case "red":
      return 0xd63b2a;
    case "blue":
      return 0x2563a8;
    case "yellow":
      return 0xdda000;
    case "white":
      return 0xd8e2ec;
    default:
      return 0x22a84a; // green
  }
}

function ledOnHex(color: string): number {
  switch (color) {
    case "red":
      return 0xff5544;
    case "blue":
      return 0x44aaff;
    case "yellow":
      return 0xffe040;
    case "white":
      return 0xffffff;
    default:
      return 0x44ff66; // green
  }
}

export function buildLed(
  anodePos: THREE.Vector3,
  cathodePos: THREE.Vector3,
  color = "green",
  isOn = false,
  brightness = 1.0,
): THREE.Group {
  const container = new THREE.Group();
  const cx = (anodePos.x + cathodePos.x) / 2;
  const cz = (anodePos.z + cathodePos.z) / 2;

  // Scale factor relative to original LED (0.72× smaller, cleaner fit)
  const S = 0.72;
  const H = PITCH * 0.88;

  const offHex = ledHex(color);
  const onHex = ledOnHex(color);

  const ledMat = isOn
    ? new THREE.MeshStandardMaterial({
        color: onHex,
        emissive: onHex,
        emissiveIntensity: 1.2 * brightness,
        roughness: 0.15,
        metalness: 0.0,
      })
    : new THREE.MeshBasicMaterial({
        color: offHex,
      });

  const body = new THREE.Group();

  // Glow halo — only when ON
  if (isOn) {
    const glowGeo = new THREE.SphereGeometry(
      PITCH * 0.95 * S,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.55,
    );
    const glowMat = new THREE.MeshStandardMaterial({
      color: onHex,
      emissive: onHex,
      emissiveIntensity: 0.8 * brightness,
      transparent: true,
      opacity: 0.2 * brightness,
      side: THREE.DoubleSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.y = PITCH * 0.05 * S;
    body.add(glow);
  }

  // Dome
  const domeGeo = new THREE.SphereGeometry(
    PITCH * 0.7 * S,
    18,
    10,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.55,
  );
  body.add(new THREE.Mesh(domeGeo, ledMat));
  body.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()),
  );

  // Rim
  const rimMat = isOn
    ? new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        emissive: 0x333333,
        roughness: 0.3,
      })
    : M.gray();
  const rim = solidCyl(PITCH * 0.7 * S, PITCH * 0.18 * S, rimMat, 18);
  rim.position.y = -PITCH * 0.2 * S;
  body.add(rim);

  // Cylinder body
  const cyl = solidCyl(PITCH * 0.55 * S, PITCH * 0.8 * S, M.dark(), 14);
  cyl.position.y = -PITCH * 0.7 * S;
  body.add(cyl);

  // Flat cathode mark
  const flat = solidBox(0.04 * S, PITCH * 0.22 * S, PITCH * 0.22 * S, M.dark());
  flat.position.set(PITCH * 0.65 * S, -PITCH * 0.22 * S, 0);
  body.add(flat);

  body.position.set(cx, TOP_Y + H, cz);
  container.add(body);

  // Leads
  const leadH = H + BOARD_H * 0.6;
  const leadGeo = new THREE.CylinderGeometry(
    PITCH * 0.06,
    PITCH * 0.06,
    leadH,
    6,
  );
  const aLead = new THREE.Mesh(leadGeo, M.gold());
  aLead.position.set(anodePos.x, TOP_Y - BOARD_H * 0.3 + leadH / 2, anodePos.z);
  container.add(aLead);

  const cLeadH = leadH * 0.88;
  const cLead = new THREE.Mesh(
    new THREE.CylinderGeometry(PITCH * 0.06, PITCH * 0.06, cLeadH, 6),
    M.gold(),
  );
  cLead.position.set(
    cathodePos.x,
    TOP_Y - BOARD_H * 0.3 + cLeadH / 2,
    cathodePos.z,
  );
  container.add(cLead);

  // Named pin anchors
  const anodeAnchor = new THREE.Object3D();
  anodeAnchor.name = LED_PIN_ANODE;
  anodeAnchor.position.copy(anodePos);
  container.add(anodeAnchor);

  const cathodeAnchor = new THREE.Object3D();
  cathodeAnchor.name = LED_PIN_CATHODE;
  cathodeAnchor.position.copy(cathodePos);
  container.add(cathodeAnchor);

  // Point light when ON — illuminates nearby components on the breadboard
  if (isOn) {
    const light = new THREE.PointLight(onHex, 1.8 * brightness, PITCH * 12);
    light.position.set(cx, TOP_Y + H + PITCH * 0.5, cz);
    container.add(light);
  }

  return container;
}

export function buildLedStandalone(color = "green"): THREE.Group {
  const root = new THREE.Group();
  const P = PITCH;
  const ledMat = new THREE.MeshBasicMaterial({ color: ledHex(color) });

  const domeGeo = new THREE.SphereGeometry(
    P * 0.75,
    18,
    10,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.55,
  );
  root.add(new THREE.Mesh(domeGeo, ledMat));
  root.add(
    new THREE.LineSegments(new THREE.EdgesGeometry(domeGeo, 10), M.edge()),
  );

  const rim = solidCyl(P * 0.75, P * 0.2, M.white(), 18);
  rim.position.y = -P * 0.22;
  root.add(rim);

  const bodyPart = solidCyl(P * 0.6, P * 0.9, M.dark(), 14);
  bodyPart.position.y = -P * 0.8;
  root.add(bodyPart);

  // Flat cathode mark
  const flat = solidBox(0.04, P * 0.22, P * 0.22, M.dark());
  flat.position.set(P * 0.65, -P * 0.22, 0);
  root.add(flat);

  // Leads: longer = anode (left), shorter = cathode (right)
  const leadH = P * 2.4;
  const aLead = solidCyl(P * 0.07, leadH, M.gold(), 6);
  aLead.position.set(-P * 0.3, -P * 0.8 - leadH / 2 + P * 0.05, 0);
  root.add(aLead);

  const cLeadH = leadH * 0.85;
  const cLead = solidCyl(P * 0.07, cLeadH, M.gold(), 6);
  cLead.position.set(P * 0.3, -P * 0.8 - cLeadH / 2 + P * 0.05, 0);
  root.add(cLead);

  return root;
}
