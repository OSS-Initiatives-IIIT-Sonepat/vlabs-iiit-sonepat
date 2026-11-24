import { type SceneProcedureStep } from "@/labs/experiments/types";
import { pointAtPin } from "../markers";

export const step: SceneProcedureStep = {
  label: "9. GPIO pins, and the ones to avoid",
  body: "Most of the other pins are GPIO, numbered by the chip (the silkscreen shows short names: S2 is GPIO2). Three groups need care. The six pins at the USB end of the front row (CLK, SD0 to SD3, CMD: GPIO6 to GPIO11) belong to the flash memory: never use them. GPIO34 to GPIO39 are inputs only, with no pull-ups. GPIO0, GPIO2, GPIO12 and GPIO15 are read at boot, so keep heavy loads off them.",
  show: ["bb", "esp", "usb"],
  highlight: "esp",
  markers: [pointAtPin("GPIO6"), pointAtPin("GPIO34"), pointAtPin("GPIO2")],
};
