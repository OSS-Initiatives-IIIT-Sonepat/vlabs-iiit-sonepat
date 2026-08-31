import { ZenerDiodeContent } from '@/labs/content/zener-diode';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Zener Diode Characteristics — VLabs',
  description: 'Interactive virtual lab: Zener Diode Characteristics.',
};

export default function Page() {
  return <LabPage content={ZenerDiodeContent} />;
}
