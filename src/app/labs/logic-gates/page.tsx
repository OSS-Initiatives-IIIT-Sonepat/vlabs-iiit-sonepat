import { LogicGatesContent } from '@/labs/content/logic-gates';
import { LabPage } from '@/labs/LabPage';

export const metadata = {
  title: 'Basic Logic Gates — VLabs',
  description: 'Interactive virtual lab: Basic Logic Gates.',
};

export default function Page() {
  return <LabPage content={LogicGatesContent} />;
}
