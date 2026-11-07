import { type CodeLabSection } from "@/labs/lab-content.types";

export const codeLab: CodeLabSection = {
  id: "code",
  type: "code-lab",
  title: "Program",
  language: "8085",
  description: "Square each element of an array using a multiply subroutine.",
  starterCode:
    "; Square each element of an array\n; Input  array at 8000H (count, then elements)\n; Output at 8020H: 16-bit squares, low byte then high byte\n\n        ORG 8000H\n        DB  04H        ; count = 4\n        DB  03H        ; 3  -> 0009H\n        DB  07H        ; 7  -> 0031H\n        DB  0AH        ; 10 -> 0064H\n        DB  0FH        ; 15 -> 00E1H\n\n        ORG 8100H\nSTART:\n        LXI  SP,9000H\n        LDA  8000H\n        MOV  C,A       ; C = count\n        LXI  H,8001H   ; HL -> first element\n        LXI  D,8020H   ; DE -> output\n\nLOOP:\n        MOV  A,M       ; A = n\n        PUSH H\n        PUSH D\n        PUSH B         ; SQUARE reuses C\n        MOV  B,A\n        CALL SQUARE    ; HL = n * n\n        POP  B\n        POP  D         ; DE = output address\n        XCHG           ; HL = output, DE = square\n        MOV  M,E       ; low byte\n        INX  H\n        MOV  M,D       ; high byte\n        INX  H\n        XCHG           ; DE = next output\n        POP  H\n        INX  H         ; next element\n        DCR  C\n        JNZ  LOOP\n        HLT\n\nSQUARE:\n        MVI  H,00H\n        MVI  L,00H\n        MOV  C,B       ; add n, n times\n        MOV  A,B\n        ORA  A\n        RZ             ; 0 * 0 = 0\nSQ:\n        MOV  A,L\n        ADD  B\n        MOV  L,A\n        MOV  A,H\n        ACI  00H\n        MOV  H,A\n        DCR  C\n        JNZ  SQ\n        RET\n",
  expectedOutputs:
    "3^2=09H, 7^2=31H, 10^2=64H, 15^2=E1H stored at 8020H onwards",
  memoryInit: {},
};
