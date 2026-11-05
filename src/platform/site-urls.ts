// Every external destination the site links to, in one place. Sections and
// data files never inline these.
export const SITE_URLS: Record<
  | "appWelcome"
  | "calBooking"
  | "discord"
  | "docsApi"
  | "docsDevelopers"
  | "docsGettingStarted"
  | "docsMcp"
  | "docsUserGuide"
  | "github"
  | "linkedin"
  | "participateEmail"
  | "participateForm"
  | "trustCenter"
  | "x",
  string
> = {
  appWelcome: "/onboarding",
  calBooking: "https://cal.com/forms/f7841033-0a20-4958-8c92-4e34ec128a81",
  discord: "https://discord.gg/5MaJbxFnm",
  docsApi: "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  docsDevelopers: "/docs",
  docsGettingStarted:
    "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  docsMcp: "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  docsUserGuide:
    "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  github: "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  linkedin:
    "https://www.linkedin.com/company/technical-society-iiit-sonepat/posts/?feedView=all",
  // Replace participateForm with the live Google Form URL when ready.
  participateEmail:
    "mailto:technicalsociety@iiitsonepat.ac.in?subject=VLabs%20Institutional%20Participation",
  participateForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSfPLACEHOLDER/viewform",
  trustCenter:
    "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
  x: "https://github.com/OSS-Initiatives-IIIT-Sonepat/vlabs-iiit-sonepat",
};
