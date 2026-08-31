import { StudyBasicComponentsContent } from '@/labs/content/study-basic-components';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Basic Electronic Components — VLabs',
  description: 'Interactive virtual lab: Basic Electronic Components.',
};

export default function Page() {
  return <LabPage content={StudyBasicComponentsContent} />;
}
