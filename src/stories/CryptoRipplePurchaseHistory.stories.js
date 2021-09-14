import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RipplePurchaseHistory from '../routes/Dashboards/Crypto/RipplePurchaseHistory';

export default {
  title: 'Crypto Ripple Purchase History',
  component: RipplePurchaseHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RipplePurchaseHistory />;
