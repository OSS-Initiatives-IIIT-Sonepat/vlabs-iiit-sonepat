import { type CodeLabSection } from "@/labs/lab-content.types";

export const codeLab: CodeLabSection = {
  id: "code",
  type: "code-lab",
  title: "Program",
  language: "8085",
  description:
    "Compute integer square root using successive odd-number subtraction.",
  starterCode:
    "; Integer square root via successive odd-number subtraction\n; Input:  N at 8000H\n; Output: SQRT at 8001H\n\n        ORG 8000H\nN:      DB  31H        ; N = 49 decimal -> sqrt = 7\n\n        ORG 8100H\nSTART:\n        LDA  8000H     ; A = N\n        MVI  B,01H     ; B = first odd number = 1\n        MVI  C,00H     ; C = count (result)\n\nLOOP:\n        CMP  B         ; carry means A < the next odd number\n        JC   DONE\n\n        SUB  B         ; A = A - odd\n        INR  C         ; one more odd number fitted\n\n        INR  B         ; next odd number is 2 greater\n        INR  B\n        JMP  LOOP\n\nDONE:\n        MOV  A,C\n        STA  8001H     ; store square root\n        HLT\n",
  expectedOutputs: "sqrt(49) = 7 = 07H at 8001H",
  memoryInit: {
    "0x8000": 49,
  },
};
