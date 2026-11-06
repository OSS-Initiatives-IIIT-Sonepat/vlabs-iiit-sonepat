export type ExploreExperiment = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  labRoute?: string;
  tags: readonly string[];
};

export type ExploreSubject = {
  id: string;
  title: string;
  description: string;
  circuitId: string;
  /** Default circuit is a breadboard scene the card can preview. */
  hasPreview: boolean;
  experiments: ExploreExperiment[];
};

export type ExploreSemester = {
  id: string;
  label: string;
  subjects: ExploreSubject[];
};
