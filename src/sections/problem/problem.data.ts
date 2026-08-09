export type ProblemPoint = {
  heading: string;
  body: string;
};

export const PROBLEM_POINTS: readonly ProblemPoint[] = [
  {
    heading: 'The Giant Monolith',
    body: 'Proprietary languages, slow deployment cycles, and "black box" logic.',
  },
  {
    heading: 'The In-house Burden',
    body: "It's fragile. V1 ships quickly, but maintaining and making changes is a long term burden.",
  },
];
