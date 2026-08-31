import { Encoder4to2Content } from '@/labs/content/encoder-4to2';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: '4:2 Priority Encoder — VLabs',
  description: 'Interactive virtual lab: 4:2 Priority Encoder.',
};

export default function Page() {
  return <LabPage content={Encoder4to2Content} />;
}
