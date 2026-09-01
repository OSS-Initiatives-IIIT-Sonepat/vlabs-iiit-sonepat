import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085AddSub8bitContent: LabContent = {
  id: '8085-add-sub-8bit',
  title: 'Addition & Subtraction of Two 8-bit Numbers',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'The Intel 8085 microprocessor is an 8-bit processor that performs arithmetic operations through its Arithmetic and Logic Unit (ALU). The accumulator register A is the central register in all arithmetic operations and always holds one of the operands as well as the result.',
        'The ADD instruction adds the content of any 8-bit register (B, C, D, E, H, L) or memory location M to the accumulator and stores the result back in A. Syntax: ADD r. The instruction affects the Sign (S), Zero (Z), Auxiliary Carry (AC), Parity (P), and Carry (CY) flags.',
        'The SUB instruction subtracts the content of a register from the accumulator using 2\'s complement subtraction. If the minuend is less than the subtrahend, the Carry flag (CY) is set indicating a borrow. Syntax: SUB r.',
        'LDA (Load Accumulator) loads the byte at a 16-bit memory address into A. STA (Store Accumulator) stores A to a 16-bit address. MOV copies data between registers. These data-transfer instructions do not affect flags except XCHG.',
        'Algorithm: Load NUM1 from 8000H → save to B. Load NUM2 → ADD B gives sum, store to 8002H. Reload NUM1 → B=NUM1. Load NUM2 → C=NUM2. MOV A,B then SUB C gives difference, store to 8003H.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Add and subtract two 8-bit numbers stored in memory.',
      starterCode: `; Add and subtract two 8-bit numbers
; Input:  NUM1 at 8000H, NUM2 at 8001H
; Output: SUM at 8002H, DIFF at 8003H

        ORG 8000H
NUM1:   DB  25H        ; First number = 37
NUM2:   DB  17H        ; Second number = 23

        ORG 8100H
START:
        LDA  8000H     ; Load NUM1 into A
        MOV  B,A       ; Save NUM1 in B
        LDA  8001H     ; Load NUM2 into A
        ADD  B         ; A = NUM2 + NUM1
        STA  8002H     ; Store sum at 8002H

        LDA  8000H     ; Reload NUM1
        MOV  B,A       ; B = NUM1
        LDA  8001H     ; A = NUM2
        MOV  C,A       ; C = NUM2
        MOV  A,B       ; A = NUM1
        SUB  C         ; A = NUM1 - NUM2
        STA  8003H     ; Store difference
        HLT
`,
      expectedOutputs: 'SUM at 8002H = 3CH (60), DIFF at 8003H = 0EH (14)',
      memoryInit: { '0x8000': 0x25, '0x8001': 0x17 },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Record the register and memory values after executing the program.'],
      table: {
        headers: ['Register/Address', 'Expected Value', 'Actual Value'],
        rows: [
          ['A (after ADD)',       '3CH = 60',       ''],
          ['Memory[8002H] (SUM)', '3CH = 60',       ''],
          ['Memory[8003H] (DIFF)','0EH = 14',       ''],
          ['Flags after ADD',     'Z=0, S=0, CY=0', ''],
          ['Flags after SUB',     'Z=0, S=0, CY=0', ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'The 8085 assembly program successfully performed addition and subtraction of two 8-bit numbers.',
        'The ADD instruction adds register B to A and updates all five flags. Since 25H + 17H = 3CH < FFH, no carry is generated.',
        'The SUB instruction performs 2\'s complement subtraction. Since 25H > 17H, no borrow occurs and CY remains 0.',
        'Data transfer instructions LDA, STA, and MOV are fundamental for moving operands to/from the accumulator and registers.',
      ],
    },
  ],
};
