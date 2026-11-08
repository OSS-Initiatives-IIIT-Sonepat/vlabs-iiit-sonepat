import { type SceneProcedureStep } from "@/labs/experiments/types";
import { type NetFrame } from "@/labs/networks/bench";
import { HSR_ALL, ROUTER_ADDR } from "@/labs/networks/hub-switch-router";
import { figure } from "@/labs/schematics/semester-05/01-computer-networks/hub-switch-router";

const net: NetFrame = {
  show: HSR_ALL,
  hot: ["r1", "hub-r1", "r1-sw"],
  focus: ["r1", "hub", "sw"],
  addr: ROUTER_ADDR,
  consoles: [
    {
      at: "r1",
      title: "Router console",
      lines: [
        "Router(config)#interface g0/0",
        "Router(config-if)#ip address 192.168.1.1 255.255.255.0",
        "Router(config-if)#no shutdown",
        "Router(config-if)#interface g0/1",
        "Router(config-if)#ip address 192.168.2.1 255.255.255.0",
        "Router(config-if)#no shutdown",
      ],
    },
  ],
};

export const step: SceneProcedureStep = {
  label: "Cable and configure the router",
  body: "Cable the hub to the router's Gi0/0 and the switch to Gi0/1. Router ports are shut down until you turn them on, so the lights stay red.\n\nFrom the router's console, give each port an address in its room's network and turn it on with no shutdown. The lights turn green. The router now has a route to both networks.",
  show: [],
  schematic: figure(net),
  net,
};
