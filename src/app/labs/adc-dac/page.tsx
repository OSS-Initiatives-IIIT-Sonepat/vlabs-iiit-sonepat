import { AdcDacContent } from '@/labs/content/adc-dac';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'ADC and DAC Interfacing — VLabs',
  description: 'Interactive virtual lab: ADC and DAC Interfacing.',
};

export default function Page() {
  return <LabPage content={AdcDacContent} />;
}
