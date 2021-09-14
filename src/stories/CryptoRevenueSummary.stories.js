import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RevenueSummary from '../routes/Dashboards/Crypto/RevenueSummary';

export default {
  title: 'Crypto Revenue Summary',
  component: RevenueSummary,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RevenueSummary />;
