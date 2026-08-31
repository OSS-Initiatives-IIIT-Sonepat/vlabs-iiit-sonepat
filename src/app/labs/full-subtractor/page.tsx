import { FullSubtractorContent } from '@/labs/content/full-subtractor';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Full Subtractor — VLabs',
  description: 'Interactive virtual lab: Full Subtractor.',
};

export default function Page() {
  return <LabPage content={FullSubtractorContent} />;
}
