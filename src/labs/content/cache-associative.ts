import { type LabContent } from '@/labs/lab-content.types';

export const cacheAssociative: LabContent = {
  id: 'cache-associative',
  title: 'Cache Memory: Fully-Associative with LRU',
  labType: 'simulation',
  sections: [
    {
      id: 'theory',
      type: 'text',
      title: 'Theory',
      paragraphs: [
        'In a fully-associative cache, any main-memory block can be placed in any cache line. There is no index field — the entire address (except the block offset) forms the tag. This eliminates conflict misses entirely.',
        'This simulator uses an 8-bit address space, 4 cache lines, and 4-byte blocks:\n  • Offset (bits 1–0): selects byte within block (2 bits)\n  • Tag (bits 7–2): identifies the block (6 bits — no index field)',
        'On a cache miss, a new block must be loaded. If all lines are occupied, one must be evicted. The Least Recently Used (LRU) replacement policy evicts the block that was accessed least recently. Each line maintains an LRU order counter (0 = most recently used, 3 = least recently used for eviction).',
        'LRU update rule: On every access (hit or miss), the accessed line becomes MRU (order=0). All other lines that were more recently used than the evicted/loaded line have their order incremented by 1.',
        'Comparison with direct-mapped: Fully-associative has no conflict misses (any block fits anywhere) but requires searching all lines in parallel on every access — expensive in hardware. A 4-way set-associative cache is a practical compromise used in modern CPUs.',
        'Capacity misses occur when the working set exceeds the total cache capacity. Even a fully-associative cache cannot avoid these.',
      ],
    },
    {
      id: 'apparatus',
      type: 'apparatus',
      title: 'Apparatus',
      items: [
        { name: 'Fully-Associative Cache', specification: '4 lines × 4 bytes per block, LRU replacement' },
        { name: 'Tag Comparator Array', specification: 'Parallel comparison of all 4 tags on each access' },
        { name: 'LRU State Machine', specification: 'Tracks recency order for all 4 lines' },
        { name: 'Main Memory Model', specification: '256 bytes — mem[addr] = addr XOR 0x42' },
        { name: 'Hit/Miss/Eviction Counter', specification: 'Running statistics with hit rate' },
      ],
    },
    {
      id: 'simulation',
      type: 'simulation',
      title: 'Simulation',
      simType: 'cache-assoc',
      description: 'Enter an 8-bit hex address (00–FF) and click ACCESS. Watch LRU orders update on every access. Evicted lines are highlighted in yellow.',
    },
    {
      id: 'procedure',
      type: 'procedure',
      title: 'Procedure',
      steps: [
        {
          label: 'Fill the cache',
          body: 'Access addresses 0x00, 0x10, 0x20, 0x30 in sequence.\nEach maps to a different block (tag = addr >> 2 = 0, 4, 8, 12).\nAfter 4 accesses all lines are occupied. Observe LRU orders: 0x30 is MRU (0), 0x00 is LRU (3).',
        },
        {
          label: 'Hit on existing block',
          body: 'Access 0x00 again.\nObserve: HIT — the block is still in cache (no conflict eviction unlike direct-mapped!).\nLRU order updates: 0x00 becomes MRU (0), 0x30 drops to order 1, etc.',
        },
        {
          label: 'LRU eviction',
          body: 'Access 0x40 (a new block, tag=16, not in cache).\nObserve: MISS. The LRU line (the one with order=3) is evicted and replaced.\nNote the yellow highlight on the evicted line.',
        },
        {
          label: 'Compare with direct-mapped',
          body: 'Perform the same sequence as the direct-mapped experiment: 0x00, 0x04, 0x08, 0x20, 0x00.\nNote that 0x00 and 0x20 have different tags (0 and 8 respectively) and map to DIFFERENT lines here.\nThe re-access to 0x00 should be a HIT — no conflict eviction occurred!',
        },
        {
          label: 'Thrashing with capacity',
          body: 'Access 5 distinct blocks in a round-robin: 0x00, 0x10, 0x20, 0x30, 0x40, 0x00, 0x10...\nWith only 4 lines and 5 working blocks, even LRU cannot prevent evictions.\nObserve near-zero hit rate — this is a capacity miss scenario.',
        },
        {
          label: 'Hit rate comparison',
          body: 'Reset both caches. Run the same 10-access sequence on both direct-mapped and fully-associative.\nRecord the final hit rates and identify which accesses became hits in the associative cache that were misses in direct-mapped.',
        },
      ],
    },
    {
      id: 'observation',
      type: 'observation',
      title: 'Observations',
      paragraphs: [
        'Run the sequence 0x00, 0x04, 0x08, 0x20, 0x00 and compare results with the direct-mapped experiment.',
      ],
      table: {
        headers: ['Access #', 'Address', 'Tag', 'Direct-Mapped', 'Fully-Assoc', 'LRU Line Evicted'],
        rows: [
          ['1', '0x00', '0', 'MISS', '', '—'],
          ['2', '0x04', '1', 'MISS', '', '—'],
          ['3', '0x08', '2', 'MISS', '', '—'],
          ['4', '0x20', '8', 'MISS', '', '—'],
          ['5', '0x00', '0', 'MISS (conflict)', '', ''],
        ],
      },
    },
    {
      id: 'conclusion',
      type: 'conclusion',
      title: 'Conclusion',
      paragraphs: [
        'The fully-associative cache with LRU replacement eliminates conflict misses by allowing any block to occupy any cache line. The re-access to 0x00 after accessing 0x20 is a HIT in the associative cache, compared to a MISS in the direct-mapped cache.',
        'LRU replacement is optimal for working sets that fit entirely in cache, since it retains the most recently used data. However, for cyclic access patterns larger than the cache, LRU performs as poorly other policy.',
        'The practical cost of full associativity is hardware complexity: all tags must be compared simultaneously, requiring as many comparators as cache lines. Modern CPUs use 4-way or 8-way set-associative designs as a balanced compromise between hit rate and hardware cost.',
      ],
    },
  ],
};
