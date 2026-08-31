import { CeAmplifierContent } from '@/labs/content/ce-amplifier';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Common Emitter Amplifier — VLabs',
  description: 'Interactive virtual lab: Common Emitter Amplifier.',
};

export default function Page() {
  return <LabPage content={CeAmplifierContent} />;
}
