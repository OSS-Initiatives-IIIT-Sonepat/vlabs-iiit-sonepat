import * as THREE from "three";

import { buildBreadboard } from "@/components/breadboard";
import { LONG_COLS, TOP_Y, WIDE_COLS } from "@/labs/coords";

/** Full-size solderless breadboard — 60 columns, same row layout as `breadboard`. */
export function buildLongBreadboard(): THREE.Group {
  return buildBreadboard(LONG_COLS);
}

export function buildLongBreadboardStandalone(): THREE.Group {
  const root = buildBreadboard(LONG_COLS);
  root.position.y = -TOP_Y;
  return root;
}

/** 100 columns. Same rows and rails as the long board, for a wider circuit. */
export function buildWideBreadboard(): THREE.Group {
  return buildBreadboard(WIDE_COLS);
}
