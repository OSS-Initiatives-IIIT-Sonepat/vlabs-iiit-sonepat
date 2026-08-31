import { KirchhoffLawsContent } from '@/labs/content/kirchhoff-laws';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: "Kirchhoff's Laws — VLabs",
  description: "Interactive virtual lab: Kirchhoff's Current and Voltage Laws.",
};

export default function Page() {
  return <LabPage content={KirchhoffLawsContent} />;
}
