// ── Explore page data ──────────────────────────────────────────────────────
// Each subject card has rich metadata so that the search feature can surface
// it by title, description, tags, semester, category, and circuit id.

export type ExploreSubjectCard = {
  /** Unique id — also used to link to the lab page */
  id: string;
  /** Human readable title */
  title: string;
  /** One-paragraph description shown on the card */
  description: string;
  /** Circuit id from ALL_CIRCUITS (used to render the 3D scene) */
  circuitId: string;
  /** Broad subject category */
  category: string;
  /** Free-form searchable tags */
  tags: readonly string[];
  /** Route to the interactive lab, if available */
  labRoute?: string;
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubjectCard[];
};

// ── Semester 1 ─────────────────────────────────────────────────────────────
const SEMESTER_1: ExploreSemester = {
  id: 'semester-1',
  label: 'Semester 1',
  subjects: [
    {
      id: 'half-adder',
      title: 'Half Adder',
      description:
        'A half adder adds two single-bit inputs A and B, producing a Sum (XOR) and Carry (AND) bit. ' +
        'Built on a breadboard with one XOR gate, one AND gate, two current-limiting resistors, and two LEDs.',
      circuitId: 'half-adder',
      category: 'Analog Electronics',
      tags: ['adder', 'xor', 'and', 'combinational logic', 'digital circuits', 'gates', 'breadboard', 'led'],
      labRoute: '/labs/half-adder',
    },
    {
      id: 'full-adder',
      title: 'Full Adder',
      description:
        'A full adder extends the half adder by accepting a carry-in bit, enabling multi-bit addition. ' +
        'Realised with two XOR gates, two AND gates, and one OR gate.',
      circuitId: 'full-adder',
      category: 'Electronics and Electrical',
      tags: ['adder', 'carry', 'xor', 'and', 'or', 'combinational logic', 'digital', 'breadboard'],
    },
    {
      id: 'half-subtractor',
      title: 'Half Subtractor',
      description:
        'The half subtractor computes A − B, yielding a Difference (XOR) and a Borrow ((NOT A) AND B). ' +
        'Demonstrates how NOT gates invert logic to implement subtraction.',
      circuitId: 'half-subtractor',
      category: 'Computer Application',
      tags: ['subtractor', 'xor', 'not', 'and', 'borrow', 'combinational logic', 'digital', 'breadboard'],
    },
    {
      id: 'full-subtractor',
      title: 'Full Subtractor',
      description:
        'The full subtractor handles a borrow-in, allowing cascading multi-bit subtraction operations ' +
        'in ALUs and arithmetic pipelines.',
      circuitId: 'full-subtractor',
      category: 'Analog Electronics',
      tags: ['subtractor', 'borrow', 'multi-bit', 'alu', 'combinational logic', 'digital', 'breadboard'],
    },
    {
      id: 'mux-2to1',
      title: '2:1 Multiplexer',
      description:
        'A multiplexer selects one of two data inputs and forwards it to a single output line, ' +
        'controlled by a selector bit. Foundation of bus routing and data path design.',
      circuitId: 'mux-2to1',
      category: 'Electronics and Electrical',
      tags: ['mux', 'multiplexer', 'selector', 'data routing', 'combinational', 'digital', 'breadboard'],
    },
    {
      id: 'demux-1to2',
      title: '1:2 Demultiplexer',
      description:
        'A demultiplexer routes a single input to one of two output lines based on a select signal. ' +
        'Inverse of the MUX — used in address decoding and signal distribution.',
      circuitId: 'demux-1to2',
      category: 'Computer Application',
      tags: ['demux', 'demultiplexer', 'address decoding', 'combinational', 'digital', 'breadboard'],
    },
  ],
};

// ── Semester 2 ─────────────────────────────────────────────────────────────
const SEMESTER_2: ExploreSemester = {
  id: 'semester-2',
  label: 'Semester 2',
  subjects: [
    {
      id: 'encoder-4to2',
      title: '4:2 Priority Encoder',
      description:
        'A priority encoder converts four input lines to a 2-bit binary code. ' +
        'When multiple inputs are active simultaneously the highest-priority input wins.',
      circuitId: 'encoder-4to2',
      category: 'Analog Electronics',
      tags: ['encoder', 'priority', 'binary', 'combinational', 'digital', 'gates', 'breadboard'],
    },
    {
      id: 'decoder-2to4',
      title: '2:4 Binary Decoder',
      description:
        'A binary decoder maps a 2-bit input code to one of four mutually exclusive output lines. ' +
        'Core building block for memory address decoding and display drivers.',
      circuitId: 'decoder-2to4',
      category: 'Electronics and Electrical',
      tags: ['decoder', 'binary', 'address decode', 'display driver', 'combinational', 'digital', 'breadboard'],
    },
    {
      id: 'half-adder-s2',
      title: 'Half Adder (Revisit)',
      description:
        'Revisit the half adder with a focus on propagation delay, fan-out, and how real 74HC-series ' +
        'ICs behave under varying supply voltages.',
      circuitId: 'half-adder',
      category: 'Computer Application',
      tags: ['adder', 'propagation delay', 'fan-out', '74hc', 'timing', 'digital', 'breadboard'],
    },
    {
      id: 'full-adder-s2',
      title: 'Full Adder (4-bit Ripple)',
      description:
        'Chain four full adders to build a 4-bit ripple-carry adder. ' +
        'Explore carry propagation latency and compare with carry-lookahead alternatives.',
      circuitId: 'full-adder',
      category: 'Analog Electronics',
      tags: ['ripple carry', '4-bit adder', 'carry propagation', 'digital', 'breadboard', 'alu'],
    },
    {
      id: 'mux-s2',
      title: 'MUX-based Logic',
      description:
        'Discover how a multiplexer alone can implement any arbitrary Boolean function — ' +
        'a technique used in FPGA look-up tables (LUTs).',
      circuitId: 'mux-2to1',
      category: 'Electronics and Electrical',
      tags: ['mux', 'lut', 'fpga', 'boolean', 'combinational', 'digital', 'breadboard'],
    },
    {
      id: 'demux-s2',
      title: 'DEMUX Address Decoder',
      description:
        'Use a demultiplexer as an active-low address decoder to select one of two peripheral ' +
        'devices on a shared bus — a fundamental microcontroller interfacing pattern.',
      circuitId: 'demux-1to2',
      category: 'Computer Application',
      tags: ['demux', 'address decoder', 'bus', 'microcontroller', 'peripheral', 'digital', 'breadboard'],
    },
  ],
};

export const EXPLORE_SEMESTERS: readonly ExploreSemester[] = [SEMESTER_1, SEMESTER_2];

// ── Featured card (shown in the hero) ─────────────────────────────────────
export const FEATURED_SUBJECT = SEMESTER_1.subjects[0];

// ── Flat list for search ───────────────────────────────────────────────────
export const ALL_SUBJECTS: readonly ExploreSubjectCard[] =
  EXPLORE_SEMESTERS.flatMap((s) => s.subjects);
