import { FullAdderContent } from '@/labs/content/full-adder';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Full Adder — VLabs',
  description: 'Interactive virtual lab: Full Adder.',
};

export default function Page() {
  return <LabPage content={FullAdderContent} />;
}
