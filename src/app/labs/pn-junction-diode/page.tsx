import { PnJunctionDiodeContent } from '@/labs/content/pn-junction-diode';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'PN Junction Diode — VLabs',
  description: 'Interactive virtual lab: PN Junction Diode.',
};

export default function Page() {
  return <LabPage content={PnJunctionDiodeContent} />;
}
