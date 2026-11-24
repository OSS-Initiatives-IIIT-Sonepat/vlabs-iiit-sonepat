import { describe, expect, it } from "vitest";

import { EXPLORE_SEMESTERS } from "@/sections/explore/explore.data";
import { figureFor, SUBJECT_IDS } from "@/sections/explore/anatomy/figures";

const FRAME = 1 / 60;

/** Run a figure's model for `seconds`; returns frames until it stopped. */
function run(
  def: NonNullable<ReturnType<typeof figureFor>>,
  state: unknown,
  on: boolean,
  seconds: number,
) {
  for (let frame = 0; frame < seconds / FRAME; frame++) {
    const moving = def.step(state, FRAME, on, false);
    def.draw(state, () => null);
    if (!moving) return frame;
  }
  return Infinity;
}

describe("explore card figures", () => {
  it("draws a figure for every subject on the explore page", () => {
    const ids = EXPLORE_SEMESTERS.flatMap((s) => s.subjects.map((x) => x.id));
    for (const id of ids) expect(figureFor(id), id).not.toBeNull();
    expect(new Set(SUBJECT_IDS).size).toBe(SUBJECT_IDS.length);
  });

  it.each(SUBJECT_IDS)("%s runs on hover and settles at rest", (id) => {
    const def = figureFor(id)!;
    expect(def.svg.length).toBeGreaterThan(2000);
    expect(def.svg).not.toContain("NaN");
    const state = def.rest();
    const resting = def.readout(state);

    // Hovered: the machine keeps moving and the readout changes.
    expect(run(def, state, true, 6)).toBe(Infinity);
    expect(def.readout(state)).not.toBe(resting);

    // Released: it returns to rest and the loop stops.
    expect(run(def, state, false, 20)).toBeLessThan(Infinity);
    expect(def.readout(state)).toBe(resting);
  });
});
