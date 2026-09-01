import { type LabContent } from '@/labs/lab-content.types';

export const cpuDesign: LabContent = {
  id: 'cpu-design',
  title: 'CPU: Fetch-Decode-Execute Cycle',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'The Central Processing Unit (CPU) operates by repeatedly performing a three-stage cycle: Fetch, Decode, and Execute. This is the fundamental operational loop of every stored-program computer.',
        'Fetch: The CPU reads the instruction at the address stored in the Program Counter (PC). The instruction is loaded into the Instruction Register (IR), and the PC is incremented to point to the next instruction.',
        'Decode: The control unit interprets the opcode (operation code) stored in the IR. It identifies the instruction type, the source and destination operands, and generates control signals for the datapath.',
        'Execute: The operation is performed. For arithmetic instructions, the ALU computes the result. For LOAD/STORE instructions, data is transferred between registers and memory. For JUMP instructions, the PC is updated to a new address.',
        'Datapath components: The Register File holds 4 general-purpose registers (R0–R3), each 8 bits wide. The ALU performs arithmetic and logic. The Memory unit provides 256 addressable byte locations. The PC, IR, and control logic complete the datapath.',
        'Instruction set architecture (ISA): This simulator implements a minimal 6-instruction ISA:\n  • LOAD Rx, #imm — load immediate value\n  • LOAD Rx, [addr] — load from memory\n  • ADD Rd, Rs1, Rs2 — add registers\n  • STORE Rs, [addr] — store to memory\n  • JUMP addr — unconditional branch\n  • HALT — stop execution',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Program Counter (PC)', specification: '8-bit register holding the address of the next instruction' },
        { name: 'Instruction Register (IR)', specification: 'Holds the currently fetched instruction text' },
        { name: 'Register File', specification: '4 × 8-bit general-purpose registers: R0, R1, R2, R3' },
        { name: 'ALU', specification: '8-bit adder for ADD instruction' },
        { name: 'Data Memory', specification: '256 bytes — writeable at runtime' },
        { name: 'Control Unit', specification: 'Decodes ISA instructions and drives datapath' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'cpu',
      description: 'Use Step to execute one instruction at a time. Watch the active block highlight and the stage label. Edit the program to try your own instruction sequences.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Load the program',
          body: 'The simulator is pre-loaded with a 5-instruction program:\n  LOAD R0, #10\n  LOAD R1, #20\n  ADD R2, R0, R1\n  STORE R2, [30]\n  HALT\nVerify the program is visible in the Program panel. PC starts at 0.',
        },
        {
          label: 'FETCH first instruction',
          body: 'Click Step once.\nObserve: Stage = FETCH → EXECUTE. PC advances to 1. R0 is loaded with the value 10.\nThe PC block and Register File block highlight to show data flow.\nCurrent IR shows "LOAD R0, #10".',
        },
        {
          label: 'Execute LOAD R1',
          body: 'Click Step again.\nObserve: R1 = 20. PC = 2.\nBoth R0 and R1 now hold their values. The instruction "LOAD R1, #20" completes.',
        },
        {
          label: 'Execute ADD',
          body: 'Click Step for the ADD instruction.\nObserve: Stage shows "EXECUTE: ADD R2 = 10 + 20 = 30". The ALU block highlights.\nR2 now holds 30 (0x1E).',
        },
        {
          label: 'Execute STORE',
          body: 'Click Step for the STORE instruction.\nObserve: Memory block highlights. mem[30] = 30 (value of R2).\nThe Memory panel shows "[30]=30" as a non-zero memory cell.',
        },
        {
          label: 'HALT and write a new program',
          body: 'Click Step once more to reach HALT.\nThen click Edit Program and write a new program using JUMP for a loop:\n  LOAD R0, #0\n  LOAD R1, #1\n  ADD R0, R0, R1\n  JUMP 2\n  HALT\nSave and step through it. R0 increments on each loop iteration.',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Step through the default program and record the CPU state after each instruction executes.',
      ],
      table: {
        headers: ['Step', 'Instruction', 'PC after', 'R0', 'R1', 'R2', 'R3', 'mem[30]', 'Stage'],
        rows: [
          ['1', 'LOAD R0, #10', '1', '', '', '', '', '—', 'EXECUTE'],
          ['2', 'LOAD R1, #20', '2', '', '', '', '', '—', 'EXECUTE'],
          ['3', 'ADD R2, R0, R1', '3', '', '', '', '', '—', 'EXECUTE'],
          ['4', 'STORE R2, [30]', '4', '', '', '', '', '', 'EXECUTE'],
          ['5', 'HALT', '5', '', '', '', '', '', 'HALTED'],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This experiment demonstrated the complete fetch-decode-execute cycle on a minimal stored-program CPU. Each instruction transitions through clearly defined stages, and the datapath components (PC, IR, ALU, register file, memory) each play a distinct role.',
        'The STORE instruction writes register values to memory, bridging the CPU and memory subsystem. The ADD instruction activates the ALU datapath while leaving memory unchanged.',
        'The JUMP instruction changes the PC to a non-sequential address, enabling loops and conditional control flow — the basis of all programming. Combined with a conditional flag test (not implemented here), JUMP becomes the building block of if-else and while constructs.',
        'Modern out-of-order CPUs execute many instructions simultaneously using pipelining and superscalar techniques, but the logical fetch-decode-execute abstraction remains the programming model that software relies upon.',
      ],
    },
  ],
};
