import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import BitcoinPurchaseHistory from '../routes/Dashboards/Crypto/BitcoinPurchaseHistory';

export default {
  title: 'Crypto Bitcoin Purchase History',
  component: BitcoinPurchaseHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <BitcoinPurchaseHistory />;
