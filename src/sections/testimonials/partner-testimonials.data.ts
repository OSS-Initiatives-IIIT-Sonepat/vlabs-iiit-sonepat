export type PartnerTestimonialRecord = {
  author: {
    designation: string;
    name: string;
    portraitSrc: string;
  };
  quote: string;
};

export const PARTNER_TESTIMONIALS: readonly PartnerTestimonialRecord[] = [
  {
    quote: "VLabs gives you the kind of flexibility that actually changes what you can offer your students. The component system is clean, the circuits are open, and when something needs to be customized, you can just do it. There's no fighting the platform.",
    author: {
      name: 'Benjamin Reynolds',
      designation: 'Principal and Founder, Alternative Partners',
      portraitSrc: '/images/partners/testimonials/benjamin-reynolds.webp',
    },
  },
  {
    quote: "The flexibility is just amazing. Literally, there's nothing you cannot do. You can create objects, access everything through the API, pull notes and send them to the portal. Try doing that in HubSpot. No way. It's the true ability to build exactly what's actually needed.",
    author: {
      name: 'Bertrams',
      designation: 'Founder, Wintactix',
      portraitSrc: '/images/partners/testimonials/bertrams.webp',
    },
  },
  {
    quote: "VLabs opens the door to building educational tools, not just static content. For example, we're developing a WhatsApp Business integration that any institution could use. That's a recurring value stream we wouldn't have if we were just configuring someone else's platform.",
    author: {
      name: 'Mike Babiy',
      designation: 'Founder, Nine Dots Ventures',
      portraitSrc: '/images/partners/testimonials/mike-babiy.webp',
    },
  },
];
