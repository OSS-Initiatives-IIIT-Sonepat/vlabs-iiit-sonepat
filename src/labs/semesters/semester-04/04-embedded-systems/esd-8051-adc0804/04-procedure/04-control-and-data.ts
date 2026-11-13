import { type SceneProcedureStep } from "@/labs/experiments/types";
import { adcChain } from "@/labs/schematics/semester-04/04-embedded-systems/esd-diagrams";

export const step: SceneProcedureStep = {
  label: "Wire the control lines and the data bus",
  body: "Connect RD to P3.7, WR to P3.6 and INTR to P3.2. Connect the eight data pins DB0 to DB7 to P1.0 to P1.7, one jumper each. These are the only wires between the ADC and the trainer, so check each one against its pin label before you go on.",
  show: ["bb", "mcu", "adc", "r_top", "r_bot", "r_clk", "c_clk", "w_top", "w_vinp", "w_bot", "w_vinn", "w_clkr", "w_clkin", "w_rclk_vcc", "w_cclk_gnd", "w_cs", "w_vcc_mcu", "w_gnd_mcu", "w_rst", "w_vcc_adc", "w_agnd", "w_dgnd", "w_rd", "w_wr", "w_intr", "w_db0", "w_db1", "w_db2", "w_db3", "w_db4", "w_db5", "w_db6", "w_db7"],
  highlight: "w_intr",
  schematic: adcChain()[3],
};
