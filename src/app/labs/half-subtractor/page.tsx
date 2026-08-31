import { HalfSubtractorContent } from '@/labs/content/half-subtractor';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Half Subtractor — VLabs',
  description: 'Interactive virtual lab: Half Subtractor.',
};

export default function Page() {
  return <LabPage content={HalfSubtractorContent} />;
}
