export const BASE = ["bb", "psu", "w_vcc_link", "w_gnd_link", "enc", "w_enc_vcc", "w_enc_gnd"];
export const INPUTS = Array.from({ length: 8 }, (_, n) => `w_i${n}_enc`);
export const OUTPUTS = ["a2", "a1", "a0", "gs", "eo"].flatMap((p) => [`r_${p}`, `led_${p}`, `w_${p}_vcc`, `w_${p}_out`]);

/** activeInputs with the listed inputs pulled LOW (active) and the rest HIGH. */
export function inputs(active: number[]): Record<string, 0 | 1> {
  return Object.fromEntries(Array.from({ length: 8 }, (_, n) => [`I${n}`, active.includes(n) ? 0 : 1])) as Record<
    string,
    0 | 1
  >;
}

/** LED map: an LED is lit when its active-LOW output is LOW. */
export function outputLeds(active: number[], disabled = false): Record<string, number> {
  if (disabled) return { led_a2: 0, led_a1: 0, led_a0: 0, led_gs: 0, led_eo: 0 };
  if (active.length === 0) return { led_a2: 0, led_a1: 0, led_a0: 0, led_gs: 0, led_eo: 1 };
  const n = Math.max(...active);
  return {
    led_a2: (n >> 2) & 1,
    led_a1: (n >> 1) & 1,
    led_a0: n & 1,
    led_gs: 1,
    led_eo: 0,
  };
}
