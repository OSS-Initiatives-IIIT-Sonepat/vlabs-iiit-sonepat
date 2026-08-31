import { HalfAdderContent } from '@/labs/content/half-adder';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Half Adder — VLabs',
  description:
    'Step-by-step interactive 3D assembly of a half adder circuit. ' +
    'Build it on a breadboard using a XOR gate, AND gate, LEDs and resistors.',
};

export default function HalfAdderPage() {
  return <LabPage content={HalfAdderContent} />;
}
