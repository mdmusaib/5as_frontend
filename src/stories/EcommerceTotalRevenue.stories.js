import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TotalRevenue from '../routes/Dashboards/ECommerce/TotalRevenue';

export default {
  title: 'ECommerce TotalRevenue',
  component: TotalRevenue,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TotalRevenue />;
