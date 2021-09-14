import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import YearlyProfitReport from '../routes/Dashboards/ECommerce/YearlyProfitReport';

export default {
  title: 'ECommerce YearlyProfitReport',
  component: YearlyProfitReport,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <YearlyProfitReport />;
