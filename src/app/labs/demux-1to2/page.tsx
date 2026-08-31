import { Demux1to2Content } from '@/labs/content/demux-1to2';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: '1:2 Demultiplexer — VLabs',
  description: 'Interactive virtual lab: 1:2 Demultiplexer.',
};

export default function Page() {
  return <LabPage content={Demux1to2Content} />;
}
