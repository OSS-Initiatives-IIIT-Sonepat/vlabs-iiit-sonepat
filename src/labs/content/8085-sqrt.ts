import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085SqrtContent: LabContent = {
  id: '8085-sqrt',
  title: 'Square Root using Successive Odd-Number Subtraction',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'The integer square root of N is the largest integer k such that k² ≤ N. A clever mathematical property states that N = 1 + 3 + 5 + … + (2k−1) — that is, N is the sum of the first k odd numbers. Therefore, to find √N, we can repeatedly subtract successive odd numbers (1, 3, 5, …) from N until the result goes negative; the count of subtractions equals the integer square root.',
        'The algorithm: initialise ODD = 1, COUNT = 0. Loop: subtract ODD from N. If result < 0, stop — COUNT is the integer square root. Otherwise increment COUNT, add 2 to ODD (get next odd number), and repeat.',
        'In 8085 assembly: keep N in A, ODD in B (starting at 1), COUNT in C. SUB B subtracts ODD from A. If CY is set (result < 0), we have gone too far and exit. Otherwise INR C (count++) and INR B / INR B (ODD += 2).',
        'The Carry flag after SUB indicates a borrow (A < B before subtraction). This is the termination condition: when A - ODD is negative, we have subtracted one too many odd numbers, so the final COUNT is the integer square root.',
        'For N=0, 1, 4, 9, 16, 25, 36, 49 the exact integer square roots are 0, 1, 2, 3, 4, 5, 6, 7. For non-perfect-square N, the floor of the square root is returned.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Compute integer square root using successive odd-number subtraction.',
      starterCode: `; Integer square root via successive odd-number subtraction
; Input:  N at 8000H
; Output: SQRT at 8001H

        ORG 8000H
N:      DB  31H        ; N = 49 decimal -> sqrt = 7

        ORG 8100H
START:
        LDA  8000H     ; A = N
        MVI  B,01H     ; B = first odd number = 1
        MVI  C,00H     ; C = count (result)

LOOP:
        CMP  B         ; if A < B, A - B would be negative
        JC   DONE      ; carry = A < B, stop

        SUB  B         ; A = A - odd
        INR  C         ; count++

        INR  B         ; B += 2 (next odd)
        INR  B

        ORA  A         ; update flags from A (check if A=0)
        JZ   DONE_EQ   ; A = 0 means exact perfect square

        JMP  LOOP

DONE_EQ:
        INR  C         ; one more count for the last odd
        ; fall through to DONE

DONE:
        MOV  A,C
        STA  8001H     ; store square root
        HLT
`,
      expectedOutputs: 'sqrt(49) = 7 = 07H at 8001H',
      memoryInit: { '0x8000': 0x31 },
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Test with both perfect squares and non-perfect squares.'],
      table: {
        headers: ['N (input)', 'N (hex)', 'Expected SQRT', 'Actual'],
        rows: [
          ['49', '31H', '7', ''],
          ['25', '19H', '5', ''],
          ['36', '24H', '6', ''],
          ['30', '1EH', '5 (floor)', ''],
          ['1',  '01H', '1', ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'The successive odd-number subtraction method exploits the identity n² = Σᵢ₌₁ⁿ (2i−1) to compute integer square roots without multiplication or division hardware.',
        'The loop correctly terminates using CMP B / JC to detect when the remaining value is less than the next odd number.',
        'For perfect squares, the A=0 exit path (JZ DONE_EQ) is needed because after the last subtraction A equals 0, and the loop would otherwise continue subtracting the next odd number.',
        'The algorithm has O(√N) time complexity, which for 8-bit inputs (N ≤ 255) means at most 16 iterations — fast enough for any practical 8085 application.',
      ],
    },
  ],
};
