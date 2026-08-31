import { NortonTheoremContent } from '@/labs/content/norton-theorem';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: "Norton's Theorem — VLabs",
  description: "Interactive virtual lab: Norton's Theorem.",
};

export default function Page() {
  return <LabPage content={NortonTheoremContent} />;
}
