import { GpioInterfacingContent } from '@/labs/content/gpio-interfacing';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'GPIO Interfacing — VLabs',
  description: 'Interactive virtual lab: GPIO Interfacing.',
};

export default function Page() {
  return <LabPage content={GpioInterfacingContent} />;
}
