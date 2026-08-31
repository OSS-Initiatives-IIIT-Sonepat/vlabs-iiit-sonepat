import { Decoder2to4Content } from '@/labs/content/decoder-2to4';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: '2:4 Binary Decoder — VLabs',
  description: 'Interactive virtual lab: 2:4 Binary Decoder.',
};

export default function Page() {
  return <LabPage content={Decoder2to4Content} />;
}
