import {
  type ChipPin,
  type Pt,
  type SchematicData,
  type SchematicElement,
} from "@/labs/CircuitSchematic";
import { chipPin, pinsOf } from "@/labs/schematics/geometry";

// A schematic drawn once and revealed in stages. Every element belongs to a
// stage; frame k shows the stages up to k and highlights that stage's focus,
// so the 2D drawing grows with the 3D bench, one step at a time.

type Chip = Extract<SchematicElement, { type: "chip" }>;

/** A stage reveals the elements of one tag, or of several at once. */
export type Stage = { tag: string | string[]; title?: string; focus?: string };

export class Sheet {
  private items: { tag: string; el: SchematicElement }[] = [];

  constructor(
    readonly width: number,
    readonly height: number,
  ) {}

  add<T extends SchematicElement>(tag: string, el: T): T {
    this.items.push({ tag, el });
    return el;
  }

  wire(tag: string, id: string, ...points: Pt[]) {
    this.add(tag, { type: "wire", id, points });
  }

  dot(tag: string, id: string, p: Pt) {
    this.add(tag, { type: "junction", id, x: p.x, y: p.y });
  }

  text(
    tag: string,
    id: string,
    x: number,
    y: number,
    text: string,
    anchor: "start" | "middle" | "end" = "middle",
    size = 9,
  ) {
    this.add(tag, {
      type: "label",
      id,
      x,
      y,
      text,
      anchor,
      size,
      color: "#525252",
    });
  }

  chip(tag: string, el: Omit<Chip, "type">): Chip {
    return this.add(tag, { type: "chip", ...el });
  }

  /** One frame per stage, each showing that stage and all before it. */
  frames(stages: Stage[]): SchematicData[] {
    return stages.map((stage, k) => {
      const shown = new Set(stages.slice(0, k + 1).flatMap((s) => s.tag));
      const elements = this.items
        .filter((i) => shown.has(i.tag))
        .map(({ el }) =>
          el.id === stage.focus
            ? ({ ...el, highlight: true } as SchematicElement)
            : el,
        );
      if (stage.title)
        elements.push({
          type: "label",
          id: "stage-title",
          x: 12,
          y: 18,
          text: stage.title,
          anchor: "start",
          size: 11,
          weight: 600,
          color: "#171717",
        });
      return { width: this.width, height: this.height, elements };
    });
  }
}

/** World position of a named chip pin. */
export const at = (chip: Chip, name: string): Pt => chipPin(chip, name);

/** The two pins of a two-terminal symbol: [first, second]. */
export function ends(el: SchematicElement): [Pt, Pt] {
  const p = pinsOf(el);
  return [p[0], p[1]];
}

export const P = (x: number, y: number): Pt => ({ x, y });

export const pinOf = (name: string, num?: number): ChipPin => ({ name, num });
