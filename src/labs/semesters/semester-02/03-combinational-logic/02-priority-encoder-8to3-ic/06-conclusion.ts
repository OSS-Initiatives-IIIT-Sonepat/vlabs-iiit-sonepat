import { type ExperimentDefinition } from "@/labs/experiments/types";

type Section = ExperimentDefinition["sections"][number];

export const conclusion: Section = {
  id: "conclusion",
  type: "conclusion",
  title: "Conclusion",
  paragraphs: [
    "The truth table of the 74HC148 priority encoder was verified. With one input active, the outputs gave the complement of that input's binary number. With several inputs active, only the highest-numbered input was encoded, which confirms the priority function, with I7 overriding all the others.",
    "GS' went LOW whenever a valid input was present and EO' went LOW only when the encoder was enabled with no input active, so the two status outputs distinguish 'I0 active' from 'nothing active'. Taking EI' HIGH disabled the encoder and forced every output HIGH.",
  ],
};
