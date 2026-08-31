import * as THREE from 'three';

import {
  PITCH,
  BOARD_H,
  COLS,
  TOP_Y,
  Z,
  colToX,
  BOARD_D,
} from '../coords';

import { M } from './materials';
import { solidBox, textLabel } from './primitives';

const SURF = TOP_Y + 0.0005;
const LIFT = 0.002;

function holeGrid(
  cols: number,
  rows: string[],
  size: number,
  depth: number,
): THREE.InstancedMesh {
  const geometry = new THREE.BoxGeometry(
    size,
    depth,
    size,
  );

  const mesh = new THREE.InstancedMesh(
    geometry,
    M.hole(),
    cols * rows.length,
  );

  const dummy = new THREE.Object3D();

  let index = 0;

  for (let c = 1; c <= cols; c++) {
    for (const row of rows) {
      dummy.position.set(
        colToX(c),
        TOP_Y - depth / 2 + LIFT,
        Z[row],
      );

      dummy.updateMatrix();
      mesh.setMatrixAt(index++, dummy.matrix);
    }
  }

  mesh.instanceMatrix.needsUpdate = true;

  return mesh;
}

function railHoles(
  cols: number,
  row: string,
): THREE.InstancedMesh {
  const geometry = new THREE.BoxGeometry(
    PITCH * 0.48,
    BOARD_H * 0.62,
    PITCH * 0.48,
  );

  const mesh = new THREE.InstancedMesh(
    geometry,
    M.hole(),
    cols,
  );

  const dummy = new THREE.Object3D();

  for (let c = 1; c <= cols; c++) {
    dummy.position.set(
      colToX(c),
      TOP_Y - BOARD_H * 0.62 / 2 + LIFT,
      Z[row],
    );

    dummy.updateMatrix();
    mesh.setMatrixAt(c - 1, dummy.matrix);
  }

  mesh.instanceMatrix.needsUpdate = true;

  return mesh;
}

function railMarkings(cols: number): THREE.Group {
  const group = new THREE.Group();

  const redMaterial = new THREE.MeshBasicMaterial({
    color: 0xd9342b,
  });

  const blueMaterial = new THREE.MeshBasicMaterial({
    color: 0x2563a8,
  });

  const startX = colToX(1);
  const endX = colToX(cols);

  const width = endX - startX + PITCH;

  const lineOffset = PITCH * 0.75;

  const railPairs = [
    {
      row1: 'rail_top_red',
      row2: 'rail_top_blue',
    },
    {
      row1: 'rail_bot_red',
      row2: 'rail_bot_blue',
    },
  ];

  for (const pair of railPairs) {
    const z1 = Z[pair.row1];
    const z2 = Z[pair.row2];

    const topHoleZ = Math.min(z1, z2);
    const bottomHoleZ = Math.max(z1, z2);

    const blueZ = topHoleZ - lineOffset;
    const redZ = bottomHoleZ + lineOffset;

    const blueLine = new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.006,
        0.022,
      ),
      blueMaterial,
    );

    blueLine.position.set(
      (startX + endX) / 2,
      SURF + 0.006,
      blueZ,
    );

    group.add(blueLine);

    const redLine = new THREE.Mesh(
      new THREE.BoxGeometry(
        width,
        0.006,
        0.022,
      ),
      redMaterial,
    );

    redLine.position.set(
      (startX + endX) / 2,
      SURF + 0.006,
      redZ,
    );

    group.add(redLine);
  }

  return group;
}

