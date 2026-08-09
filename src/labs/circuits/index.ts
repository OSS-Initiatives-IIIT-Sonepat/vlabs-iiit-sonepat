import { HalfAdder }      from './half-adder';
import { FullAdder }      from './full-adder';
import { HalfSubtractor } from './half-subtractor';
import { FullSubtractor } from './full-subtractor';
import { Mux2to1 }        from './mux';
import { Demux1to2 }      from './demux';
import { Encoder4to2 }    from './encoder';
import { Decoder2to4 }    from './decoder';
import { type Circuit }   from '@/labs/types';

export const ALL_CIRCUITS: Circuit[] = [
  HalfAdder,
  FullAdder,
  HalfSubtractor,
  FullSubtractor,
  Mux2to1,
  Demux1to2,
  Encoder4to2,
  Decoder2to4,
];

export {
  HalfAdder, FullAdder, HalfSubtractor, FullSubtractor,
  Mux2to1, Demux1to2, Encoder4to2, Decoder2to4,
};
