import { type Metadata } from 'next';

import { OnboardingFlow } from './OnboardingFlow';

export const metadata: Metadata = {
  title: 'Get started — VedaAI',
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
