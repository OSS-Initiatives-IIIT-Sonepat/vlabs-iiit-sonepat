import { type LabContent } from '@/labs/lab-content.types';

export const IntroGatesReviewContent: LabContent = {
  id: 'intro-gates-review',
  title: 'Introduction to Logic Gates — Review',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Digital logic gates are the fundamental building blocks of all digital systems. A logic gate ' +
        'is a device that implements a Boolean function — it takes one or more binary inputs (HIGH = 1, ' +
        'LOW = 0) and produces a single binary output according to a fixed rule.',

        'The seven standard logic gates: ' +
        'NOT (inverter): one input, output is its complement. $Y = \\overline{A}$. ' +
        'AND: output is 1 only when all inputs are 1. $Y = A \\cdot B$. ' +
        'OR: output is 1 when at least one input is 1. $Y = A + B$. ' +
        'NAND: NOT-AND — output is 0 only when all inputs are 1. $Y = \\overline{A \\cdot B}$. ' +
        'NOR: NOT-OR — output is 1 only when all inputs are 0. $Y = \\overline{A + B}$. ' +
        'XOR (Exclusive OR): output is 1 when inputs differ. $Y = A \\oplus B = A\\overline{B} + \\overline{A}B$. ' +
        'XNOR (Exclusive NOR): output is 1 when inputs are equal. $Y = \\overline{A \\oplus B} = AB + \\overline{A}\\overline{B}$.',

        "Boolean algebra laws provide tools for simplifying logic expressions: " +
        "Identity: $A+0=A$, $A\\cdot1=A$. " +
        "Null: $A+1=1$, $A\\cdot0=0$. " +
        "Idempotent: $A+A=A$, $A\\cdot A=A$. " +
        "Complement: $A+\\overline{A}=1$, $A\\cdot\\overline{A}=0$. " +
        "Involution: $\\overline{\\overline{A}}=A$. " +
        "De Morgan's: $\\overline{A\\cdot B}=\\overline{A}+\\overline{B}$ and $\\overline{A+B}=\\overline{A}\\cdot\\overline{B}$. " +
        'Absorption: $A+A\\cdot B=A$, $A\\cdot(A+B)=A$. ' +
        'Distribution: $A(B+C)=AB+AC$, $A+BC=(A+B)(A+C)$.',

        "De Morgan's theorems are especially important: they allow conversion between AND/OR forms " +
        "with complemented outputs. They state that a NAND gate equals a bubbled-input OR gate, and a " +
        "NOR gate equals a bubbled-input AND gate. This is the basis of NAND/NOR universality.",

        'NAND and NOR are universal gates — any Boolean function can be implemented using only NAND ' +
        'gates (or only NOR gates). This is significant in IC manufacturing: a single gate type can ' +
        'implement any circuit, simplifying the fabrication process. CMOS NAND/NOR gates are also ' +
        'inherently faster and simpler to implement than AND/OR in CMOS technology.',

        'Fan-in is the number of inputs a gate can accept. Standard TTL/CMOS gates have fan-in of 2–8. ' +
        'Fan-out is the number of gate inputs a single output can drive without signal degradation. ' +
        'Typical CMOS fan-out is 10–50 (limited by capacitive loading and propagation delay increase). ' +
        'Exceeding fan-out specifications causes voltage levels to fall outside the noise margin, ' +
        'leading to logic errors.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Common Logic Gate ICs',
      items: [
        { name: '74HC00 NAND',     specification: 'Quad 2-input NAND, DIP-14, 5 V',  quantity: '1' },
        { name: '74HC02 NOR',      specification: 'Quad 2-input NOR, DIP-14, 5 V',   quantity: '1' },
        { name: '74HC04 NOT',      specification: 'Hex inverter, DIP-14, 5 V',        quantity: '1' },
        { name: '74HC08 AND',      specification: 'Quad 2-input AND, DIP-14, 5 V',   quantity: '1' },
        { name: '74HC32 OR',       specification: 'Quad 2-input OR, DIP-14, 5 V',    quantity: '1' },
        { name: '74HC86 XOR',      specification: 'Quad 2-input XOR, DIP-14, 5 V',   quantity: '1' },
        { name: '74HC266 XNOR',    specification: 'Quad 2-input XNOR, DIP-14, 5 V',  quantity: '1' },
        { name: 'Breadboard',      specification: 'Standard 830-tie-point solderless breadboard', quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Review Exercises',
      steps: [
        {
          label: "Apply De Morgan's theorem to simplify.",
          body: "Simplify $Y = \\overline{(\\overline{A}+B)(A+\\overline{B})}$. " +
            "Apply De Morgan's to outer NOT: $Y = \\overline{\\overline{A}+B} + \\overline{A+\\overline{B}}$. " +
            "Inner De Morgan's: $Y = (A\\overline{B}) + (\\overline{A}B) = A \\oplus B$. " +
            "The expression simplifies to XOR!",
        },
        {
          label: 'Implement AND using only NAND gates.',
          body: 'NAND universality: $A \\cdot B = \\overline{\\overline{A \\cdot B}}$. ' +
            'Step 1: NAND1(A, B) = $\\overline{AB}$. Step 2: NAND2($\\overline{AB}$, $\\overline{AB}$) = $\\overline{\\overline{AB}\\cdot\\overline{AB}} = AB$. ' +
            'Two NAND gates implement AND. Similarly: NOT = NAND with both inputs tied together.',
        },
        {
          label: 'Implement OR using only NOR gates.',
          body: 'NOR universality: $A + B = \\overline{\\overline{A+B}}$. ' +
            'Step 1: NOT_A = NOR(A,A). Step 2: NOT_B = NOR(B,B). ' +
            'Step 3: NOR(NOT_A, NOT_B) = $\\overline{\\overline{A}+\\overline{B}} = A \\cdot B$... that gives AND. ' +
            'For OR: NOR(NOR(A,A), NOR(B,B)) does NOT give OR. Correct: A+B = NOR(NOR(A,B), NOR(A,B)) — three NORs.',
        },
        {
          label: 'Determine fan-out limit for 74HC output.',
          body: '74HC output drives 74HC inputs. Each 74HC input draws max 1 μA (CMOS). ' +
            '74HC output can source/sink 4 mA. Fan-out = 4 mA / 1 μA = 4000 (current-limited). ' +
            'In practice, capacitive loading limits AC fan-out to ~50 in most designs. ' +
            'For long buses, bus drivers (74HC244/245) are used to buffer the signal.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations — Gate Truth Tables',
      paragraphs: [
        'All seven standard gates summarized. NAND and NOR are active-low outputs of AND/OR respectively.',
        'XOR = 1 only for odd number of 1s in input. XNOR = NOT XOR = 1 for even number of 1s.',
      ],
      table: {
        headers: ['A', 'B', 'NOT A', 'AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR'],
        rows: [
          [0, 0, 1, 0, 0, 1, 1, 0, 1],
          [0, 1, 1, 0, 1, 1, 0, 1, 0],
          [1, 0, 0, 0, 1, 1, 0, 1, 0],
          [1, 1, 0, 1, 1, 0, 0, 0, 1],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This review covered the seven standard logic gates and their truth tables, along with the key ' +
        'Boolean algebra laws used for circuit simplification. De Morgan\'s theorems enable algebraic ' +
        'manipulation between AND-OR and NOR-NAND representations.',

        'The universality of NAND and NOR gates means any digital circuit can be realized using a single ' +
        'gate type, which simplifies manufacturing and is why CMOS standard cells are primarily NAND/NOR based. ' +
        'Fan-in and fan-out constraints are practical considerations that must be respected in physical designs.',

        'For hands-on verification of these concepts, refer to the Semester 2 Logic Gates Practical Lab ' +
        'where individual gates are built on the breadboard and tested with LEDs.',
      ],
    },
  ],
};
