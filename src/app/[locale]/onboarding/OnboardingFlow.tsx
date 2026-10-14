"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { VLabsLogo } from "@/icons";
import { Body, Button, Heading, StepIndicator } from "@/ui";

// ─── Storage key ────────────────────────────────────────────────────────────
const ONBOARDING_KEY = "vlabs_onboarding_done";

// ─── Data ────────────────────────────────────────────────────────────────────

type Role = "student" | "professor" | "explorer" | "other";

const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: "student",
    label: "Student",
    description: "Learning through courses, labs, and research",
  },
  {
    value: "professor",
    label: "Professor / Educator",
    description: "Teaching courses and designing curricula",
  },
  {
    value: "explorer",
    label: "Curious Explorer",
    description: "Self-directed learning out of pure curiosity",
  },
  {
    value: "other",
    label: "Other",
    description: "Something else entirely",
  },
];

const DEPARTMENTS: { value: string; label: string }[] = [
  { value: "cs", label: "Computer Science" },
  { value: "ee", label: "Electrical Engineering" },
  { value: "me", label: "Mechanical Engineering" },
  { value: "ce", label: "Civil Engineering" },
  { value: "che", label: "Chemical Engineering" },
  { value: "bio", label: "Biology / Life Sciences" },
  { value: "chem", label: "Chemistry" },
  { value: "phys", label: "Physics" },
  { value: "math", label: "Mathematics" },
  { value: "stats", label: "Statistics / Data Science" },
  { value: "ai", label: "Artificial Intelligence / ML" },
  { value: "cyber", label: "Cybersecurity" },
  { value: "env", label: "Environmental Science" },
  { value: "med", label: "Medicine / Health Sciences" },
  { value: "arch", label: "Architecture" },
  { value: "eco", label: "Economics" },
  { value: "psy", label: "Psychology" },
  { value: "edu", label: "Education" },
];

