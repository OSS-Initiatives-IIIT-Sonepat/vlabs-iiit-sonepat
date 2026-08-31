import { HalfWaveRectifierContent } from '@/labs/content/half-wave-rectifier';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Half Wave Rectifier — VLabs',
  description:
    'Study the half-wave rectifier circuit using a single 1N4148 diode, ' +
    'observe the pulsating DC output on the oscilloscope, and investigate the ' +
    'effect of a filter capacitor on ripple reduction.',
};

export default function HalfWaveRectifierPage() {
  return <LabPage content={HalfWaveRectifierContent} />;
}
