import * as THREE from "three";
import { DEV_MM } from "@/components/dev-boards/pinouts";
import { add, block, decal, mat, outline } from "@/components/dev-boards/cad";

// ── Power for development boards ──────────────────────────────────────────
// A board needs power before it can run a sketch. Two sources:
//  - USB: a cable from the board's USB socket to a 5 V USB adapter on the
//    bench (the same cable uploads the sketch from the PC);
//  - 9 V battery: a battery snap and barrel plug into the Uno's DC jack.
// Both plugs enter their socket from -x (the board's left edge). All
// positions here are world coordinates; `bench` is the bench-top height.

const MM = DEV_MM;
const CABLE = 0x1d1e21;

function tube(points: THREE.Vector3[], radius: number, color: number) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.3);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 64, radius, 10, false),
    mat(color, 0.35),
  );
  mesh.userData.noOutline = true;
  return mesh;
}

/** 5 V USB adapter on the bench, with its USB-A port facing +z. */
function usbAdapter(root: THREE.Group, x: number, z: number, bench: number) {
  const W = 26 * MM;
  const H = 20 * MM;
  const D = 34 * MM;
  block(root, x, z, bench, W, H, D, 0xf1f2f3, 0.5);
  // USB-A port on the face toward the board.
  block(
    root,
    x,
    z + D / 2 + 0.2 * MM,
    bench + H / 2 - 2.5 * MM,
    12.5 * MM,
    5 * MM,
    0.4 * MM,
    0x9aa0a8,
    0.4,
  );
  const label = decal(
    (ctx, Wc, Hc) => {
      ctx.fillStyle = "#3b3f46";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `700 ${Hc * 0.22}px Helvetica, Arial, sans-serif`;
      ctx.fillText("USB", Wc / 2, Hc * 0.3);
      ctx.font = `600 ${Hc * 0.16}px Helvetica, Arial, sans-serif`;
      ctx.fillText("5 V ⎓ 2 A", Wc / 2, Hc * 0.62);
    },
    W * 0.8,
    D * 0.6,
  );
  if (label) {
    label.position.set(x, bench + H + 0.003, z);
    root.add(label);
  }
  return { portZ: z + D / 2, portY: bench + H / 2 - 2.5 * MM };
}

/**
 * USB power: the plug in the board's socket, a cable down to the bench and
 * back to a 5 V adapter behind the board.
 */
export function buildUsbPower(
  port: THREE.Vector3,
  plug: "usb-b" | "micro-usb",
  boardBackZ: number,
  bench: number,
): THREE.Group {
  const root = new THREE.Group();
  const big = plug === "usb-b";
  // Metal part inside the socket, then the moulded grip outside it.
  const tipL = big ? 8 * MM : 5 * MM;
  block(
    root,
    port.x + tipL / 2 - 0.5 * MM,
    port.z,
    port.y - (big ? 3.6 : 0.9) * MM,
    tipL,
    big ? 7.2 * MM : 1.8 * MM,
    big ? 8.0 * MM : 6.6 * MM,
    0xc9cdd2,
    0.5,
  );
  const gripL = big ? 17 * MM : 10 * MM;
  const gripH = big ? 11 * MM : 6 * MM;
  const gripW = big ? 12.5 * MM : 10.5 * MM;
  const gx = port.x - 0.5 * MM - gripL / 2;
  block(root, gx, port.z, port.y - gripH / 2, gripL, gripH, gripW, CABLE, 0.3);
  // Strain relief.
  const reliefL = 7 * MM;
  const relief = add(
    root,
    new THREE.CylinderGeometry(2.6 * MM, 3.4 * MM, reliefL, 16),
    mat(CABLE, 0.3),
    gx - gripL / 2 - reliefL / 2,
    port.y,
    port.z,
  );
  relief.rotation.z = Math.PI / 2;

  // Adapter behind the board, in the clear lane left of it.
  const laneX = gx - gripL / 2 - reliefL - 6 * MM;
  const adapterZ = boardBackZ - 32 * MM;
  const a = usbAdapter(root, laneX, adapterZ, bench);

  const start = new THREE.Vector3(gx - gripL / 2 - reliefL, port.y, port.z);
  const r = 1.8 * MM;
  root.add(
    tube(
      [
        start,
        new THREE.Vector3(start.x - 4 * MM, port.y - 1 * MM, port.z),
        new THREE.Vector3(laneX, bench + r + 4 * MM, port.z - 8 * MM),
        new THREE.Vector3(laneX, bench + r, port.z - 25 * MM),
        new THREE.Vector3(laneX, bench + r, a.portZ + 14 * MM),
        new THREE.Vector3(laneX, a.portY, a.portZ + 3 * MM),
        new THREE.Vector3(laneX, a.portY, a.portZ),
      ],
      r,
      CABLE,
    ),
  );
  outline(root);
  return root;
}

