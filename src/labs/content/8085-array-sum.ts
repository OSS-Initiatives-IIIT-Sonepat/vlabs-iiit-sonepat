import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085ArraySumContent: LabContent = {
  id: '8085-array-sum',
  title: 'Sum of an Array of 8-bit Numbers',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'Summing an array in 8085 assembly demonstrates both indirect addressing (using HL as a memory pointer) and loop control. The array is stored in consecutive memory locations, with the count of elements stored in the first byte.',
        'The LXI H instruction loads a 16-bit address into the HL register pair. The MOV A,M instruction then reads the byte at the address pointed to by HL (indirect addressing). INX H increments HL to point to the next element.',
        'The result is a 16-bit sum stored in DE (or H:L after the loop) to avoid overflow when summing many large values. The ADD M instruction adds the memory byte at (HL) directly to A without needing a register intermediary.',
        'The DCR B / JNZ LOOP construct decrements B and loops back as long as B ≠ 0. B is initialised with the array count. This is the standard 8085 counting loop pattern.',
        'Algorithm: (1) Load count N from first memory byte into B. (2) Set HL to first data element. (3) Initialise A=0, C=0 (carry). (4) Loop: ADD M, collect carry in C with ADC 00H, INX H, DCR B, JNZ. (5) Store 16-bit result (C:A).',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Sum all elements in a byte array; first byte is the count.',
      starterCode: `; Sum of array elements
; Array at 8000H: first byte = count, rest = data
; Output: SUM_L at 8010H, SUM_H at 8011H

        ORG 8000H
ARRAY:  DB  05H        ; count = 5
        DB  0AH        ; 10
        DB  14H        ; 20
        DB  1EH        ; 30
        DB  28H        ; 40
        DB  32H        ; 50

        ORG 8100H
START:
        LXI  H,8000H   ; HL -> array start (count byte)
        MOV  B,M       ; B = count
        INX  H         ; HL -> first data element

        MVI  A,00H     ; A = sum (low byte) = 0
        MVI  C,00H     ; C = carry byte = 0

LOOP:
        ADD  M         ; A = A + array[HL]
        JNC  NOCY
        INR  C         ; C++ on carry
NOCY:
        INX  H         ; HL++ (next element)
        DCR  B         ; B--
        JNZ  LOOP      ; repeat while B != 0

        STA  8010H     ; store low byte of sum
        MOV  A,C
        STA  8011H     ; store high byte of sum
        HLT
`,
      expectedOutputs: 'SUM = 0096H = 150 decimal. 8010H=96H, 8011H=00H',
      memoryInit: {},
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Verify the array sum matches the manual calculation.'],
      table: {
        headers: ['Location', 'Expected', 'Actual'],
        rows: [
          ['Memory[8010H] (SUM_L)', '96H = 150', ''],
          ['Memory[8011H] (SUM_H)', '00H',        ''],
          ['B after loop',          '00H',        ''],
          ['Loop iterations',       '5',          ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'The program correctly computed 10+20+30+40+50 = 150 = 96H using HL-based indirect addressing.',
        'INX H after each ADD M advances the pointer through the array without affecting the accumulator or flags.',
        'Carry collection with INR C on JNC/INR ensures the 16-bit sum is correctly maintained even if partial sums overflow 8 bits.',
        'The self-describing array format (count in first byte) is a common data structure in 8085 programs and firmware.',
      ],
    },
  ],
};
