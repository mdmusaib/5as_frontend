import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import LitecoinPurchaseHistory from '../routes/Dashboards/Crypto/LitecoinPurchaseHistory';

export default {
  title: 'Crypto Litecoin Purchase History',
  component: LitecoinPurchaseHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <LitecoinPurchaseHistory />;
