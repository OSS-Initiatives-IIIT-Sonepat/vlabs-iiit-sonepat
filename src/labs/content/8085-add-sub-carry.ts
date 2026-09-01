import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085AddSubCarryContent: LabContent = {
  id: '8085-add-sub-carry',
  title: 'Addition & Subtraction with Carry (16-bit Result)',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'When two 8-bit numbers are added, the result can exceed 8 bits (exceed 255). In such cases the Carry flag (CY) is set and the 9th bit is lost unless we explicitly handle it. The 8085 provides ADC (Add with Carry) and SBB (Subtract with Borrow) instructions for multi-precision arithmetic.',
        'The ADC r instruction adds the contents of register r plus the Carry flag to the accumulator: A = A + r + CY. This enables chained multi-byte addition. For a 16-bit result of adding two 8-bit numbers, the lower byte is stored in A and the carry is added to 00H to form the upper byte.',
        'Similarly, SBB r performs A = A - r - CY, enabling multi-byte subtraction with borrow propagation. The Carry flag acts as a borrow flag in subtraction: if CY=1 after SUB, a borrow occurred.',
        'A common technique is to use the HL register pair to store a 16-bit result. H holds the upper byte (carry) and L holds the lower byte (sum). The DAD instruction can add two 16-bit register pairs together.',
        'Algorithm: Load NUM1 → ADD NUM2 → store low byte (SUM_L). Load 00H → ADC 00H (adds carry) → store high byte (SUM_H). For subtraction: Load NUM1 → SUB NUM2. If CY set, complement and add 1 for absolute value.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Add two 8-bit numbers with 16-bit result; subtract with borrow detection.',
      starterCode: `; Addition with carry / Subtraction with borrow
; Input:  NUM1 at 8000H, NUM2 at 8001H
; Output: SUM_L at 8002H, SUM_H at 8003H
;         DIFF  at 8004H, BORROW at 8005H

        ORG 8000H
NUM1:   DB  0C8H       ; 200
NUM2:   DB  64H        ; 100

        ORG 8100H
START:
        ; 16-bit addition
        LDA  8000H     ; A = NUM1
        MOV  B,A
        LDA  8001H     ; A = NUM2
        ADD  B         ; A = NUM1 + NUM2 (low byte), CY = carry
        STA  8002H     ; store low byte of sum

        MVI  A,00H     ; A = 0
        ADC  A         ; A = 0 + CY (upper byte)
        STA  8003H     ; store high byte (carry)

        ; 8-bit subtraction with borrow detection
        LDA  8000H     ; A = NUM1
        MOV  B,A
        LDA  8001H
        MOV  C,A
        MOV  A,B       ; A = NUM1
        SUB  C         ; A = NUM1 - NUM2
        STA  8004H     ; store difference

        MVI  B,00H
        JNC  DONE      ; no borrow
        MVI  B,01H     ; borrow = 1
DONE:   MOV  A,B
        STA  8005H     ; store borrow flag
        HLT
`,
      expectedOutputs: 'SUM_L=2CH, SUM_H=01H (300=012CH), DIFF=64H, BORROW=00H',
      memoryInit: { '0x8000': 0xC8, '0x8001': 0x64 },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Record all memory locations and flags after execution.'],
      table: {
        headers: ['Location', 'Expected', 'Actual'],
        rows: [
          ['Memory[8002H] (SUM_L)',  '2CH = 44',    ''],
          ['Memory[8003H] (SUM_H)',  '01H = 1',     ''],
          ['Memory[8004H] (DIFF)',   '64H = 100',   ''],
          ['Memory[8005H] (BORROW)', '00H',         ''],
          ['CY after ADD',           '1 (carry)',   ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'The ADC instruction enabled collection of the carry from an 8-bit addition to form a correct 16-bit result: 200 + 100 = 300 = 012CH.',
        'JNC (Jump if No Carry) was used to skip the borrow-flag setting, demonstrating conditional branching based on the Carry flag.',
        'Multi-precision arithmetic in 8085 requires careful sequencing of ADD/ADC for addition and SUB/SBB for subtraction.',
        'The technique of storing 00H in A and adding the carry is the standard method for extending an 8-bit sum to 16 bits on the 8085.',
      ],
    },
  ],
};
