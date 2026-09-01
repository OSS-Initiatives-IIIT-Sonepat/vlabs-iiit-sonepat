import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085MinMaxContent: LabContent = {
  id: '8085-min-max',
  title: 'Find Minimum and Maximum of an Array',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'Finding the minimum and maximum values in an array requires comparing each element to the current best candidate and updating when a more extreme value is found. The 8085 CMP instruction is the workhorse for this task.',
        'CMP r subtracts r from A without storing the result. If A < r, the Carry flag (CY) is set. If A = r, the Zero flag (Z) is set. If A > r, both CY and Z are clear. JC (Jump if Carry) thus branches when A is less than the comparand.',
        'Algorithm for MIN: initialise MIN_VAL with the first element. For each subsequent element, CMP MIN_VAL: if the element < MIN_VAL (CY=1), update MIN_VAL. Algorithm for MAX: similar but jump when CY=0 and Z=0 (i.e., element > MAX_VAL), using JNC and JZ combination.',
        'The program traverses the array using the HL pointer (INX H to advance) and a B counter (DCR B / JNZ loop). The initial element is loaded as both the tentative MIN and MAX before the comparison loop begins.',
        'After the loop, MIN is stored at one address and MAX at another. This pattern appears in real-world firmware for sensor range checking, threshold detection, and normalisation.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Find the minimum and maximum elements in a byte array.',
      starterCode: `; Find MIN and MAX of an array
; Array at 8000H: first byte = count
; Output: MIN at 8010H, MAX at 8011H

        ORG 8000H
ARR:    DB  06H        ; count = 6
        DB  34H        ; 52
        DB  12H        ; 18
        DB  56H        ; 86
        DB  23H        ; 35
        DB  78H        ; 120
        DB  09H        ; 9

        ORG 8100H
START:
        LXI  H,8000H   ; HL -> count
        MOV  B,M       ; B = count
        INX  H         ; HL -> first element

        MOV  A,M       ; A = first element
        MOV  C,A       ; C = current MIN
        MOV  D,A       ; D = current MAX
        DCR  B         ; one element already loaded
        JZ   DONE      ; only one element

LOOP:
        INX  H         ; advance pointer
        MOV  A,M       ; A = next element

        ; Check for new MIN
        CMP  C         ; A - C
        JNC  CHKMAX    ; A >= C, not a new min
        MOV  C,A       ; C = new min

CHKMAX:
        MOV  A,M       ; reload element (CMP may not have changed A)
        CMP  D         ; A - D
        JC   NEXT      ; A < D, not a new max
        MOV  D,A       ; D = new max

NEXT:
        DCR  B
        JNZ  LOOP

DONE:
        MOV  A,C
        STA  8010H     ; store MIN
        MOV  A,D
        STA  8011H     ; store MAX
        HLT
`,
      expectedOutputs: 'MIN=09H (9), MAX=78H (120) at 8010H and 8011H respectively',
      memoryInit: {},
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Verify that the program correctly identifies the minimum and maximum values.'],
      table: {
        headers: ['Location', 'Expected', 'Actual'],
        rows: [
          ['Memory[8010H] (MIN)', '09H = 9',   ''],
          ['Memory[8011H] (MAX)', '78H = 120', ''],
          ['Iterations of LOOP',  '5',         ''],
          ['CY at MIN update',    '1',         ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'CMP is the key instruction: it performs A - operand and sets flags without modifying registers, enabling decision making without data loss.',
        'Keeping MIN in C and MAX in D frees the accumulator for comparisons and avoids memory accesses in the inner loop.',
        'The DCR B / JNZ pattern is efficient: DCR sets the Zero flag and JNZ checks it in one instruction pair, costing only 10 clock cycles per iteration.',
        'This linear scan algorithm (O(n)) is optimal for unsorted arrays; no 8085 sort is needed to find just the extreme values.',
      ],
    },
  ],
};
