export const BASE = ["bb", "psu", "w_vcc_link", "w_gnd_link", "cnt", "w_cnt_vcc", "w_cnt_gnd"];
export const RESETS_GND = ["w_r01_gnd", "w_r02_gnd"];
export const RESETS_DECADE = ["w_r01_qb", "w_r02_qd"];
export const OUTPUTS = ["qa", "qb", "qc", "qd"].flatMap((p) => [`r_${p}`, `led_${p}`, `w_${p}_r`, `w_${p}_gnd`]);
export const LINK = ["w_qa_clkb"];

export const CLOCK_READING = { psu: "5.00 V", fg: "square 1 Hz, 0–5 V" };

/** LED map for a count: QA is the least significant bit. */
export function countLeds(n: number): Record<string, number> {
  return {
    led_qa: n & 1,
    led_qb: (n >> 1) & 1,
    led_qc: (n >> 2) & 1,
    led_qd: (n >> 3) & 1,
  };
}