function centreGap(cols: number): THREE.Group {
  const group = new THREE.Group();

  const gapZ =
    (Z['e'] + Z['f']) / 2;

  const width =
    colToX(cols) - colToX(1) + PITCH;

  const gapDepth =
    Math.abs(Z['f'] - Z['e']) * 0.72;

  const channel = new THREE.Mesh(
    new THREE.BoxGeometry(
      width + 0.16,
      0.012,
      gapDepth,
    ),
    new THREE.MeshBasicMaterial({
      color: 0xcfc8ba,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );

  channel.position.set(
    (colToX(1) + colToX(cols)) / 2,
    SURF + 0.001,
    gapZ,
  );

  group.add(channel);

  const shadow = new THREE.Mesh(
    new THREE.BoxGeometry(
      width,
      0.003,
      gapDepth * 0.22,
    ),
    new THREE.MeshBasicMaterial({
      color: 0xaaa397,
      transparent: true,
      opacity: 0.4,
    }),
  );

  shadow.position.set(
    (colToX(1) + colToX(cols)) / 2,
    SURF + 0.006,
    gapZ,
  );

  group.add(shadow);

  return group;
}

function rowLabels(cols: number): THREE.Group {
  const group = new THREE.Group();

  const rows = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
  ] as const;

  const leftX =
    colToX(1) - PITCH * 1.45;

  const rightX =
    colToX(cols) + PITCH * 1.45;

  for (const row of rows) {
    for (const x of [leftX, rightX]) {
      const label = textLabel(
        row.toUpperCase(),
        PITCH * 1.15,
        PITCH * 0.72,
        {
          textColor: '#171717',
          fontSize: 52,
          bold: true,
        },
      );

      if (!label) continue;

      label.rotation.x = -Math.PI / 2;

      label.position.set(
        x,
        SURF + 0.008,
        Z[row],
      );

      group.add(label);
    }
  }

  return group;
}

function columnLabels(cols: number): THREE.Group {
  const group = new THREE.Group();

  const numbers = [
    1,
    5,
    10,
    15,
    20,
    25,
    30,
  ];

  const topZ =
    Z['a'] - PITCH * 1.15;

  const bottomZ =
    Z['j'] + PITCH * 1.15;

  for (const number of numbers) {
    if (number > cols) continue;

    const x = colToX(number);

    for (const z of [topZ, bottomZ]) {
      const label = textLabel(
        String(number),
        PITCH * 1.15,
        PITCH * 0.72,
        {
          textColor: '#171717',
          fontSize: 48,
          bold: true,
        },
      );

      if (!label) continue;

      label.rotation.x = -Math.PI / 2;

      label.position.set(
        x,
        SURF + 0.008,
        z,
      );

      group.add(label);
    }
  }

  return group;
}

function groupSeparators(cols: number): THREE.Group {
  const group = new THREE.Group();

  const material = new THREE.LineBasicMaterial({
    color: 0xb8b0a1,
    transparent: true,
    opacity: 0.28,
  });

  const topZ =
    Z['a'] - PITCH * 0.55;

  const bottomZ =
    Z['j'] + PITCH * 0.55;

  for (let c = 5; c < cols; c += 5) {
    const x =
      (colToX(c) + colToX(c + 1)) / 2;

    const points = [
      new THREE.Vector3(
        x,
        SURF + 0.004,
        topZ,
      ),
      new THREE.Vector3(
        x,
        SURF + 0.004,
        bottomZ,
      ),
    ];

    group.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(points),
        material,
      ),
    );
  }

  return group;
}

function railLabels(cols: number): THREE.Group {
  const group = new THREE.Group();

  const rails = [
    {
      text: '+',
      row: 'rail_top_red',
      color: '#c62828',
    },
    {
      text: '−',
      row: 'rail_top_blue',
      color: '#2563a8',
    },
    {
      text: '−',
      row: 'rail_bot_blue',
      color: '#2563a8',
    },
    {
      text: '+',
      row: 'rail_bot_red',
      color: '#c62828',
    },
  ];

  const leftX =
    colToX(1) - PITCH * 1.45;

  const rightX =
    colToX(cols) + PITCH * 1.45;

  for (const rail of rails) {
    for (const x of [leftX, rightX]) {
      const label = textLabel(
        rail.text,
        PITCH * 0.95,
        PITCH * 0.65,
        {
          textColor: rail.color,
          fontSize: 44,
          bold: true,
        },
      );

      if (!label) continue;

      label.rotation.x = -Math.PI / 2;

      label.position.set(
        x,
        SURF + 0.009,
        Z[rail.row],
      );

      group.add(label);
    }
  }

  return group;
}

export function buildBreadboard(
  cols = COLS,
): THREE.Group {
  const root = new THREE.Group();

  const boardWidth =
    (cols - 1) * PITCH + PITCH * 3.6;

    const boardDepth = BOARD_D;

  root.add(
    solidBox(
      boardWidth,
      BOARD_H,
      boardDepth,
      M.cream(),
    ),
  );

  const mainHoleSize =
    PITCH * 0.52;

  const mainHoleDepth =
    BOARD_H * 0.72;

  root.add(
    holeGrid(
      cols,
      ['a', 'b', 'c', 'd', 'e'],
      mainHoleSize,
      mainHoleDepth,
    ),
  );

  root.add(
    holeGrid(
      cols,
      ['f', 'g', 'h', 'i', 'j'],
      mainHoleSize,
      mainHoleDepth,
    ),
  );

  root.add(
    railHoles(
      cols,
      'rail_top_red',
    ),
  );

  root.add(
    railHoles(
      cols,
      'rail_top_blue',
    ),
  );

  root.add(
    railHoles(
      cols,
      'rail_bot_blue',
    ),
  );

  root.add(
    railHoles(
      cols,
      'rail_bot_red',
    ),
  );

  root.add(
    centreGap(cols),
  );

  root.add(
    railMarkings(cols),
  );

  root.add(
    groupSeparators(cols),
  );

  root.add(
    rowLabels(cols),
  );

  root.add(
    columnLabels(cols),
  );

  root.add(
    railLabels(cols),
  );

  return root;
}

export function buildBreadboardStandalone(): THREE.Group {
  const root =
    buildBreadboard(10);

  root.position.y =
    -TOP_Y;

  return root;
}