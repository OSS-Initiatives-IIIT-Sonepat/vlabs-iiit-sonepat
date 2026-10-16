export const BASE = ["bb", "psu", "w_vcc_link", "w_gnd_link", "cnt", "w_cnt_vcc", "w_cnt_gnd"];
export const CONTROLS = ["w_enp_vcc", "w_ent_vcc", "w_d0_gnd", "w_d1_gnd", "w_d2_gnd", "w_d3_gnd"];
export const OUTPUTS = ["q0", "q1", "q2", "q3", "rco"].flatMap((p) => [`r_${p}`, `led_${p}`, `w_${p}_r`, `w_${p}_gnd`]);
export const MOD10 = ["nand", "w_nand_vcc", "w_nand_gnd", "w_q3_nand", "w_q0_nand", "w_ld_nand"];

export const CLOCK_READING = { psu: "5.00 V", fg: "square 1 Hz, 0–5 V" };

/** LED map for a count: Q0–Q3 show the bits, RCO lights at 15. */
export function countLeds(n: number): Record<string, number> {
  return {
    led_q0: n & 1,
    led_q1: (n >> 1) & 1,
    led_q2: (n >> 2) & 1,
    led_q3: (n >> 3) & 1,
    led_rco: n === 15 ? 1 : 0,
  };
}
