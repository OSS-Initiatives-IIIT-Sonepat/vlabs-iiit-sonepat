import Image from "next/image";

import {
  Body,
  Button,
  Eyebrow,
  Heading,
  HeadingPair,
  SectionIntro,
  SectionShell,
  SectionStack,
} from "@/ui";

import { PARTICIPATING_INSTITUTIONS } from "./participating-institutions.data";

export function ParticipatingInstitutionsSections() {
  const { eyebrow, heading, lead, image, paragraphs, bullets, contact } =
    PARTICIPATING_INSTITUTIONS;

  return (
    <>
      <SectionShell scheme="light" rhythm="hero">
        <SectionStack>
          <SectionIntro>
            <Eyebrow>{eyebrow}</Eyebrow>
            <HeadingPair>
              <div className="md:max-w-[820px]">
                <Heading as="h1" size="lg" weight="light">
                  {heading}
                </Heading>
              </div>
              <div className="md:max-w-[560px]">
                <Body muted size="sm">
                  {lead}
                </Body>
              </div>
            </HeadingPair>
          </SectionIntro>

          <div className="relative w-full overflow-hidden rounded-[calc(var(--radius-base)*2)] border border-[var(--line)] bg-[#0a0a0a] aspect-[16/7]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 960px) 100vw, 1100px"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-[calc(var(--spacing-base)*5)] max-w-[680px]">
            {paragraphs.map((text) => (
              <p
                key={text.slice(0, 40)}
                className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-base leading-[1.75] m-0"
              >
                {text}
              </p>
            ))}
          </div>
        </SectionStack>
      </SectionShell>

      <SectionShell scheme="muted">
        <SectionStack>
          <SectionIntro>
            <Eyebrow>Ways to join.</Eyebrow>
            <HeadingPair>
              <div className="md:max-w-[720px]">
                <Heading as="h2" size="md" weight="light">
                  Modules, labs, and shared stewardship
                </Heading>
              </div>
            </HeadingPair>
          </SectionIntro>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(var(--spacing-base)*5)]">
            {bullets.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-[calc(var(--spacing-base)*3)]"
              >
                <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[var(--color-blue)] shrink-0" />
                  <h3 className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[15px] font-medium m-0">
                    {item.label}
                  </h3>
                </div>
                <Body muted size="sm">
                  {item.detail}
                </Body>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-white)] rounded-[calc(var(--radius-base)*2)] border border-[rgba(0,0,0,0.06)] p-[calc(var(--spacing-base)*6)] flex flex-col gap-[calc(var(--spacing-base)*4)] max-w-[720px]">
            <p className="text-[#a8a7a4] font-[family-name:var(--font-sans),sans-serif] text-[11px] font-medium tracking-[0.10em] m-0 uppercase">
              Apply to participate
            </p>
            <Body size="sm">
              Prefer a structured intake? Use the Google Form. Prefer email?
              Write to{" "}
              <a
                className="text-[var(--color-blue)] underline decoration-[var(--color-blue)]/30 underline-offset-[3px] hover:decoration-[var(--color-blue)]"
                href={contact.emailHref}
              >
                {contact.emailLabel}
              </a>
              .
            </Body>
            <div className="flex flex-wrap gap-[calc(var(--spacing-base)*3)]">
              <Button
                href={contact.formHref}
                label={contact.formLabel}
                variant="filled"
              />
              <Button
                href={contact.emailHref}
                label="Email the Technical Society"
                variant="outlined"
              />
            </div>
          </div>
        </SectionStack>
      </SectionShell>
    </>
  );
}
