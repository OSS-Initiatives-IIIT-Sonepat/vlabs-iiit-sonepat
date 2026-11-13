import { type SceneProcedureStep } from "@/labs/experiments/types";
import { adcChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Build the clock and power the chips",
  body: "Connect CLKR to column 10, row a and CLKIN to column 10, row b. Place the 10 kohm clock resistor from column 10 to 13 on row c, and the 150 pF capacitor on row e from column 10 to 11. Connect the resistor's far leg to VCC and the capacitor's far leg to ground. Connect VCC of the ADC and the trainer to the top rail, and AGND, DGND and CS to the ground rail. RST of the trainer goes to ground.",
  show: ["bb", "mcu", "adc", "r_top", "r_bot", "w_top", "w_vinp", "w_bot", "w_vinn", "r_clk", "c_clk", "w_clkr", "w_clkin", "w_rclk_vcc", "w_cclk_gnd", "w_cs", "w_vcc_mcu", "w_gnd_mcu", "w_rst", "w_vcc_adc", "w_agnd", "w_dgnd"],
  highlight: "c_clk",
  schematic: adcChain()[4],
};
