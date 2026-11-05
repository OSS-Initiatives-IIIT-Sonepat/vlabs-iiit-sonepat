import { type TheorySection } from "@/labs/lab-content.types";
import { instructionCodesTheoryDiagram } from "@/labs/schematics/semester-03/06-processor-design/instruction-codes";

export const theory: TheorySection = {
  id: "theory",
  type: "text",
  title: "Theory",
  paragraphs: [
    "A program is a set of instructions. Each instruction names the operation to perform, the operands it uses, and the place of that step in the sequence. Once the program is stored, a computer instruction is the binary code of one of those steps. The computer reads the instruction from memory and places it in a control register. The control interprets that code and carries the step out by issuing a sequence of micro-operations.",
    "An instruction code is the group of bits that tells the computer to perform one specific operation. In the example ADD 1547, the word ADD is the operation code and 1547 is the address written with it. The operation code is its own group of bits. It names operations such as add, subtract, multiply, shift, and complement. Each opcode is assigned one unique binary code, so the control can tell one operation from another.",
    "The number of opcode bits depends on how many operations the computer has. With $n$ bits the opcode can name $2^n$ distinct operations, or fewer. Two bits name $2^2 = 4$ operations, so add, subtract, multiply, shift, and complement do not all fit. Three bits name $2^3 = 8$ operations, which covers those five. The opcode for that set must be at least 3 bits wide.",
    "The simplest stored-program computer has one processor register, the accumulator AC, and an instruction in two parts. The first part is the opcode. The second part is an address. That address tells the control where to find an operand in memory. The operand is read from memory and used together with the value already held in AC. An add instruction adds the memory operand to AC.",
    "Instructions and operands share one memory, in two sections. The program section holds the instructions. The data section holds the operands. For 4096 words the address needs 12 bits, because $2^{12} = 4096$. Storing each instruction in one 16-bit word leaves 4 bits for the opcode, and 4 bits name one of 16 operations. The other 12 bits name the address of an operand. The control reads a 16-bit instruction from the program section and performs the operation named by the opcode. A data word uses all 16 bits as one binary operand.",
    "On the basic computer, bit 15 of that 16-bit word is the mode bit $I$. Bits 14 to 12 stay the opcode, so the opcode is 3 bits there, and bits 11 to 0 stay the 12-bit address. The format figure prints the add instruction ADD 457 as 0001 0100 0101 0111. Split on those boundaries, the word is $I = 0$, opcode $= 001$, and address field $= 0100\\,0101\\,0111$.",
    "The instruction has a direct address when the address field is the address of the operand. Then $I = 0$. In the worked example the instruction stands at memory address 22 and reads 0 ADD 457. The opcode is ADD and the address field is 457, so the control reads the memory word at address 457 and adds that operand to AC.",
    "The instruction has an indirect address when the address field designates a memory word in which the address of the operand is found. Then $I = 1$. In the worked example the instruction stands at memory address 35 and reads 1 ADD 300. The control goes to address 300 and finds 1350 stored there. The operand address is 1350, so the control reads the memory word at 1350 and adds that operand to AC.",
    "Both examples use the same opcode, ADD. The mode bit chooses the path. With $I = 0$ the address written in the instruction is used at once. With $I = 1$ that address is used to fetch a second address, and the operand is read from the second address. The value that reaches AC is the operand either way.",
  ],
  circuitDiagram: instructionCodesTheoryDiagram,
};
