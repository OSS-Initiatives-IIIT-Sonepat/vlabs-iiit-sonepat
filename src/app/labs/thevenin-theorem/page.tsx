import { TheveninTheoremContent } from '@/labs/content/thevenin-theorem';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: "Thevenin's Theorem — VLabs",
  description: "Interactive virtual lab: Thevenin's Theorem.",
};

export default function Page() {
  return <LabPage content={TheveninTheoremContent} />;
}
