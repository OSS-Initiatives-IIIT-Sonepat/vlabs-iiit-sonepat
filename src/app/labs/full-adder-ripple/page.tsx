import { FullAdderRippleContent } from '@/labs/content/full-adder-ripple';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: '4-bit Ripple Carry Adder — VLabs',
  description: 'Interactive virtual lab: 4-bit Ripple Carry Adder.',
};

export default function Page() {
  return <LabPage content={FullAdderRippleContent} />;
}
