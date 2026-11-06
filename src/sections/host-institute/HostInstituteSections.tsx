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

import { HOST_INSTITUTE } from "./host-institute.data";

export function HostInstituteSections() {
  const { eyebrow, heading, lead, image, paragraphs, pillars, links } =
    HOST_INSTITUTE;

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
            <Eyebrow>Why the host matters.</Eyebrow>
            <HeadingPair>
              <div className="md:max-w-[720px]">
                <Heading as="h2" size="md" weight="light">
                  {"Stewardship from IIIT Sonepat's Technical Society"}
                </Heading>
              </div>
            </HeadingPair>
          </SectionIntro>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(var(--spacing-base)*5)]">
            {pillars.map((pillar) => (
              <div
                key={pillar.label}
                className="flex flex-col gap-[calc(var(--spacing-base)*3)]"
              >
                <div className="flex items-center gap-[calc(var(--spacing-base)*2)]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[var(--color-blue)] shrink-0" />
                  <h3 className="text-[var(--ink)] font-[family-name:var(--font-sans),sans-serif] text-[15px] font-medium m-0">
                    {pillar.label}
                  </h3>
                </div>
                <Body muted size="sm">
                  {pillar.detail}
                </Body>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-[calc(var(--spacing-base)*3)]">
            <Button
              href={links.participating}
              label="Participating institutions"
              variant="filled"
            />
            <Button
              href={links.community}
              label="Community"
              variant="outlined"
            />
            <Button href={links.github} label="GitHub" variant="outlined" />
          </div>
        </SectionStack>
      </SectionShell>
    </>
  );
}
