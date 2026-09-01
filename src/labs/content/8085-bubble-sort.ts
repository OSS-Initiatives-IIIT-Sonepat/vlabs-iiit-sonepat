import { type LabContent } from '@/labs/lab-content.types';

export const Exp8085BubbleSortContent: LabContent = {
  id: '8085-bubble-sort',
  title: 'Bubble Sort of an Array',
  labType: 'code',
  sections: [
    {
      id: 'theory', type: 'text', title: 'Theory',
      paragraphs: [
        'Bubble sort is an O(n²) comparison-based sorting algorithm that repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles up" to its correct position at the end.',
        'The 8085 implementation requires two nested loops. The outer loop runs N-1 passes. The inner loop compares adjacent pairs: element at (HL) with element at (HL+1). If the first is greater, they are swapped using three MOV operations via a temporary register.',
        'A swap flag (stored in memory or a register) tracks whether any swap occurred in a pass. If no swap happened, the array is already sorted and we can exit early. This is the optimised bubble sort. In 8085, a flag register like D is used: D=0 means no swap, D=1 means swap occurred.',
        'CMP M compares A with the memory byte at (HL). JC skips the swap when A < (HL), i.e., the pair is already in order. Otherwise, the bytes are exchanged: save A in B, load next element, store at current position, store B at next position.',
        'The outer loop count is kept in a memory location (since all registers are used in the inner loop). Alternatively, the count is decremented in a register saved and restored around inner loop iterations.',
      ],
    },
    {
      id: 'code', type: 'code-lab', title: 'Program',
      language: '8085',
      description: 'Sort an array of bytes in ascending order using bubble sort.',
      starterCode: `; Bubble sort — ascending order
; Array at 8000H: first byte = count
; Sorted in place

        ORG 8000H
ARR:    DB  05H        ; count = 5
        DB  34H
        DB  12H
        DB  56H
        DB  23H
        DB  45H

        ORG 8100H
START:
        LDA  8000H
        DCR  A
        STA  8050H     ; passes = count - 1

OUTER:
        LDA  8050H
        ORA  A
        JZ   STOP      ; no more passes

        MVI  D,00H     ; D = swap flag = 0
        LDA  8000H
        DCR  A
        MOV  C,A       ; C = inner loop count (n-1)

        LXI  H,8001H   ; HL -> first element

INNER:
        MOV  A,M       ; A = arr[i]
        INX  H
        CMP  M         ; compare arr[i] vs arr[i+1]
        JC   NOSWAP    ; arr[i] < arr[i+1], no swap
        JZ   NOSWAP    ; equal, no swap

        ; Swap arr[i] and arr[i+1]
        MOV  B,A       ; B = arr[i]
        MOV  A,M       ; A = arr[i+1]
        DCX  H
        MOV  M,A       ; arr[i] = arr[i+1]
        INX  H
        MOV  M,B       ; arr[i+1] = old arr[i]
        MVI  D,01H     ; mark swap occurred

NOSWAP:
        DCR  C
        JNZ  INNER

        ; check swap flag
        MOV  A,D
        ORA  A
        JZ   STOP      ; no swaps = sorted

        LDA  8050H
        DCR  A
        STA  8050H
        JMP  OUTER

STOP:
        HLT
`,
      expectedOutputs: 'Array sorted to 12H 23H 34H 45H 56H at 8001H-8005H',
      memoryInit: {},
    },
    {
      id: 'observations', type: 'observation', title: 'Observations',
      paragraphs: ['Check each memory location after sorting.'],
      table: {
        headers: ['Address', 'Before Sort', 'After Sort (Expected)', 'Actual'],
        rows: [
          ['8001H', '34H', '12H', ''],
          ['8002H', '12H', '23H', ''],
          ['8003H', '56H', '34H', ''],
          ['8004H', '23H', '45H', ''],
          ['8005H', '45H', '56H', ''],
        ],
      },
    },
    {
      id: 'conclusion', type: 'conclusion', title: 'Conclusion',
      paragraphs: [
        'Bubble sort is simple to implement in 8085 assembly but requires O(n²) comparisons — for 5 elements it makes at most 10 comparisons.',
        'The early-exit optimisation (swap flag in D) prevents unnecessary passes once the array is already sorted.',
        'DCX H and INX H allow navigation back and forth in the array — essential for in-place swapping of adjacent elements.',
        'In real 8085 systems, more efficient algorithms (Shell sort, insertion sort) are preferred for larger arrays due to the 8085\'s limited instruction set and clock speed.',
      ],
    },
  ],
};
