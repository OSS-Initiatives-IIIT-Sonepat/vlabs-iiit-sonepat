import { OhmsLawContent } from '@/labs/content/ohms-law';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: "Verification of Ohm's Law — VLabs",
  description: "Interactive virtual lab: Verification of Ohm's Law.",
};

export default function Page() {
  return <LabPage content={OhmsLawContent} />;
}
