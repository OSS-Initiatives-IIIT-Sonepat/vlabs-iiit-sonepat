import { type LabContent } from '@/labs/lab-content.types';

export const memoryDesign: LabContent = {
  id: 'memory-design',
  title: 'Memory Design: ROM & RAM',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Computer memory is organised into a flat array of byte-addressable locations. Each location holds 8 bits (1 byte) and is uniquely identified by a binary address. This simulator models a 256-byte memory space (addresses 0x00–0xFF) divided into two regions.',
        'ROM (Read-Only Memory): Addresses 0x00–0x1F (32 bytes). ROM is pre-programmed at manufacturing time and cannot be altered at runtime. It typically stores the BIOS or boot firmware. In this simulation, the ROM is pre-loaded with fixed data including patterns like 0xFF, 0xAA, 0x55, and 0xDE 0xAD 0xBE 0xEF.',
        'RAM (Random-Access Memory): Addresses 0x20–0xFF (224 bytes). RAM is writable — the CPU can read or write any location. Data is lost when power is removed (volatile).',
        'Address decoding: The memory controller uses the upper bits of the address to select the correct chip (ROM or RAM). A chip-select signal enables only one device at a time, preventing bus conflicts.',
        'Data bus: An 8-bit bidirectional data bus connects the CPU to memory. During a READ cycle, the memory drives the bus. During a WRITE cycle, the CPU drives the bus and the memory latches the data on the rising clock edge.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Virtual Memory Module', specification: '256 bytes — ROM (0x00–0x1F) + RAM (0x20–0xFF)' },
        { name: 'Address Register', specification: '8-bit hex input' },
        { name: 'Data Register', specification: '8-bit hex input/output' },
        { name: 'Read/Write Control', specification: 'READ and WRITE buttons with write-protect for ROM' },
        { name: '16×16 Memory Map Display', specification: 'All 256 cells visible simultaneously' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'memory',
      description: 'Click any cell in the memory grid to select its address. Use READ and WRITE buttons to access memory. ROM cells (grey/purple) are read-only.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Read from ROM',
          body: 'Enter address 0x02 and click READ.\nObserve: the cell at row 00, column 02 highlights blue, and the status bar shows "READ 0x3C from 0x02".\nThe pre-loaded ROM value 0x3C cannot be changed.',
        },
        {
          label: 'Write to RAM',
          body: 'Enter address 0x20 (first RAM location) and data 0x5A, then click WRITE.\nObserve: the cell turns orange, status bar shows "WROTE 0x5A to 0x20".\nThis is the first writable byte in the RAM region.',
        },
        {
          label: 'Read back from RAM',
          body: 'With address still 0x20, click READ.\nObserve: the previously written value 0x5A is returned.\nThis confirms the RAM stored the data correctly.',
        },
        {
          label: 'Attempt ROM write',
          body: 'Enter address 0x00 (ROM region) and data 0xAB, then click WRITE.\nObserve: an error message appears — "ROM is read-only!".\nNo data is changed. This demonstrates hardware write protection.',
        },
        {
          label: 'Fill a RAM sequence',
          body: 'Write the value 0xFF to addresses 0x30, 0x31, 0x32, 0x33 in sequence.\nObserve the memory grid updating with each write.\nThen click RESET and confirm the RAM values return to 0x00 while ROM data is restored.',
        },
        {
          label: 'Explore the memory map',
          body: 'Click various cells directly in the memory grid.\nObserve how the address input updates automatically.\nNotice the colour distinction: purple tones for ROM, neutral for RAM.',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record your memory access results in the table below.',
      ],
      table: {
        headers: ['Address', 'Operation', 'Data Value', 'Region', 'Result / Status'],
        rows: [
          ['0x02', 'READ', '', 'ROM', ''],
          ['0x0F', 'READ', '', 'ROM', ''],
          ['0x20', 'WRITE 0x5A', '0x5A', 'RAM', ''],
          ['0x20', 'READ', '', 'RAM', ''],
          ['0x00', 'WRITE 0xAB', '0xAB', 'ROM', ''],
          ['0xFF', 'WRITE 0x42', '0x42', 'RAM', ''],
          ['0xFF', 'READ', '', 'RAM', ''],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'This experiment demonstrated the key distinction between ROM and RAM in a memory system. ROM provides non-volatile, read-only storage suitable for firmware, while RAM provides fast, writable storage for runtime data.',
        'Address decoding automatically routes read/write requests to the correct memory type based on the upper address bits. Write-protection of ROM is enforced at the hardware level, not in software.',
        'The 256-byte memory model used here scales directly to real systems: a 32-bit CPU with a 4 GB address space uses the same principles — only the address and data bus widths differ.',
      ],
    },
  ],
};
