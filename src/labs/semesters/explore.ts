import {
  type ExploreExperiment,
  type ExploreSemester,
  type ExploreSubject,
} from "@/sections/explore/explore.types";

import { SEMESTER_SUBJECTS } from "./catalog";

const BREADBOARD_IDS = new Set(
  SEMESTER_SUBJECTS.flatMap((subject) =>
    subject.experiments
      .filter(
        (item) => (item.experiment.labType ?? "breadboard") === "breadboard",
      )
      .map((item) => item.experiment.id),
  ),
);

function toExploreExperiment(
  entry: (typeof SEMESTER_SUBJECTS)[number]["experiments"][number],
  defaultCircuitId: string,
): ExploreExperiment {
  const { experiment, tags, content } = entry;
  const labType = experiment.labType ?? "breadboard";
  // A network lab has a room of its own to preview and to index.
  const ownScene = labType === "breadboard" || content.scene === "net";
  return {
    id: experiment.id,
    title: experiment.title,
    description: experiment.description,
    circuitId: ownScene ? experiment.id : defaultCircuitId,
    labRoute: `/labs/${experiment.id}`,
    tags,
  };
}

function subjectToExplore(
  subject: (typeof SEMESTER_SUBJECTS)[number],
): ExploreSubject {
  return {
    id: subject.subjectId,
    title: subject.subjectLabel,
    description: subject.subjectDescription,
    circuitId: subject.defaultCircuitId,
    hasPreview: BREADBOARD_IDS.has(subject.defaultCircuitId),
    experiments: subject.experiments.map((entry) =>
      toExploreExperiment(entry, subject.defaultCircuitId),
    ),
  };
}

export function getSemesterExploreSubjects(): ExploreSubject[] {
  return SEMESTER_SUBJECTS.map(subjectToExplore);
}

export function getSemesterExploreSubjectsBySemester(
  semesterId: string,
): ExploreSubject[] {
  return SEMESTER_SUBJECTS.filter(
    (subject) => subject.semesterId === semesterId,
  ).map(subjectToExplore);
}

export function getSemesterExploreSemesters(): ExploreSemester[] {
  const bySemester = new Map<string, ExploreSemester>();

  for (const subject of SEMESTER_SUBJECTS) {
    const existing = bySemester.get(subject.semesterId) ?? {
      id: subject.semesterId,
      label: subject.semesterLabel,
      subjects: [],
    };
    existing.subjects.push(subjectToExplore(subject));
    bySemester.set(subject.semesterId, existing);
  }

  return [...bySemester.values()];
}

/** All explore subjects now come from the semester tree. */
export const LEGACY_EXPLORE_SUBJECT_IDS = new Set<string>();