const INTERESTS: { value: string; label: string }[] = [
  { value: "circuits", label: "Circuits & Electronics" },
  { value: "signals", label: "Signals & Systems" },
  { value: "embedded", label: "Embedded Systems" },
  { value: "robotics", label: "Robotics & Automation" },
  { value: "ml", label: "Machine Learning" },
  { value: "cv", label: "Computer Vision" },
  { value: "nlp", label: "NLP / LLMs" },
  { value: "algo", label: "Algorithms & Data Structures" },
  { value: "os", label: "Operating Systems" },
  { value: "networks", label: "Computer Networks" },
  { value: "db", label: "Databases" },
  { value: "webdev", label: "Web Development" },
  { value: "thermodynamics", label: "Thermodynamics" },
  { value: "fluid", label: "Fluid Mechanics" },
  { value: "mechanics", label: "Mechanics of Materials" },
  { value: "quantum", label: "Quantum Mechanics" },
  { value: "optics", label: "Optics & Photonics" },
  { value: "chem_react", label: "Chemical Reactions" },
  { value: "biotech", label: "Biotechnology" },
  { value: "genetics", label: "Genetics & Genomics" },
  { value: "materials", label: "Materials Science" },
  { value: "control", label: "Control Systems" },
  { value: "power", label: "Power Systems" },
  { value: "vlsi", label: "VLSI Design" },
  { value: "security", label: "Security & Cryptography" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back" | "none">(
    "none",
  );
  const [role, setRole] = useState<Role | null>(null);
  const [otherRole, setOtherRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [animKey, setAnimKey] = useState(0);

  // Redirect immediately if already completed
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(ONBOARDING_KEY)) {
        router.replace("/explore");
      }
    }
  }, [router]);

  const goForward = () => {
    setAnimKey((k) => k + 1);
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setAnimKey((k) => k + 1);
    setDirection("back");
    setStep((s) => s - 1);
  };

  const finish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(ONBOARDING_KEY, "1");
    }
    router.push("/explore");
  };

  // Step 0 — Role: one-click advance except "other"
  const handleRoleSelect = (value: Role) => {
    setRole(value);
    if (value !== "other") {
      setTimeout(() => {
        setAnimKey((k) => k + 1);
        setDirection("forward");
        setStep(1);
      }, 120);
    }
  };

  // Step 1 — adaptive copy per role
  const isExplorer = role === "explorer";

  const step1Title = isExplorer
    ? "What sparks your curiosity?"
    : role === "student"
      ? "Where do you study?"
      : role === "professor"
        ? "Where do you teach?"
        : "Where do you work?";

  const step1Subtitle = isExplorer
    ? "Tell us a bit about your background (optional)"
    : "Help us tailor your experience";

  // Step 2 — adaptive copy per role
  const step2Title =
    role === "professor"
      ? "What do you primarily teach?"
      : "What are your areas of interest?";

  const step2Subtitle =
    role === "professor"
      ? "Select all subjects you cover"
      : "Pick as many as you like";

  const toggleInterest = (val: string) => {
    setInterests((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const step1Valid = isExplorer ? true : institution.trim().length > 0;

  const slideAnimClass = (dir: "forward" | "back" | "none") =>
    dir === "none"
      ? ""
      : dir === "forward"
        ? "animate-[slideIn_0.28s_cubic-bezier(0.22,1,0.36,1)_both]"
        : "animate-[slideInBack_0.28s_cubic-bezier(0.22,1,0.36,1)_both]";

  return (
    <div
      data-scheme="light"
      className="flex items-center bg-[var(--surface)] flex-col justify-center min-h-dvh py-[calc(var(--spacing-base)*10)] px-[calc(var(--spacing-base)*6)]"
    >
      <div className="max-w-[400px] w-full">
        {/* Logo */}
        <div className="flex items-center gap-[calc(var(--spacing-base)*2)] mb-[calc(var(--spacing-base)*10)]">
          <VLabsLogo sizePx={40} />
          <span className="text-[var(--ink)] font-sans font-medium text-[1rem] leading-[1.55]">
            VLabs
          </span>
        </div>

        {/* Progress dots */}
        <div className="mb-[calc(var(--spacing-base)*6)]">
          <StepIndicator activeStepIndex={step} stepCount={3} />
        </div>

        {/* ── Step 0: Role ─────────────────────────────────────────────── */}
        {step === 0 && (
          <div className={slideAnimClass(direction)} key={`step-0-${animKey}`}>
            <div className="mb-[calc(var(--spacing-base)*6)] [&>*+*]:mt-[calc(var(--spacing-base)*2)]">
              <Heading as="h1" size="sm" weight="light" family="sans">
                Tell us about yourself
              </Heading>
              <Body muted size="sm">
                Help us personalise your VLabs experience.
              </Body>
            </div>

            <div className="flex flex-col gap-[calc(var(--spacing-base)*2)]">
              {ROLES.map((r) => (
                <button
                  data-selected={role === r.value ? "" : undefined}
                  key={r.value}
                  onClick={() => handleRoleSelect(r.value)}
                  type="button"
                  className="flex items-center bg-transparent border border-[var(--line-strong)] rounded-[calc(var(--radius-base)*2)] cursor-pointer text-left w-full transition-[border-color,background] duration-200 ease-linear data-[selected]:bg-[var(--color-blue-5)] data-[selected]:border-[var(--color-blue)] focus-visible:outline-2 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-2 hover:not-data-[selected]:bg-[var(--color-black-5)]"
                  style={{
                    padding:
                      "calc(var(--spacing-base) * 3) calc(var(--spacing-base) * 4)",
                  }}
                >
                  <span className="flex flex-col gap-[calc(var(--spacing-base)*0.5)] min-w-0">
                    <span className="text-[var(--ink)] font-sans font-medium text-[1rem] leading-[1.55]">
                      {r.label}
                    </span>
                    <span className="text-[var(--ink-muted)] font-sans text-[0.75rem] leading-[1.55]">
                      {r.description}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {/* "Other" free-text */}
            {role === "other" && (
              <div
                className="flex flex-col gap-[calc(var(--spacing-base)*3)]"
                style={{ marginTop: "calc(var(--spacing-base) * 4)" }}
              >
                <div>
                  <label
                    htmlFor="other-role"
                    className="text-[var(--ink-muted)] block font-sans font-medium tracking-[0.04em] mb-[calc(var(--spacing-base)*1.5)] uppercase text-[0.75rem] leading-[1.55]"
                  >
                    Tell us more
                  </label>
                  <input
                    autoFocus
                    id="other-role"
                    onChange={(e) => setOtherRole(e.target.value)}
                    placeholder="Your role..."
                    value={otherRole}
                    className="bg-transparent border border-[var(--line-strong)] rounded-[calc(var(--radius-base)*2)] box-border text-[var(--ink)] font-sans h-11 w-full placeholder:text-[var(--ink-subtle)] focus-visible:border-[var(--color-blue)] focus-visible:outline-none text-[1rem] leading-[1.55]"
                    style={{
                      padding:
                        "calc(var(--spacing-base) * 1) calc(var(--spacing-base) * 3)",
                    }}
                  />
                </div>
                <div className="mt-[calc(var(--spacing-base)*8)]">
                  <Button
                    disabled={otherRole.trim().length === 0}
                    label="Continue"
                    onClick={goForward}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Step 1: Institution / Background ─────────────────────────── */}
        {step === 1 && (
          <div className={slideAnimClass(direction)} key={`step-1-${animKey}`}>
            <div className="mb-[calc(var(--spacing-base)*6)] [&>*+*]:mt-[calc(var(--spacing-base)*2)]">
              <Heading as="h2" size="sm" weight="light" family="sans">
                {step1Title}
              </Heading>
              <Body muted size="sm">
                {step1Subtitle}
              </Body>
            </div>

            <div className="flex flex-col gap-[calc(var(--spacing-base)*3)]">
              {!isExplorer && (
                <div>
                  <label
                    htmlFor="institution"
                    className="text-[var(--ink-muted)] block font-sans font-medium tracking-[0.04em] mb-[calc(var(--spacing-base)*1.5)] uppercase text-[0.75rem] leading-[1.55]"
                  >
                    {role === "student"
                      ? "Institution name"
                      : role === "professor"
                        ? "Institution / University"
                        : "Organisation / Company"}
                  </label>
                  <input
                    autoFocus
                    id="institution"
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={
                      role === "student"
                        ? "e.g. MIT, IIT Delhi…"
                        : role === "professor"
                          ? "e.g. Stanford University…"
                          : "e.g. Google, NASA…"
                    }
                    value={institution}
                    className="bg-transparent border border-[var(--line-strong)] rounded-[calc(var(--radius-base)*2)] box-border text-[var(--ink)] font-sans h-11 w-full placeholder:text-[var(--ink-subtle)] focus-visible:border-[var(--color-blue)] focus-visible:outline-none text-[1rem] leading-[1.55]"
                    style={{
                      padding:
                        "calc(var(--spacing-base) * 1) calc(var(--spacing-base) * 3)",
                    }}
                  />
                </div>
              )}

              <div>
                <div className="text-[var(--ink-muted)] block font-sans font-medium tracking-[0.04em] mb-[calc(var(--spacing-base)*1.5)] uppercase text-[0.75rem] leading-[1.55]">
                  {isExplorer
                    ? "Your background (optional)"
                    : "Department / Field"}
                </div>
                <div className="flex flex-col gap-[calc(var(--spacing-base)*1.5)] max-h-[220px] overflow-y-auto pr-[calc(var(--spacing-base)*1)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--line)] [&::-webkit-scrollbar-thumb]:rounded-sm">
                  {DEPARTMENTS.map((d) => (
                    <button
                      data-selected={department === d.value ? "" : undefined}
                      key={d.value}
                      onClick={() => setDepartment(d.value)}
                      type="button"
                      className="flex items-center bg-transparent border border-[var(--line-strong)] rounded-[calc(var(--radius-base)*2)] cursor-pointer justify-between text-left w-full transition-[border-color,background] duration-200 ease-linear data-[selected]:bg-[var(--color-blue-5)] data-[selected]:border-[var(--color-blue)] hover:not-data-[selected]:bg-[var(--color-black-5)] focus-visible:outline-2 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-2"
                      style={{
                        padding:
                          "calc(var(--spacing-base) * 2) calc(var(--spacing-base) * 3)",
                      }}
                    >
                      <span className="text-[var(--ink)] font-sans text-[1rem] leading-[1.55]">
                        {d.label}
                      </span>
                      {department === d.value && (
                        <span
                          className="bg-[var(--color-blue)] rounded-full shrink-0 h-[7px] w-[7px]"
                          aria-hidden
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-[calc(var(--spacing-base)*8)]">
              <Button
                disabled={!step1Valid}
                label="Continue"
                onClick={goForward}
              />
              <button
                onClick={goBack}
                type="button"
                className="bg-transparent border-none text-[var(--ink-muted)] cursor-pointer block font-sans text-[13px] mt-[calc(var(--spacing-base)*3)] text-center underline transition-colors duration-200 ease-linear w-full hover:text-[var(--ink)]"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Interests ────────────────────────────────────────── */}
        {step === 2 && (
          <div className={slideAnimClass(direction)} key={`step-2-${animKey}`}>
            <div className="mb-[calc(var(--spacing-base)*6)] [&>*+*]:mt-[calc(var(--spacing-base)*2)]">
              <Heading as="h2" size="sm" weight="light" family="sans">
                {step2Title}
              </Heading>
              <Body muted size="sm">
                {step2Subtitle}
              </Body>
            </div>

            <div className="flex flex-wrap gap-[calc(var(--spacing-base)*2)] max-h-[240px] overflow-y-auto pr-[calc(var(--spacing-base)*1)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--line)] [&::-webkit-scrollbar-thumb]:rounded-sm">
              {INTERESTS.map((interest) => (
                <button
                  data-selected={
                    interests.includes(interest.value) ? "" : undefined
                  }
                  key={interest.value}
                  onClick={() => toggleInterest(interest.value)}
                  type="button"
                  className="bg-transparent border border-[var(--line-strong)] rounded-[calc(var(--radius-base)*8)] text-[var(--ink)] cursor-pointer font-sans text-[13px] font-normal leading-[1.2] transition-[border-color,background,color] duration-200 ease-linear data-[selected]:bg-[var(--color-black)] data-[selected]:border-[var(--color-black)] data-[selected]:text-[var(--color-white)] hover:not-data-[selected]:border-[var(--color-black)] focus-visible:outline-2 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-2"
                  style={{
                    padding:
                      "calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 3)",
                  }}
                >
                  {interest.label}
                </button>
              ))}
            </div>

            <div className="mt-[calc(var(--spacing-base)*8)]">
              <Button label="Get started" onClick={finish} />
              <button
                onClick={goBack}
                type="button"
                className="bg-transparent border-none text-[var(--ink-muted)] cursor-pointer block font-sans text-[13px] mt-[calc(var(--spacing-base)*3)] text-center underline transition-colors duration-200 ease-linear w-full hover:text-[var(--ink)]"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
