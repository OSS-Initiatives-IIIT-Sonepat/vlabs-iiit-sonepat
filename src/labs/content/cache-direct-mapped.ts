import { type LabContent } from '@/labs/lab-content.types';

export const cacheDirectMapped: LabContent = {
  id: 'cache-direct-mapped',
  title: 'Cache Memory: Direct-Mapped',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'Cache memory is a small, fast SRAM placed between the CPU and main memory. It exploits the principle of locality: recently accessed data and nearby data are likely to be accessed again soon.',
        'In a direct-mapped cache, each main-memory block maps to exactly one cache line. This is determined by the address structure: the address is split into TAG, INDEX, and OFFSET fields.',
        'This simulator uses a 9-bit address space, 8 cache lines, and 4-byte blocks:\n  • Offset (bits 1–0): selects byte within block (2 bits → 4 bytes)\n  • Index (bits 4–2): selects cache line (3 bits → 8 lines)\n  • Tag (bits 8–5): distinguishes blocks that map to the same line (4 bits)',
        'Cache hit: The accessed address is found in cache — the valid bit is 1 AND the stored tag matches the address tag. Hit latency is ~1–4 CPU cycles.',
        'Cache miss: The block is not in cache. The CPU must fetch the entire 4-byte block from main memory (~100+ cycles). This is called a cold miss (first access) or conflict miss (two addresses compete for the same line).',
        'Conflict misses are the key weakness of direct-mapped caches. If two frequently used addresses map to the same index (same low bits), they will evict each other on every access, causing a thrashing pattern with 0% hit rate.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Direct-Mapped Cache', specification: '8 lines × 4 bytes per block' },
        { name: 'Address Decoder', specification: '9-bit address → 4-bit tag, 3-bit index, 2-bit offset' },
        { name: 'Main Memory Model', specification: '512 bytes — mem[addr] = addr XOR 0x42' },
        { name: 'Hit/Miss Counter', specification: 'Running totals and hit rate percentage' },
        { name: 'Cache State Display', specification: 'Valid bit, tag, and block data per line' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'cache-direct',
      description: 'Enter a 9-bit hex address (000–1FF) and click ACCESS to simulate a cache lookup. Watch for HIT (green) or MISS (red) responses.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Cold miss — first access',
          body: 'Enter address 0x00 and click ACCESS.\nObserve: MISS (cache was empty). Line 0 is loaded with block data from memory.\nTag=0, Index=0, Offset=0. This is a cold miss — the first access to any block is always a miss.',
        },
        {
          label: 'Cache hit — same block',
          body: 'Enter address 0x01 and click ACCESS.\nObserve: HIT — this address is in the same 4-byte block as 0x00 (same index, same tag, different offset).\nThe hit rate should now be 50% (1 hit out of 2 accesses).',
        },
        {
          label: 'Different index',
          body: 'Enter address 0x04 and click ACCESS.\nAddress 0x04: tag=0, index=1, offset=0 — maps to a different cache line.\nObserve: MISS (line 1 was empty). Line 1 is now loaded.',
        },
        {
          label: 'Another different block',
          body: 'Enter address 0x08 (index=2) and then 0x20 (index=0 again, but tag=1).\nFor 0x20: tag=1, index=0 — same line as 0x00 but DIFFERENT tag.\nObserve: MISS at 0x20 — this evicts the block loaded for 0x00!',
        },
        {
          label: 'Conflict miss demonstration',
          body: 'Now access 0x00 again.\nObserve: MISS again, even though we accessed it before.\nThis is a conflict miss: 0x00 (tag=0, index=0) and 0x20 (tag=1, index=0) compete for line 0.\nAlternating between them will always cause misses.',
        },
        {
          label: 'Measure hit rate',
          body: 'Perform the full sequence: 0x00, 0x04, 0x08, 0x20, 0x00\nRecord accesses, hits, misses, and final hit rate.\nCompare with the fully-associative cache experiment to see the impact of conflict misses.',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Record each access in the sequence below. Note the tag, index, and whether the access was a hit or miss.',
      ],
      table: {
        headers: ['Access #', 'Address', 'Tag', 'Index', 'Offset', 'Hit/Miss', 'Running Hit Rate'],
        rows: [
          ['1', '0x00', '0', '0', '0', '', ''],
          ['2', '0x01', '0', '0', '1', '', ''],
          ['3', '0x04', '0', '1', '0', '', ''],
          ['4', '0x08', '0', '2', '0', '', ''],
          ['5', '0x20', '1', '0', '0', '', ''],
          ['6', '0x00', '0', '0', '0', '', ''],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The direct-mapped cache experiment demonstrates both the power and the limitation of this cache organisation.',
        'Cold misses are unavoidable on first access but subsequent accesses to the same block are fast hits. However, conflict misses occur when two frequently used addresses share the same cache index — they thrash each other out of the cache.',
        'The access sequence 0x00, 0x04, 0x08, 0x20, 0x00 clearly shows this thrashing: despite only five accesses, the re-access to 0x00 is a miss because 0x20 evicted it.',
        'Mitigations include: set-associative caches (allow more than one block per index) or software restructuring of data access patterns to avoid aliasing.',
      ],
    },
  ],
};
