import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import EtheriumPurchaseHistory from '../routes/Dashboards/Crypto/EtheriumPurchaseHistory';

export default {
  title: 'Crypto Etherium Purchase History',
  component: EtheriumPurchaseHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <EtheriumPurchaseHistory />;
