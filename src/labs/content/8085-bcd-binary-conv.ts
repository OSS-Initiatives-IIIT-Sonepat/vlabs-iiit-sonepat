import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085BcdBinaryConvContent: LabContent = {
  id: '8085-bcd-binary-conv',
  title: 'BCD to Binary and Binary to BCD Conversion',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'BCD (Binary Coded Decimal) represents each decimal digit as a 4-bit nibble. Packed BCD stores two digits per byte: the upper nibble is the tens digit and the lower nibble is the units digit. For example, decimal 47 is stored as 0100 0111B = 47H in packed BCD.',
        'BCD to Binary conversion: extract the tens digit (upper nibble), multiply it by 10, then add the units digit (lower nibble). In 8085: mask upper nibble with ANI 0F0H, rotate right 4 times (RRC x4 or use RAR/ANI), multiply by 10 using a small loop, then ADD lower nibble.',
        'Binary to BCD conversion: repeatedly divide the binary number by 10 using the repeated-subtraction method. Each subtraction that succeeds contributes one unit to the BCD ones digit. When the quotient of dividing by 10 is non-zero, move it to the tens position. Alternatively, use the successive subtraction of 100, 10, 1.',
        'An important shortcut for binary to BCD: subtract 10 from the number while it is >= 10, counting subtractions. The count becomes the tens digit and the remainder becomes the units digit. Combine them: (tens << 4) | units to form packed BCD.',
        'The ANI instruction is used for masking: ANI 0F0H isolates the upper nibble, ANI 0FH isolates the lower nibble. The RLC/RRC instructions shift bits for nibble extraction. These are purely logical operations and do not set carry in a way that disrupts arithmetic.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Convert packed BCD to binary and binary back to packed BCD.',
      starterCode: `; BCD <-> Binary conversion
; BCD input at 8000H  -> binary output at 8001H
; Binary input at 8002H -> BCD output at 8003H

        ORG 8000H
BCD_IN:  DB  47H        ; BCD 47 = decimal 47
BIN_OUT: DB  00H
BIN_IN:  DB  2FH        ; binary 47 = 2FH
BCD_OUT: DB  00H

        ORG 8100H
START:
        ; ── BCD to Binary ─────────────────────────
        LDA  8000H     ; A = packed BCD
        MOV  B,A       ; save
        ANI  0F0H      ; mask lower nibble, keep upper
        RRC            ; shift right 4 times
        RRC
        RRC
        RRC            ; A = tens digit (0-9)
        MOV  C,A       ; C = tens

        ; multiply tens by 10
        MVI  D,00H     ; D = result of tens * 10
        ORA  C
        JZ   ADD_UNITS
MUL10:
        MOV  A,D
        ADI  0AH       ; add 10
        MOV  D,A
        DCR  C
        JNZ  MUL10

ADD_UNITS:
        MOV  A,B
        ANI  0FH       ; A = units digit
        ADD  D         ; A = tens*10 + units
        STA  8001H     ; store binary result

        ; ── Binary to BCD ─────────────────────────
        LDA  8002H     ; A = binary number
        MVI  B,00H     ; B = tens count

TENS:
        CPI  0AH       ; A >= 10?
        JC   UNITS_D   ; no, exit
        SUI  0AH       ; subtract 10
        INR  B         ; tens++
        JMP  TENS

UNITS_D:
        ; A = units, B = tens
        MOV  C,A       ; C = units digit
        MOV  A,B
        RLC            ; shift tens left 4
        RLC
        RLC
        RLC
        ORA  C         ; combine: (tens << 4) | units
        STA  8003H     ; store BCD result

        HLT
`,
      expectedOutputs: 'BCD 47H -> Binary 2FH=47; Binary 2FH=47 -> BCD 47H',
      memoryInit: {},
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Verify bidirectional conversion is consistent.'],
      table: {
        headers: ['Operation', 'Input', 'Expected Output', 'Actual'],
        rows: [
          ['BCD->Binary', '47H (BCD 47)', '2FH (47 decimal)', ''],
          ['Binary->BCD', '2FH (47)',     '47H (BCD 47)',     ''],
          ['Tens digit (BCD->Bin)', '4', '4×10=40',          ''],
          ['Units digit (BCD->Bin)','7', '7',                 ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'BCD to binary conversion uses nibble masking (ANI), nibble shifting (RRC × 4), and a multiply-by-10 loop.',
        'Binary to BCD conversion uses repeated subtraction of 10, counting the tens digit and leaving the units remainder.',
        'RLC × 4 (or equivalent) packs the tens digit back into the upper nibble to form packed BCD output.',
        'This conversion is essential in display drivers, communication protocols, and interfacing microprocessors with BCD-based peripherals like 7-segment decoders.',
      ],
    },
  ],
};
