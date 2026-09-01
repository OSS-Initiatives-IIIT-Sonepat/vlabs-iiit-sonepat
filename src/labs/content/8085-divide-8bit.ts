import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085Divide8bitContent: LabContent = {
  id: '8085-divide-8bit',
  title: 'Division of Two 8-bit Numbers',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'Like multiplication, the 8085 has no hardware division instruction. Division is implemented as repeated subtraction: the dividend is repeatedly reduced by the divisor until the remainder is less than the divisor. The number of successful subtractions is the quotient.',
        'The CMP (Compare) instruction subtracts the operand from A without storing the result, only updating flags. If A < operand, the Carry flag (CY) is set indicating the remainder is already less than the divisor, so the loop terminates. JC (Jump if Carry) implements this termination check.',
        'Before each subtraction, we compare the current dividend with the divisor. If DIVIDEND >= DIVISOR, subtract and increment the quotient counter. If DIVIDEND < DIVISOR, exit — the remaining value is the remainder.',
        'Key instructions used: CMP B (compare B with A), JC (jump if carry, i.e., A < B), SUB B (subtract B from A), INR C (increment quotient count). The quotient is stored in C and the remainder stays in A at the end of the loop.',
        'Division by zero must be handled specially; if the divisor is 0, the program should output 0FFH as an error indicator. The ORA instruction (OR A with itself) sets the Zero flag without changing A, allowing a JZ check for the zero-divisor case.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Divide two 8-bit numbers using repeated subtraction.',
      starterCode: `; Division by repeated subtraction
; Input:  DIVIDEND at 8000H, DIVISOR at 8001H
; Output: QUOTIENT at 8002H, REMAINDER at 8003H

        ORG 8000H
DVND:   DB  1DH        ; dividend = 29
DVSR:   DB  05H        ; divisor  = 5

        ORG 8100H
START:
        LDA  8001H     ; A = divisor
        ORA  A         ; set flags from A
        JZ   DIVZERO   ; division by zero check

        LDA  8001H
        MOV  B,A       ; B = divisor

        LDA  8000H     ; A = dividend
        MVI  C,00H     ; C = quotient = 0

LOOP:
        CMP  B         ; compare A with divisor
        JC   DONE      ; if A < B, we're done
        SUB  B         ; A = A - divisor
        INR  C         ; quotient++
        JMP  LOOP

DONE:
        STA  8003H     ; store remainder
        MOV  A,C
        STA  8002H     ; store quotient
        HLT

DIVZERO:
        MVI  A,0FFH
        STA  8002H     ; error indicator
        STA  8003H
        HLT
`,
      expectedOutputs: 'Quotient=05H (5), Remainder=04H (4) since 29 = 5*5 + 4',
      memoryInit: { '0x8000': 0x1D, '0x8001': 0x05 },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Record the quotient and remainder after execution.'],
      table: {
        headers: ['Location', 'Expected', 'Actual'],
        rows: [
          ['Memory[8002H] (Quotient)',  '05H = 5', ''],
          ['Memory[8003H] (Remainder)', '04H = 4', ''],
          ['CY flag at loop exit',      '1',       ''],
          ['Iterations of LOOP',        '5',       ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'The repeated-subtraction algorithm successfully divided 29 by 5, yielding quotient 5 and remainder 4 (29 = 5×5 + 4).',
        'CMP is crucial because it sets the Carry flag when A < B without modifying A, making it perfect for loop termination.',
        'JC branches out of the loop as soon as the Carry flag is set, i.e., when the remaining dividend is less than the divisor.',
        'Division by zero is guarded by ORA A followed by JZ, a common 8085 idiom for testing if A equals zero.',
      ],
    },
  ],
};
