export const BASE = ["bb", "psu", "w_vcc_link", "w_gnd_link", "dec", "w_dec_vcc", "w_dec_gnd"];
export const ENABLES = ["w_en2_gnd", "w_en3_gnd"];
export const ADDRESS = ["w_a0_dec", "w_a1_dec", "w_a2_dec"];
export const OUTPUTS = Array.from({ length: 8 }, (_, n) => [
  `r_y${n}`,
  `led_y${n}`,
  `w_y${n}_vcc`,
  `w_y${n}_out`,
]).flat();

/** LED brightness map with only output `selected` lit (null = all dark). */
export function selectLed(selected: number | null): Record<string, number> {
  return Object.fromEntries(Array.from({ length: 8 }, (_, n) => [`led_y${n}`, n === selected ? 1 : 0]));
}

/** Address bits for activeInputs, A0 = LSB. */
export function address(n: number): Record<string, 0 | 1> {
  return { A2: ((n >> 2) & 1) as 0 | 1, A1: ((n >> 1) & 1) as 0 | 1, A0: (n & 1) as 0 | 1 };
}
