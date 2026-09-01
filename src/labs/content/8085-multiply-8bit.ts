import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085Multiply8bitContent: LabContent = {
  id: '8085-multiply-8bit',
  title: 'Multiplication of Two 8-bit Numbers',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'The 8085 microprocessor does not have a dedicated hardware multiply instruction. Multiplication is implemented in software using repeated addition: A × B = A added B times. The result is stored as a 16-bit value in the HL register pair to handle products up to 255 × 255 = 65025.',
        'The algorithm initialises a 16-bit accumulator (H=00H, L=00H) to zero. A loop counter is set to the multiplier B. In each iteration, the multiplicand A is added to L. If an 8-bit carry results from this addition, it is propagated to H using the ADC instruction.',
        'The INX H and DCX H instructions increment/decrement the HL pair without affecting flags. DCR B decrements the loop counter; when B reaches 0 the Zero flag is set. JNZ (Jump if Not Zero) branches back to the loop body while B ≠ 0.',
        'Key instructions: MVI loads immediate data. DAD H doubles HL (shift-left), which is an alternative for powers-of-two multiplication. MOV copies between registers. SHLD stores HL to memory so the 16-bit product can be written out.',
        'The time complexity is O(B) additions, so this method is slow for large multipliers. A faster approach uses shift-and-add (binary multiplication), but the repeated-addition approach is simpler to understand for introductory labs.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Multiply two 8-bit numbers using repeated addition.',
      starterCode: `; Multiply two 8-bit numbers (repeated addition)
; Input:  MLTD (multiplicand) at 8000H
;         MLTR (multiplier)   at 8001H
; Output: PRODUCT (16-bit)   at 8002H (low), 8003H (high)

        ORG 8000H
MLTD:   DB  0CH        ; multiplicand = 12
MLTR:   DB  0AH        ; multiplier   = 10

        ORG 8100H
START:
        LDA  8001H     ; A = multiplier (loop count)
        MOV  C,A       ; C = loop counter

        LDA  8000H     ; A = multiplicand
        MOV  B,A       ; B = multiplicand

        MVI  H,00H     ; H = 0 (high byte of product)
        MVI  L,00H     ; L = 0 (low byte of product)

LOOP:
        MOV  A,L       ; A = current low byte
        ADD  B         ; A = A + multiplicand
        MOV  L,A       ; L = new low byte
        MOV  A,H
        ACI  00H       ; H = H + carry
        MOV  H,A

        DCR  C         ; decrement counter
        JNZ  LOOP      ; repeat if C != 0

        SHLD 8002H     ; store HL (product) at 8002H/8003H
        HLT
`,
      expectedOutputs: 'Product = 0078H = 120 at 8002H (low=78H), 8003H (high=00H)',
      memoryInit: { '0x8000': 0x0C, '0x8001': 0x0A },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Record register values and the 16-bit product stored in memory.'],
      table: {
        headers: ['Location/Register', 'Expected', 'Actual'],
        rows: [
          ['H after LOOP',          '00H',     ''],
          ['L after LOOP',          '78H',     ''],
          ['Memory[8002H] (low)',   '78H = 120',''],
          ['Memory[8003H] (high)',  '00H',     ''],
          ['Iterations of LOOP',    '10 (0AH)',''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'Repeated addition correctly computed 12 × 10 = 120 = 0078H using 10 iterations of the add loop.',
        'Using HL as a 16-bit accumulator with ACI 00H to propagate carry from L to H ensures no overflow for results up to 65535.',
        'The DCR/JNZ loop pattern is the fundamental looping construct in 8085 assembly.',
        'SHLD efficiently stores the 16-bit product: it writes L to the given address and H to the next address, exactly matching little-endian convention.',
      ],
    },
  ],
};
