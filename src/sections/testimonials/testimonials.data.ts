export type TestimonialRecord = {
  author: { name: string; designation: string };
  quote: string;
};

export const TESTIMONIALS: readonly TestimonialRecord[] = [
  {
    quote: 'The flexibility is really what made the difference. Our needs evolve very fast. I discover a new need and in two clicks I can address it. That is a real advantage when you are moving quickly.',
    author: {
      name: 'Olivier Reinaud',
      designation: 'Co-founder at NetZero',
    },
  },
  {
    quote: "We didn't want to patch over the problem. We wanted to build something institutions could rely on at scale, and that meant starting from a foundation solid enough to support the full complexity of what we had in mind.",
    author: {
      name: 'Amrendra Pratap Singh',
      designation: 'VP of Engineering at W3villa Technologies',
    },
  },
  {
    quote: 'It is just such a nicer experience than dealing with a Salesforce or a HubSpot. My mission has been to get every tool API-accessible, so everything talks to each other. Twenty made that possible in a way older CRM platforms simply do not.',
    author: {
      name: 'Justin Beadle',
      designation: 'Director of Digital and Information, Elevate Consulting',
    },
  },
];
