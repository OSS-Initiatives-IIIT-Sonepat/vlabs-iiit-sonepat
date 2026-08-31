import { RectifiersCapacitorFiltersContent } from '@/labs/content/rectifiers-capacitor-filters';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Rectifiers with Capacitor Filters — VLabs',
  description: 'Interactive virtual lab: Rectifiers with Capacitor Filters.',
};

export default function Page() {
  return <LabPage content={RectifiersCapacitorFiltersContent} />;
}
