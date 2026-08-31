import { ZenerVoltageRegulatorContent } from '@/labs/content/zener-voltage-regulator';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Zener Voltage Regulator — VLabs',
  description: 'Interactive virtual lab: Zener Voltage Regulator.',
};

export default function Page() {
  return <LabPage content={ZenerVoltageRegulatorContent} />;
}
