import { type ComponentInstance } from "@/labs/types";

export const components: ComponentInstance[] = [
  {
    id: "bb",
    type: "breadboard",
  },

  {
    id: "psu",
    type: "dc-jack",
    mountedAt: {
      board: "bb",
      col: 1,
      row: "a",
    },
    terminals: [
      {
        board: "bb",
        rail: "vcc_top",
        col: 3,
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 3,
      },
    ],
  },

  {
    id: "opamp1",
    type: "op-amp",
    mountedAt: {
      board: "bb",
      col: 25,
      row: "e",
    },
  },

  {
    id: "fg",
    type: "function-generator",
    mountedAt: {
      board: "bb",
      col: 5,
      row: "a",
    },
    probes: [
      {
        board: "bb",
        col: 10,
        row: "c",
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 10,
      },
    ],
  },

  {
    id: "r_in",
    type: "resistor",
    ohms: 10000,
    mountedAt: {
      board: "bb",
      col: 15,
      row: "c",
    },
  },

  {
    id: "r_f",
    type: "resistor",
    ohms: 100000,
    mountedAt: {
      board: "bb",
      col: 35,
      row: "c",
    },
  },

  {
    id: "r_1",
    type: "resistor",
    ohms: 10000,
    mountedAt: {
      board: "bb",
      col: 35,
      row: "g",
    },
  },

  {
    id: "scope",
    type: "oscilloscope",
    probes: [
      {
        board: "bb",
        col: 10,
        row: "c",
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 10,
      },
    ],
  },

  {
    id: "vm",
    type: "voltmeter",
    mountedAt: {
      board: "bb",
      col: 55,
      row: "f",
    },
    probes: [
      {
        board: "bb",
        col: 45,
        row: "c",
      },
      {
        board: "bb",
        rail: "gnd_top",
        col: 45,
      },
    ],
  },

  // Function generator input → Rin
  {
    id: "w_fg_in",
    type: "wire",
    color: "blue",
    from: {
      board: "bb",
      col: 10,
      row: "c",
    },
    to: {
      component: "r_in",
      end: "p1",
    },
  },

  // Rin → LM741 pin 2 (inverting input)
  {
    id: "w_rin_pin2",
    type: "wire",
    color: "orange",
    from: {
      component: "r_in",
      end: "p2",
    },
    to: {
      ic: "opamp1",
      pin: "2",
    },
  },

  // LM741 pin 6 (output) → feedback resistor
  {
    id: "w_pin6_rf",
    type: "wire",
    color: "green",
    from: {
      ic: "opamp1",
      pin: "6",
    },
    to: {
      component: "r_f",
      end: "p1",
    },
  },

  // Feedback resistor → pin 2
  {
    id: "w_rf_pin2",
    type: "wire",
    color: "purple",
    from: {
      component: "r_f",
      end: "p2",
    },
    to: {
      ic: "opamp1",
      pin: "2",
    },
  },

  // Non-inverting input pin 3 → ground
  {
    id: "w_pin3_gnd",
    type: "wire",
    color: "black",
    from: {
      ic: "opamp1",
      pin: "3",
    },
    to: {
      board: "bb",
      rail: "gnd_top",
      col: 20,
    },
  },

  // Positive supply pin 7
  {
    id: "w_pin7_vcc",
    type: "wire",
    color: "red",
    from: {
      ic: "opamp1",
      pin: "7",
    },
    to: {
      board: "bb",
      rail: "vcc_top",
      col: 20,
    },
  },

  // Negative supply pin 4
  {
    id: "w_pin4_gnd",
    type: "wire",
    color: "black",
    from: {
      ic: "opamp1",
      pin: "4",
    },
    to: {
      board: "bb",
      rail: "gnd_bot",
      col: 20,
    },
  },

  // Output → oscilloscope
  {
    id: "w_out_scope",
    type: "wire",
    color: "green",
    from: {
      ic: "opamp1",
      pin: "6",
    },
    to: {
      board: "bb",
      col: 45,
      row: "c",
    },
  },
];
