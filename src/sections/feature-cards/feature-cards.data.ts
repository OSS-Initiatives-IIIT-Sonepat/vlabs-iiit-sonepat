import { type EceComponentKind } from '@/labs/components/EceViewer';

export type FeatureCardRecord = {
  body: string;
  heading: string;
  component: EceComponentKind;
  label: string;
};

export const FEATURE_CARDS: readonly FeatureCardRecord[] = [
  {
    heading: 'Capacitor',
    body: 'Capacitors store and release charge. The stripe marks the negative lead — always check polarity on electrolytics.',
    component: 'capacitor',
    label: 'Energy storage',
  },
  {
    heading: 'Potentiometer',
    body: 'A variable resistor with a dial. Rotate the knob to sweep the wiper between the two end terminals.',
    component: 'potentiometer',
    label: 'Controls',
  },
  {
    heading: 'Push Button',
    body: 'A momentary tactile switch. Current only flows while the cap is pressed — four corner pins straddle the centre gap.',
    component: 'push-button',
    label: 'Input',
  },
];
