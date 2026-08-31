import { FullWaveRectifierContent } from '@/labs/content/full-wave-rectifier';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Full-Wave Rectifier — VLabs',
  description: 'Interactive virtual lab: Full-Wave Rectifier.',
};

export default function Page() {
  return <LabPage content={FullWaveRectifierContent} />;
}
