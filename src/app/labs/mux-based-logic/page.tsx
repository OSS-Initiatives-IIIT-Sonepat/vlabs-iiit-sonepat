import { MuxBasedLogicContent } from '@/labs/content/mux-based-logic';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'MUX-based Logic — VLabs',
  description: 'Interactive virtual lab: MUX-based Logic.',
};

export default function Page() {
  return <LabPage content={MuxBasedLogicContent} />;
}
