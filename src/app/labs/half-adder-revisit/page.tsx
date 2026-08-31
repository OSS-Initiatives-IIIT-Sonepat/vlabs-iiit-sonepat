import { HalfAdderRevisitContent } from '@/labs/content/half-adder-revisit';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Half Adder — Propagation Delay — VLabs',
  description: 'Interactive virtual lab: Half Adder — Propagation Delay.',
};

export default function Page() {
  return <LabPage content={HalfAdderRevisitContent} />;
}
