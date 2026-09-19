import { type LabContent } from '@/labs/lab-content.types';

export const fsmSimulation: LabContent = {
  id: 'fsm-simulation',
  title: 'FSM: Mealy & Moore Sequence Detector',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'A Finite State Machine (FSM) is a sequential circuit that moves between a fixed number of states in response to inputs, producing an output at each step. FSMs are the formal model behind every sequential digital design — counters, controllers, protocol handlers, and CPU control units are all FSMs.',
        'There are two standard FSM models. In a Mealy machine, the output depends on both the current state and the current input — the output changes as soon as the input changes, without waiting for a clock edge. In a Moore machine, the output depends only on the current state, so it changes only when the state itself changes on a clock edge.',
        'This simulator implements a classic teaching example: an overlapping "101" sequence detector. The detector scans a serial bit stream and asserts its output whenever the most recent three bits received were 1, 0, 1 — including overlapping occurrences (e.g. the input 10101 contains two overlapping "101" matches).',
        'Mealy implementation (3 states): S0 = no progress, S1 = last bit seen was 1, S2 = last two bits seen were 10. The output is asserted on the S2 --1--> S1 transition, the instant the third bit of a match arrives.',
        'Moore implementation (4 states): S0, S1, S2 as before, plus S3 = "101 just matched". Because Moore output depends only on state, a dedicated state (S3) is needed to hold the detected condition for one full clock cycle — this is why Moore machines for the same behaviour typically need one more state than the equivalent Mealy machine.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Virtual FSM Module', specification: 'Software simulation — no physical components required' },
        { name: 'Mealy Machine', specification: '3 states (S0, S1, S2), output on transition' },
        { name: 'Moore Machine', specification: '4 states (S0–S3), output on state' },
        { name: 'Serial Bit Input', specification: 'Manual single-bit feed or typed bit-string playback' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'fsm',
      description: 'Feed bits one at a time, or type a bit string and click Run. Watch the active state and transition highlight in green, and the output flag assert whenever "101" is detected.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Detect a single match (Mealy)',
          body: 'With Machine type = Mealy, click Reset, then feed 1, 0, 1 one bit at a time.\nObserve: after the third bit, the state diagram shows S2 --1/1--> S1, and Output shows Y=1. Detections = 1.',
        },
        {
          label: 'Detect an overlapping match',
          body: 'Continue feeding 0, 1.\nExpected sequence so far: 1 0 1 0 1. Observe that after the final 1, Output = 1 again — a second, overlapping "101" was found using bits 3–5 of the stream.\nDetections should now read 2.',
        },
        {
          label: 'Run a full sequence',
          body: 'Type 101101011 into the bit sequence field and click Run.\nWatch the state diagram animate one transition every ~550ms. Read the log at the bottom to confirm every detection.',
        },
        {
          label: 'Compare with the Moore machine',
          body: 'Switch Machine type to Moore and repeat the same sequence (101101011).\nObserve: the diagram now has 4 states (S0–S3). The circled inner ring on a state marks where the machine output is defined as 1 (state S3).\nCompare the step count at which Detections increments — Moore output appears one state transition later than Mealy for the same input, since Moore must first enter the dedicated "matched" state.',
        },
        {
          label: 'Trace the log',
          body: 'For both machine types, read through the step log (from --input/output--> to).\nVerify by hand: for Mealy, output is written on the arrow. For Moore, output is a property of the destination state entered.',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Run the input sequence 101101011 through both machine types and record when the detector output asserts.',
      ],
      table: {
        headers: ['Step', 'Input bit', 'Mealy state', 'Mealy output', 'Moore state', 'Moore output'],
        rows: [
          ['1', '1', '', '', '', ''],
          ['2', '0', '', '', '', ''],
          ['3', '1', '', '', '', ''],
          ['4', '1', '', '', '', ''],
          ['5', '0', '', '', '', ''],
          ['6', '1', '', '', '', ''],
          ['7', '0', '', '', '', ''],
          ['8', '1', '', '', '', ''],
          ['9', '1', '', '', '', ''],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This experiment demonstrated the design and operation of both Mealy and Moore finite state machines implementing the same overlapping "101" sequence detector.',
        'Key findings: (1) A Mealy machine achieves the same behaviour with fewer states than an equivalent Moore machine, because its output is a function of state and input together rather than state alone. (2) Mealy output can react within the same clock cycle the triggering input arrives, while Moore output lags by one state transition. (3) Moore machines are generally considered easier to reason about and less prone to timing hazards, since output is stable for the full duration of a state.',
        'FSMs like this sequence detector generalise directly to real hardware: protocol framing detectors, UART start-bit detectors, and vending-machine or traffic-light controllers are all designed using the same Mealy/Moore state-transition methodology.',
      ],
    },
  ],
};
