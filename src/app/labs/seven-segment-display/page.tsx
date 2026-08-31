import { SevenSegmentDisplayContent } from '@/labs/content/seven-segment-display';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Seven Segment Display — VLabs',
  description: 'Interactive virtual lab: Seven Segment Display.',
};

export default function Page() {
  return <LabPage content={SevenSegmentDisplayContent} />;
}
