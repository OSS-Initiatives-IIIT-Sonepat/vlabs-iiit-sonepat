import { type LabContent } from '@/labs/lab-content.types';

export const CExpressionsContent: LabContent = {
  id: 'c-expressions',
  title: 'C Programming — Mathematical Expressions',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'C provides a rich set of arithmetic operators. Understanding how they interact — particularly ' +
        'regarding type and precedence — is essential for writing correct programs. Many subtle bugs ' +
        'arise from unexpected integer division, overflow, or implicit type conversion.',

        'Operator precedence determines the order of evaluation when multiple operators appear in an ' +
        'expression (higher precedence binds tighter): ' +
        '(1) Unary: ++, --, !, ~, (type), sizeof, * (deref), & (address) — right-to-left. ' +
        '(2) Multiplicative: *, /, % — left-to-right. ' +
        '(3) Additive: +, - — left-to-right. ' +
        '(4) Shift: <<, >> — left-to-right. ' +
        '(5) Relational: <, >, <=, >= — left-to-right. ' +
        '(6) Equality: ==, != — left-to-right. ' +
        '(7) Bitwise AND, XOR, OR — left-to-right. ' +
        '(8) Logical AND (&&), OR (||) — left-to-right. ' +
        '(9) Ternary (?:), Assignment (=, +=, etc.) — right-to-left.',

        'Integer division truncates towards zero: `5/2` = 2, not 2.5. ' +
        'To get floating-point division, at least one operand must be float/double: ' +
        '`5.0/2` = 2.5, `(double)5/2` = 2.5, `5/(double)2` = 2.5. ' +
        'The modulo operator `%` gives the remainder of integer division: `7%3` = 1, `-7%3` = -1 in C99+. ' +
        'The sign of the result matches the sign of the dividend in ISO C99 and later.',

        'Integer overflow is undefined behaviour for signed integers in C. If `int` is 32-bit, ' +
        '`INT_MAX + 1` overflows — the result is undefined (often wraps in practice, but compilers ' +
        'may optimize away the overflow check). Use `long long` or check before adding: ' +
        '`if (a > INT_MAX - b) { /* overflow */ }`. Unsigned integers wrap modulo $2^n$ (well-defined).',

        'Implicit type conversion (coercion): when operands of different types are combined, the ' +
        '"lower" type is promoted to the "higher" type. Hierarchy: char < short < int < long < ' +
        'long long < float < double < long double. Example: `int + double` → both become double. ' +
        'Explicit cast: `(double)a / b` — casts a to double before division.',

        'The `sizeof` operator returns the size of a type or variable in bytes (type: size_t, an unsigned integer). ' +
        '`sizeof(int)` = 4 (on most 32/64-bit systems), `sizeof(char)` = 1 (always by definition), ' +
        '`sizeof(double)` = 8. Useful for portable code: use `sizeof` instead of hard-coding sizes.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'C Compiler',              specification: 'GCC 9+ or Clang 10+, or MSVC 2019+',          quantity: '1' },
        { name: 'IDE or Text Editor',      specification: 'VS Code, Code::Blocks, or any text editor',   quantity: '1' },
        { name: 'Terminal / Command Prompt', specification: 'For compiling and running programs',        quantity: '1' },
        { name: 'C Language Reference',   specification: 'K&R C or cppreference.com',                    quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — 5 Exercises',
      steps: [
        {
          label: 'Exercise 1: Integer vs float division.',
          body: 'Write a program that prints the result of: 7/2, 7.0/2, 7/2.0, (float)7/2, (double)7/2. ' +
            'Expected output: 3, 3.500000, 3.500000, 3.500000, 3.500000. ' +
            'Observe that integer/integer always truncates, regardless of the mathematical result.',
        },
        {
          label: 'Exercise 2: Modulo and negative numbers.',
          body: 'Print: 10%3, -10%3, 10%-3, -10%-3. ' +
            'Expected (ISO C99): 1, -1, 1, -1. ' +
            'The result has the sign of the dividend. ' +
            'Also print: (10%3 + 3)%3 = 1 — the "positive modulo" idiom.',
        },
        {
          label: 'Exercise 3: Integer overflow.',
          body: 'Include <limits.h>. Print INT_MAX and INT_MAX+1 (as signed int). ' +
            'On a 32-bit int system: INT_MAX = 2147483647; INT_MAX+1 = -2147483648 (wraps in practice). ' +
            'Warning: this is technically undefined behaviour for signed int. ' +
            'Then print UINT_MAX+1 as unsigned — should be 0 (well-defined wrap).',
        },
        {
          label: 'Exercise 4: sizeof operator.',
          body: 'Print sizeof(char), sizeof(short), sizeof(int), sizeof(long), sizeof(long long), sizeof(float), sizeof(double). ' +
            'Also print sizeof("hello") — note it includes the null terminator, so result = 6. ' +
            'Verify that sizeof always gives values in bytes.',
        },
        {
          label: 'Exercise 5: Precedence trap.',
          body: 'Predict then verify: int x = 2 + 3 * 4; → 14 (not 20, * before +). ' +
            'int y = 8 / 2 * 4; → 16 (left-to-right: (8/2)*4). ' +
            'int z = 1 << 2 + 1; → 8 (+ before <<: 1 << 3). ' +
            'Always use parentheses to make intent explicit when mixing operators.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record your actual output below and compare with the expected values.',
        'Note any discrepancies — they may indicate compiler warnings or platform-specific behaviour.',
      ],
      table: {
        headers: ['Expression', 'Expected Output', 'Actual Output', 'Notes'],
        rows: [
          ['7 / 2', '3', '', 'Integer truncation'],
          ['7.0 / 2', '3.500000', '', 'Float promotion'],
          ['-10 % 3', '-1', '', 'C99 sign rule'],
          ['INT_MAX + 1', '-2147483648 (impl.)', '', 'UB for signed'],
          ['sizeof(double)', '8', '', 'Platform-dependent'],
          ['2 + 3 * 4', '14', '', 'Precedence: * before +'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This lab demonstrated the critical differences between integer and floating-point arithmetic ' +
        'in C: integer division truncates, the modulo sign follows the dividend, and signed integer ' +
        'overflow is undefined behaviour (use unsigned or larger types for overflow-safe arithmetic).',

        'Operator precedence and implicit type conversion are common sources of subtle bugs. ' +
        'The safest practice is to use explicit casts and parentheses whenever the intended evaluation ' +
        'order might be ambiguous, and to enable compiler warnings (-Wall -Wextra in GCC/Clang).',

        'Understanding these low-level arithmetic behaviours is essential for systems programming, ' +
        'embedded development, and any application where correctness of numeric computation matters.',
      ],
    },
  ],
};
