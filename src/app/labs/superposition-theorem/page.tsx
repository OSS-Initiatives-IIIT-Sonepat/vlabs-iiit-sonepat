import { SuperpositionTheoremContent } from '@/labs/content/superposition-theorem';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Superposition Theorem — VLabs',
  description: 'Interactive virtual lab: Superposition Theorem.',
};

export default function Page() {
  return <LabPage content={SuperpositionTheoremContent} />;
}
