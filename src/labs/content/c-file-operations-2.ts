import { type LabContent } from '@/labs/lab-content.types';

export const CFileOperations2Content: LabContent = {
  id: 'c-file-operations-2',
  title: 'C Programming — File Operations II',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Binary files store data in the same memory representation as the C variables — no conversion ' +
        'to text and back. This makes read/write faster and the files smaller for numeric data ' +
        '(a 4-byte int is stored as exactly 4 bytes, vs up to 11 characters in text mode for "2147483647"). ' +
        'Open binary files with "rb", "wb", "ab", "rb+", "wb+", "ab+" (append "b" to the mode string).',

        'fwrite and fread work with blocks of memory: ' +
        '`size_t fwrite(const void *ptr, size_t size, size_t count, FILE *fp)` — writes count items of size bytes each from ptr. Returns number of items written (should equal count on success). ' +
        '`size_t fread(void *ptr, size_t size, size_t count, FILE *fp)` — reads count items of size bytes each into ptr. Returns number of items successfully read.',

        'To write a struct array: `fwrite(records, sizeof(Student), n, fp)` — writes n Student structs in one call. ' +
        'To read back: `fread(&rec, sizeof(Student), 1, fp)` — reads one struct at a time, or ' +
        '`fread(records, sizeof(Student), n, fp)` — reads up to n structs.',

        'Random access with fseek and ftell: ' +
        '`int fseek(FILE *fp, long offset, int whence)` — moves the file position indicator. ' +
        'whence values: SEEK_SET (from start), SEEK_CUR (from current position), SEEK_END (from end). ' +
        '`long ftell(FILE *fp)` — returns the current file position in bytes from the start. ' +
        '`void rewind(FILE *fp)` — equivalent to fseek(fp, 0, SEEK_SET) + clearerr(fp).',

        'Accessing the n-th record: in a binary file of fixed-size structs, record n starts at byte ' +
        'offset $n \\times \\text{sizeof(struct)}$ from the start. So: ' +
        '`fseek(fp, n * sizeof(Student), SEEK_SET)` positions the file pointer at record n, ' +
        'then `fread(&rec, sizeof(Student), 1, fp)` reads it. This is O(1) random access — ' +
        'far faster than scanning a text file line by line.',

        'Text vs binary file size comparison: for 1000 integer values from 0 to 999: ' +
        'Text file: average ~3 characters + newline = ~4 bytes each = ~4 KB. ' +
        'Binary file: exactly 4 bytes per int = exactly 4 KB. ' +
        'For floating-point: text "3.141593" = 8 chars; binary double = 8 bytes — similar size but binary is exact (no rounding from decimal conversion). ' +
        'For structs with fixed-size fields, binary is almost always more compact and faster.',
      ],
    },

    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus Required',
      items: [
        { name: 'C Compiler',              specification: 'GCC 9+ or Clang 10+',                          quantity: '1' },
        { name: 'IDE or Text Editor',      specification: 'VS Code, Code::Blocks, or any text editor',   quantity: '1' },
        { name: 'Terminal / Command Prompt', specification: 'For compiling and running programs',        quantity: '1' },
        { name: 'Hex Editor (optional)',   specification: 'HxD or xxd for inspecting binary files',       quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Binary File with Random Access',
      steps: [
        {
          label: 'Write 10 student structs to a binary file.',
          body: 'Open "students.bin" with mode "wb". ' +
            'Create an array of 10 Student structs with distinct roll numbers (1–10), names, and marks. ' +
            'Call fwrite(students, sizeof(Student), 10, fp). ' +
            'fclose(fp). ' +
            'Use ftell just before fclose to verify the file size = 10 × sizeof(Student).',
        },
        {
          label: 'Read the entire file back and print all records.',
          body: 'Open "students.bin" with mode "rb". ' +
            'Use a loop: while (fread(&rec, sizeof(Student), 1, fp) == 1) { print rec; }. ' +
            'Close the file. Verify all 10 records match what was written.',
        },
        {
          label: 'Use fseek to read the 5th record directly.',
          body: 'Open "students.bin" with mode "rb". ' +
            'int n = 4; // 0-indexed, so n=4 is the 5th record. ' +
            'fseek(fp, n * sizeof(Student), SEEK_SET). ' +
            'fread(&rec, sizeof(Student), 1, fp). ' +
            'Print rec. Verify it matches the 5th student written. ' +
            'Note: this is O(1) — independent of how many records exist.',
        },
        {
          label: 'Update a record in-place using "rb+" mode.',
          body: 'Open "students.bin" with mode "rb+". ' +
            'Seek to the 3rd record: fseek(fp, 2 * sizeof(Student), SEEK_SET). ' +
            'Modify the marks field of the in-memory struct. ' +
            'Write it back: fwrite(&updated_rec, sizeof(Student), 1, fp). ' +
            'fclose. Reopen and verify the 3rd record now has the updated marks.',
        },
        {
          label: 'Compare file sizes: text vs binary.',
          body: 'Write the same 10 records to "students.txt" (text mode, fprintf). ' +
            'Compare the file sizes: ls -la (Linux/Mac) or dir (Windows). ' +
            'Use ftell at the end of writing for both files to print exact byte counts. ' +
            'Observe which format is more compact for structured numeric data.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Binary files enable O(1) random access to any record using fseek with a calculated byte offset.',
        'fread and fwrite transfer exact memory images — no format conversion, no newline processing.',
        'Binary files are not human-readable: use a hex editor to inspect them.',
      ],
      table: {
        headers: ['Operation', 'Function', 'Mode', 'Notes'],
        rows: [
          ['Write struct array', 'fwrite(arr, sizeof(S), n, fp)', '"wb"', 'Writes n structs'],
          ['Read struct', 'fread(&s, sizeof(S), 1, fp)', '"rb"', 'Reads 1 struct'],
          ['Seek to record n', 'fseek(fp, n*sizeof(S), SEEK_SET)', 'any', 'O(1) positioning'],
          ['Get position', 'ftell(fp)', 'any', 'Bytes from start'],
          ['Rewind', 'rewind(fp)', 'any', 'Back to byte 0'],
          ['Update in-place', 'fseek + fwrite', '"rb+"', 'Overwrite at position'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'Binary file I/O using fread/fwrite provides efficient, compact storage for structured data. ' +
        'The fixed-size struct enables O(1) random access via fseek with a calculated byte offset, ' +
        'making binary files suitable for simple database-like applications.',

        'fseek with SEEK_SET, SEEK_CUR, and SEEK_END provides complete control over the file ' +
        'position indicator, allowing both sequential and random access patterns. The ftell function ' +
        'is useful for measuring file size and saving/restoring position.',

        'Binary files are not portable across platforms with different struct padding or endianness. ' +
        'For cross-platform data exchange, use serialization formats (JSON, Protocol Buffers, ' +
        'or explicit byte-order-neutral binary formats). For local applications where portability is ' +
        'not a concern, binary files with fixed-size structs are an efficient and simple solution.',
      ],
    },
  ],
};
