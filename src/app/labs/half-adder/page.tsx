import { HalfAdderLab } from '@/sections/half-adder-lab';

export const metadata = {
  title: 'Half Adder — Virtual ECE Lab',
  description:
    'Step-by-step interactive 3D assembly of a half adder circuit. ' +
    'Build it on a breadboard using a XOR gate, AND gate, LEDs and resistors.',
};

export default function HalfAdderPage() {
  return (
    <main>
      <HalfAdderLab />
    </main>
  );
}
