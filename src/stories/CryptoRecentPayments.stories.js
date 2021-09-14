import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RecentPayments from '../routes/Dashboards/Crypto/RecentPayments';

export default {
  title: 'Crypto Recent Payments',
  component: RecentPayments,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RecentPayments />;
