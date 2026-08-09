export type HelpedVisualId = 'target' | 'spaceship' | 'money';

export type HelpedCardRecord = {
  body: string;
  heading: string;
  href: string;
  illustration: HelpedVisualId;
  wordmark: string;
};

export const HELPED_CARDS: readonly HelpedCardRecord[] = [
  {
    wordmark: 'IC Meter',
    heading: 'Measure anything in your circuit',
    body: 'A digital multimeter reads voltage, current, and resistance. The rotary dial selects the measurement mode — always check polarity before probing.',
    illustration: 'target',
    href: '/labs/half-adder',
  },
  {
    wordmark: 'DC Power Supply',
    heading: 'Dial in the exact voltage',
    body: 'A bench-top DC supply gives you clean, adjustable voltage and current. Set limits before connecting — it protects your components from accidental over-voltage.',
    illustration: 'spaceship',
    href: '/labs/half-adder',
  },
  {
    wordmark: 'MCU Trainer',
    heading: 'The brain of every embedded system',
    body: 'A microcontroller trainer kit puts a programmable chip, GPIO headers, LEDs, and a USB port on one PCB — everything you need to start writing firmware.',
    illustration: 'money',
    href: '/labs/half-adder',
  },
];
