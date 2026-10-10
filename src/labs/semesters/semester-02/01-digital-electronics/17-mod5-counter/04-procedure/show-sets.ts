// Cumulative visibility sets shared by the procedure steps.
export const S1 = ["bb", "dc_psu"];
export const S2 = [...S1, "dff_a", "dff_b", "xor1", "and1", "or1", "nand1"];
export const S3 = [...S2, "r_q0", "led_q0", "r_q1", "led_q1", "r_q2", "led_q2"];
export const S4 = [...S3, "fg1", "w_clk"];
export const S5 = [...S4, "w_d0", "w_d1", "w_d2", "w_pre0", "w_pre1", "w_pre2"];
export const S6 = [
  ...S5,
  "w_q0_x1",
  "w_x1_clk1",
  "w_q1_x2",
  "w_x2_clk2",
  "w_ud_src",
  "w_ud_x1",
  "w_ud_x2",
];
export const S7 = [
  ...S6,
  "w_q0_and",
  "w_q2_and",
  "w_q1_or",
  "w_ud_or",
  "w_ud_nd",
  "w_and_n1",
  "w_and_n2",
  "w_or_n1",
  "w_clr0",
  "w_clr1",
  "w_clr2",
];
export const S8 = [
  ...S7,
  "w_q0_r",
  "w_r0_led",
  "w_q1_r",
  "w_r1_led",
  "w_q2_r",
  "w_r2_led",
  "w_gnd0",
  "w_gnd1",
  "w_gnd2",
];
