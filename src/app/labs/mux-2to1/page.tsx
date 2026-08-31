import { Mux2to1Content } from '@/labs/content/mux-2to1';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: '2:1 Multiplexer — VLabs',
  description: 'Interactive virtual lab: 2:1 Multiplexer.',
};

export default function Page() {
  return <LabPage content={Mux2to1Content} />;
}