/**
 * 9 V battery: a barrel plug in the DC jack, red and black leads to a snap on
 * a 9 V battery lying on the bench in front of the board.
 */
export function buildBattery9v(
  port: THREE.Vector3,
  boardFrontZ: number,
  bench: number,
): THREE.Group {
  const root = new THREE.Group();
  // Barrel plug: metal sleeve in the jack, black grip outside.
  const sleeve = add(
    root,
    new THREE.CylinderGeometry(2.75 * MM, 2.75 * MM, 9 * MM, 20),
    mat(0xc9cdd2, 0.5),
    port.x + 3.5 * MM,
    port.y,
    port.z,
  );
  sleeve.rotation.z = Math.PI / 2;
  const gripL = 16 * MM;
  const grip = add(
    root,
    new THREE.CylinderGeometry(4.5 * MM, 4.5 * MM, gripL, 20),
    mat(CABLE, 0.3),
    port.x - 1 * MM - gripL / 2,
    port.y,
    port.z,
  );
  grip.rotation.z = Math.PI / 2;

  // Battery lying on the bench along the board's front edge, terminals at the
  // end nearest the jack.
  const BW = 26.5 * MM; // along z
  const BH = 17.5 * MM;
  const BL = 48.5 * MM; // along x
  const bx = port.x + 2 * MM + BL / 2;
  const bz = boardFrontZ + 8 * MM + BW / 2;
  block(root, bx, bz, bench, BL, BH, BW, 0x2b2e35, 0.35);
  const label = decal(
    (ctx, W, H) => {
      ctx.fillStyle = "#e9b13a";
      ctx.fillRect(W * 0.86, 0, W * 0.14, H);
      ctx.fillStyle = "#f4f4f4";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `800 ${H * 0.5}px Helvetica, Arial, sans-serif`;
      ctx.fillText("9V", W * 0.4, H * 0.42);
      ctx.font = `700 ${H * 0.16}px Helvetica, Arial, sans-serif`;
      ctx.fillText("ALKALINE", W * 0.4, H * 0.8);
    },
    BL * 0.72,
    BW * 0.9,
  );
  if (label) {
    label.position.set(bx + BL * 0.1, bench + BH + 0.004, bz);
    root.add(label);
  }
  // Snap on the terminals, at the end nearest the jack.
  const snapX = bx - BL / 2 + 6 * MM;
  block(root, snapX, bz, bench + BH, 9 * MM, 3.5 * MM, 20 * MM, 0x15161a, 0.25);

  // Red and black leads from the plug down to the snap.
  const r = 0.9 * MM;
  const plugEnd = new THREE.Vector3(port.x - 1 * MM - gripL, port.y, port.z);
  for (const [color, dz] of [
    [0xd8352a, -1.4 * MM],
    [0x1d1e21, 1.4 * MM],
  ] as const) {
    root.add(
      tube(
        [
          plugEnd.clone().add(new THREE.Vector3(0, 0, dz)),
          new THREE.Vector3(plugEnd.x - 5 * MM, port.y - 3 * MM, port.z + dz),
          new THREE.Vector3(
            plugEnd.x - 4 * MM,
            bench + BH + 6 * MM,
            bz - 6 * MM + dz,
          ),
          new THREE.Vector3(snapX - 8 * MM, bench + BH + 3.5 * MM, bz + dz),
          new THREE.Vector3(snapX - 4.5 * MM, bench + BH + 1.8 * MM, bz + dz),
        ],
        r,
        color,
      ),
    );
  }
  outline(root);
  return root;
}
