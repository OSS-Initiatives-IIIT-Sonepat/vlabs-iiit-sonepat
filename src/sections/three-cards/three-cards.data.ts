import { type EceKind } from './ece/EceModel';

export type IllustrationId = EceKind;

export type IllustrationCardRecord = {
  attribution?: { role: string; company: string };
  body: string;
  caseStudySlug?: string;
  heading: string;
  illustration: IllustrationId;
};

export const ILLUSTRATION_CARDS: readonly IllustrationCardRecord[] = [
  {
    heading: 'Breadboard',
    body: 'The solderless breadboard is the starting point for every ECE prototype — snap in components, route jumper wires, and iterate without soldering.',
    attribution: {
      role: 'Core component',
      company: 'Prototyping',
    },
    illustration: 'breadboard',
  },
  {
    heading: 'LED',
    body: 'A light-emitting diode converts current directly into light. Polarity matters: the longer anode lead goes to positive, the flat-side cathode to ground.',
    attribution: {
      role: 'Output component',
      company: 'Optoelectronics',
    },
    illustration: 'led',
  },
  {
    heading: 'Resistor',
    body: 'Resistors limit current and set voltage levels. Read the four colour bands — orange, orange, brown, gold — to identify the value and tolerance.',
    attribution: {
      role: 'Passive component',
      company: 'Circuit fundamentals',
    },
    illustration: 'resistor',
  },
];
