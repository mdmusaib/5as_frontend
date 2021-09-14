import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import YearlySalesReport from '../routes/Dashboards/ECommerce/YearlySalesReport';

export default {
  title: 'ECommerce YearlySalesReport',
  component: YearlySalesReport,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <YearlySalesReport />;
