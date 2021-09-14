import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import OrderHistory from '../routes/Dashboards/Crypto/OrderHistory';

export default {
  title: 'Crypto Order History',
  component: OrderHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <OrderHistory />;
