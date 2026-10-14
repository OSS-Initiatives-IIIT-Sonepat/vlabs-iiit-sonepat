import { type Metadata } from "next";

import { Body, Button, Heading } from "@/ui";

export const metadata: Metadata = {
  title: "Subjects — VLabs",
};

export default function SubjectsPage() {
  return (
    <div
      data-scheme="light"
      className="flex items-center bg-[var(--surface)] flex-col justify-center min-h-dvh py-[calc(var(--spacing-base)*8)] px-[calc(var(--spacing-base)*4)]"
    >
      <div className="max-w-[720px] text-center w-full [&>*+*]:mt-[calc(var(--spacing-base)*4)]">
        <span className="bg-[var(--color-blue-10)] border border-[var(--color-blue-20)] rounded-[calc(var(--radius-base)*8)] text-[var(--color-blue)] inline-block font-mono font-medium tracking-[0.06em] py-[calc(var(--spacing-base)*1)] px-[calc(var(--spacing-base)*3)] uppercase text-[0.75rem] leading-[1.55]">
          Coming soon
        </span>
        <Heading as="h1" size="md" weight="light" family="sans">
          Your subjects are being prepared
        </Heading>
        <Body muted size="sm">
          We&apos;re building personalised virtual labs for your area of
          interest. Check back soon — or explore our existing labs in the
          meantime.
        </Body>
        <div>
          <Button href="/labs/half-adder" label="Explore Half Adder Lab" />
        </div>
      </div>
    </div>
  );
}
