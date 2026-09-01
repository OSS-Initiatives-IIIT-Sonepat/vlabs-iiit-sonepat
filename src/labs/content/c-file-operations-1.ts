import { type LabContent } from '@/labs/lab-content.types';

export const CFileOperations1Content: LabContent = {
  id: 'c-file-operations-1',
  title: 'C Programming — File Operations I',
  labType: 'text',

  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'File I/O in C is handled through the standard library `<stdio.h>`. All file operations work ' +
        'through a FILE pointer — an opaque structure that holds the state of an open file (buffer, ' +
        'position, error flags). The programmer never accesses the FILE structure directly; all ' +
        'operations go through library functions.',

        'Opening a file: `FILE *fp = fopen(filename, mode)`. Mode strings: ' +
        '"r" — open for reading (file must exist). ' +
        '"w" — open for writing (creates or truncates). ' +
        '"a" — open for appending (creates if not exists, writes always go to end). ' +
        '"r+" — open for reading and writing (file must exist). ' +
        '"w+" — open for reading and writing (creates or truncates). ' +
        '"a+" — open for reading and appending. ' +
        'fopen returns NULL on failure (file not found, permission denied). ' +
        'Always check for NULL before using the pointer.',

        'Closing a file: `fclose(fp)` flushes the buffer and releases the file descriptor. ' +
        'Always call fclose when done — leaving files open wastes system resources and may lose data ' +
        'still in the write buffer. On program exit, all open files are closed, but it is best practice ' +
        'to close explicitly.',

        'Writing to a text file: ' +
        '`fprintf(fp, "format", ...)` — works like printf but writes to fp. ' +
        '`fputs(str, fp)` — writes a string (no newline appended, unlike puts). ' +
        '`fputc(ch, fp)` — writes one character.',

        'Reading from a text file: ' +
        '`fscanf(fp, "format", &var)` — works like scanf but reads from fp. Returns number of items read or EOF. ' +
        '`fgets(buffer, size, fp)` — reads a line (up to size-1 chars, stops at \\n or EOF, null-terminates). Preferred over gets (which has no buffer limit). ' +
        '`fgetc(fp)` — reads one character, returns int (to accommodate EOF = -1).',

        'Error handling: `feof(fp)` returns non-zero if end-of-file was reached. ' +
        '`ferror(fp)` returns non-zero if an error occurred on fp. ' +
        '`clearerr(fp)` clears both EOF and error flags. ' +
        'Always check return values: fscanf returns the number of items successfully matched; ' +
        'fgets returns NULL at EOF or error.',
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
        { name: 'File System Access',      specification: 'Write permission in working directory',        quantity: '1' },
      ],
    },

    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure — Student Record File',
      steps: [
        {
          label: 'Write a struct definition for a student record.',
          body: 'Define:\n' +
            'typedef struct {\n' +
            '    int   roll_no;\n' +
            '    char  name[50];\n' +
            '    float marks;\n' +
            '} Student;\n' +
            'This struct holds one record. An array of 5 will hold all records.',
        },
        {
          label: 'Write 5 student records to a text file.',
          body: 'Open "students.txt" with mode "w". Check for NULL. ' +
            'Loop 5 times, calling fprintf for each record: ' +
            'fprintf(fp, "%d %s %.2f\\n", students[i].roll_no, students[i].name, students[i].marks); ' +
            'Close the file with fclose(fp). ' +
            'Verify the file was created in the current directory.',
        },
        {
          label: 'Read the records back using fscanf.',
          body: 'Open "students.txt" with mode "r". Check for NULL. ' +
            'Use a while loop with fscanf: ' +
            'while (fscanf(fp, "%d %s %f", &r.roll_no, r.name, &r.marks) == 3) { print r; } ' +
            'Close the file. Verify all 5 records are read correctly.',
        },
        {
          label: 'Append one more record using mode "a".',
          body: 'Open "students.txt" with mode "a". ' +
            'Write a 6th student record using fprintf. ' +
            'Close the file. ' +
            'Re-open with "r" and count lines with fgetc to verify 6 records exist.',
        },
        {
          label: 'Handle errors gracefully.',
          body: 'Attempt to open a non-existent file with "r". ' +
            'Check if fp == NULL and print strerror(errno) from <errno.h>. ' +
            'This shows the error message from the OS (e.g., "No such file or directory"). ' +
            'Always handle file open failures in production code.',
        },
      ],
    },

    {
      id: 'observations',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'The text file "students.txt" should contain one student record per line.',
        'fscanf correctly parses each field when the format string matches the written format.',
        'Mode "a" preserves existing content — contrast with "w" which truncates.',
      ],
      table: {
        headers: ['fopen mode', 'File exists?', 'File absent?', 'Read?', 'Write?', 'Position'],
        rows: [
          ['"r"',  'Opens',    'NULL',    'Yes', 'No',  'Start'],
          ['"w"',  'Truncates','Creates', 'No',  'Yes', 'Start'],
          ['"a"',  'Opens',    'Creates', 'No',  'Yes', 'End'],
          ['"r+"', 'Opens',    'NULL',    'Yes', 'Yes', 'Start'],
          ['"w+"', 'Truncates','Creates', 'Yes', 'Yes', 'Start'],
          ['"a+"', 'Opens',    'Creates', 'Yes', 'Yes', 'End (writes)'],
        ],
      },
    },

    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'Text file I/O in C was demonstrated using fopen, fprintf, fscanf, fgets, and fclose. ' +
        'The FILE pointer abstraction provides a consistent interface regardless of the underlying ' +
        'operating system. Mode strings control the open mode: read, write, append, or combinations.',

        'Error handling is critical: fopen returns NULL on failure, and fscanf returns EOF or a count ' +
        'less than expected when data is malformed or exhausted. Always check these return values. ' +
        'Forgetting to fclose a file in write mode can result in lost data still in the C library buffer.',

        'File Operations II (the next lab) covers binary files, fseek for random access, and reading ' +
        'and writing struct records directly with fread/fwrite for more efficient storage.',
      ],
    },
  ],
};
