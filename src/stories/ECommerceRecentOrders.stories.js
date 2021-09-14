import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RecentOrders from '../routes/Dashboards/ECommerce/RecentOrders';

export default {
  title: 'ECommerce RecentOrders',
  component: RecentOrders,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RecentOrders />;
