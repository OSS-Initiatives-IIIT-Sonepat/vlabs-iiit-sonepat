export type TestimonialRecord = {
  author: { name: string; designation: string };
  quote: string;
};

export const TESTIMONIALS: readonly TestimonialRecord[] = [
  {
    quote: 'Before VLabs, students would spend half the lab session just getting the hardware to behave. Now they walk in having already verified the circuit virtually, and we can focus entirely on what the experiment is actually teaching.',
    author: {
      name: 'John Doe 1',
      designation: 'Associate Professor, Electronics Engineering',
    },
  },
  {
    quote: 'Building a full-wave bridge rectifier on a physical breadboard takes 40 minutes and someone always burns an LED. On VLabs I had the circuit running, sweep measured, and ripple factor calculated in under ten minutes.',
    author: {
      name: 'John Doe 2',
      designation: 'B.Tech Student, Electrical Engineering',
    },
  },
  {
    quote: 'The 8085 emulator is exactly what was missing. Students can single-step through assembly, watch registers change, and actually understand the fetch-decode-execute cycle instead of just memorising it for the exam.',
    author: {
      name: 'John Doe 3',
      designation: 'Head of Department, Computer Engineering',
    },
  },
];
