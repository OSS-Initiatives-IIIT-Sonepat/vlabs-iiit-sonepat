import { DemuxAddressDecoderContent } from '@/labs/content/demux-address-decoder';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'DEMUX Address Decoder — VLabs',
  description: 'Interactive virtual lab: DEMUX Address Decoder.',
};

export default function Page() {
  return <LabPage content={DemuxAddressDecoderContent} />;
}
