import { type ObservationSection } from "@/labs/lab-content.types";

export const observations: ObservationSection = {
  id: "observations",
  type: "observation",
  title: "Observations",
  paragraphs: [
    "A = 1101 and B = 0011. F0 and F1 are the upper lamps, left then right. F2 and F3 are the lower lamps. Read them as F0 F1 F2 F3. The carry is not on a lamp: when the add lamps are all dark, the sum was 10000.",
    "Transfer copies 1101. Increment reads 1110. Add reads 0000 and add with carry reads 0001. Subtract with borrow reads 1001 and subtract reads 1010. Decrement reads 1100, and the last arithmetic row returns to 1101.",
    "AND reads 0001, OR reads 1111, XOR reads 1110, and the complement of A reads 0010. Shift right reads 0110. Shift left reads 1010.",
  ],
  table: {
    headers: ["S3", "S2", "S1", "S0", "Cin", "F", "Microoperation"],
    rows: [
      ["0", "0", "0", "0", "0", "F = A", "Transfer A"],
      ["0", "0", "0", "0", "1", "F = A + 1", "Increment A"],
      ["0", "0", "0", "1", "0", "F = A + B", "Addition"],
      ["0", "0", "0", "1", "1", "F = A + B + 1", "Add with carry"],
      ["0", "0", "1", "0", "0", "F = A + B'", "Subtract with borrow"],
      ["0", "0", "1", "0", "1", "F = A + B' + 1", "Subtraction"],
      ["0", "0", "1", "1", "0", "F = A − 1", "Decrement"],
      ["0", "0", "1", "1", "1", "F = A", "Transfer A"],
      ["0", "1", "0", "0", "x", "F = A ∧ B", "AND"],
      ["0", "1", "0", "1", "x", "F = A ∨ B", "OR"],
      ["0", "1", "1", "0", "x", "F = A ⊕ B", "XOR"],
      ["0", "1", "1", "1", "x", "F = A'", "Complement A"],
      ["1", "0", "x", "x", "x", "F = shr A", "Shift right A into F"],
      ["1", "1", "x", "x", "x", "F = shl A", "Shift left A into F"],
    ],
  },
};
