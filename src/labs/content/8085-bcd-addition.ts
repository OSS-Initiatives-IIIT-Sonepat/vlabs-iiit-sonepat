import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085BcdAdditionContent: LabContent = {
  id: '8085-bcd-addition',
  title: 'BCD Addition using DAA Instruction',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'Binary Coded Decimal (BCD) is a encoding where each decimal digit is represented by 4 binary bits. For example, decimal 25 is stored as 0010 0101B in packed BCD, not as 00011001B (binary 25). Packed BCD stores two decimal digits per byte.',
        'When two BCD numbers are added using the standard ADD instruction, the result may not be a valid BCD number because the binary addition does not respect the decimal digit boundary at nibble (4-bit) level. For example, adding BCD 09 + 01 gives binary 0AH, but the correct BCD result is 10H.',
        'The DAA (Decimal Adjust Accumulator) instruction corrects the result in A after an ADD/ADC operation. It adds 06H to the lower nibble if it exceeds 9 or if the Auxiliary Carry (AC) is set. It adds 60H to the upper nibble if it exceeds 9 or if the Carry (CY) is set. DAA updates all flags.',
        'The process: perform binary ADD of two packed BCD bytes, then execute DAA. The accumulator will then contain the correct packed BCD result. If the decimal sum exceeds 99, the Carry flag is set after DAA indicating a carry into the hundreds digit.',
        'DAA examines four conditions: (1) lower nibble > 9, (2) AC=1, (3) upper nibble > 9, (4) CY=1. For each condition the appropriate 06H or 60H correction is applied.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Add two packed BCD numbers and display a valid BCD result.',
      starterCode: `; BCD Addition using DAA
; Input:  BCD1 at 8000H, BCD2 at 8001H  (packed BCD)
; Output: BCD_SUM_L at 8002H, BCD_CARRY at 8003H

        ORG 8000H
BCD1:   DB  47H        ; BCD 47 (decimal 47)
BCD2:   DB  36H        ; BCD 36 (decimal 36)

        ORG 8100H
START:
        LDA  8000H     ; A = BCD1
        MOV  B,A
        LDA  8001H     ; A = BCD2
        ADD  B         ; binary add — result may not be valid BCD
        DAA            ; adjust to valid BCD
        STA  8002H     ; store BCD result (lower byte)

        MVI  A,00H
        ADC  A         ; A = carry (0 or 1)
        STA  8003H     ; store BCD carry

        HLT
`,
      expectedOutputs: 'BCD_SUM=83H (BCD 83 = decimal 83), BCD_CARRY=00H',
      memoryInit: { '0x8000': 0x47, '0x8001': 0x36 },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Verify that DAA produces valid BCD output.'],
      table: {
        headers: ['Location/Register', 'Expected (BCD)', 'Actual'],
        rows: [
          ['A after ADD (before DAA)', '7DH (invalid BCD)', ''],
          ['A after DAA',              '83H (valid BCD)',   ''],
          ['Memory[8002H]',            '83H',               ''],
          ['Memory[8003H] (carry)',    '00H',               ''],
          ['AC flag after ADD',        '1',                 ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'DAA correctly adjusted the binary sum 7DH to the valid BCD result 83H representing decimal 47+36=83.',
        'The Auxiliary Carry flag (AC) plays a critical role: it is set when there is a carry from bit 3 to bit 4 during addition, indicating that the lower nibble exceeded 9.',
        'The DAA instruction is unique to the 8085/8086 family and must always follow an ADD or ADC for BCD arithmetic to be meaningful.',
        'Packed BCD format doubles the storage efficiency compared to unpacked BCD (one digit per byte), making it useful in calculators and financial applications.',
      ],
    },
  ],
};
