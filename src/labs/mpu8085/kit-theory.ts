/**
 * Shared opening of every assembly-lab theory page: the processor,
 * then the trainer kit the program is typed into.
 */
export const trainerKitTheory: string[] = [
  "The Intel 8085 is an 8-bit NMOS microprocessor. It runs from a single +5 V supply. A program is a row of bytes in memory. The processor fetches one byte, does the move or the arithmetic in its registers, and writes the result back. The data bus is 8 bits wide and the address bus is 16 bits wide, so a program can name any byte in a 64 KB memory. A bare 8085 has no keys and no display. It can only run bytes that are already stored.",
  "The trainer kit is how those bytes get in. The board in the case carries the 8085, its ROM and RAM, a red eight-digit display, and two keypads. RES starts the monitor and the display signs on UPC-8085. The hex keys then enter an address, and the next two keys are the byte stored there. INC writes it and steps to the next address. EXE runs the 8085 from the address on the display until HLT. RES again, then that result address, and the data digits show what the program wrote. On this kit the numbers sit at 8000H and the instructions start at 8100H, which is RAM the monitor leaves free.",
];
