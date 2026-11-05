import { SITE_URLS } from "@/platform/site-urls";

export const PARTICIPATING_INSTITUTIONS = {
  eyebrow: "Participating institutions.",
  heading: "Build VLabs with us",
  lead: "We have been building VLabs largely on our own. We would love your help — especially from other IIITs and ECE departments ready to co-author modules and labs.",
  image: {
    src: "/participating-institutes.png",
    alt: "Handshake between institutions under a network of campus icons",
  },
  paragraphs: [
    "VLabs started at IIIT Sonepat, but the labs, modules, and documentation will go further if more institutions join in — reviewing procedures, authoring new experiments, localising content, or mentoring student contributors.",
    "If your institute wants to participate, tell us what you can offer: a faculty contact, a student club, a set of missing labs, or simply a willingness to pilot VLabs in a course. We are especially keen to partner with other IIITs and peer engineering colleges.",
    "Fill the participation form, or write to us. We will follow up with next steps for collaboration.",
  ],
  bullets: [
    {
      label: "Author modules & labs",
      detail:
        "Help write or review experiments — from analog electronics to digital and computer-organisation labs — using our typed content pipeline.",
    },
    {
      label: "Pilot in your courses",
      detail:
        "Run VLabs alongside (or ahead of) physical lab sessions and send feedback on what students need.",
    },
    {
      label: "Grow the network",
      detail:
        "Connect your Technical Society, IEEE student branch, or department with ours so contributors have a clear path in.",
    },
  ],
  contact: {
    emailLabel: "technicalsociety@iiitsonepat.ac.in",
    emailHref: SITE_URLS.participateEmail,
    formHref: SITE_URLS.participateForm,
    formLabel: "Open participation form",
  },
};
