"use client";

import dynamic from "next/dynamic";

import { ALL_CIRCUITS } from "@/labs/circuits/index";
import { NET_OVERVIEW } from "@/labs/networks/bench";
import { resolveFinalCircuitStepIndex } from "@/labs/resolve-circuit-step-index";
import { SEMESTER_CONTENTS } from "@/labs/semesters";

const LabSceneCanvas = dynamic(
  () => import("@/labs/LabScene").then((m) => m.LabSceneCanvas),
  { ssr: false },
);
const NetLabScene = dynamic(
  () => import("@/labs/NetLabScene").then((m) => m.NetLabScene),
  { ssr: false },
);
const TrainerScene = dynamic(
  () => import("@/labs/Mpu8085TrainerScene").then((m) => m.Mpu8085TrainerScene),
  { ssr: false },
);

type Props = { circuitId: string };

export function CircuitPreview({ circuitId }: Props) {
  const circuit = ALL_CIRCUITS.find((item) => item.id === circuitId);
  if (!circuit) {
    // A network lab has no breadboard. Its room is the preview.
    const content = SEMESTER_CONTENTS[circuitId];
    if (content?.scene === "net" && content.bench) {
      return (
        <div className="h-full w-full">
          <NetLabScene bench={content.bench} frame={NET_OVERVIEW} preview />
        </div>
      );
    }
    // An 8085 program lab shows the trainer kit with the program run.
    if (content?.scene === "kit" && content.trainer) {
      return (
        <div className="h-full w-full">
          <TrainerScene
            program={content.trainer.program}
            frame={content.trainer.final}
            preview
          />
        </div>
      );
    }
    return <div className="h-full w-full bg-[#f7f6f3]" aria-hidden />;
  }

  const finalStepIndex = resolveFinalCircuitStepIndex(circuit);

  return (
    <div className="h-full w-full">
      <LabSceneCanvas
        activeStepIndex={finalStepIndex}
        circuit={circuit}
        previewMode
        showControlsHint={false}
      />
    </div>
  );
}
