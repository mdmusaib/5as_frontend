import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import SalesStatistic from '../routes/Dashboards/ECommerce/SalesStatistic';

export default {
  title: 'ECommerce SalesStatistic',
  component: SalesStatistic,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <SalesStatistic />;
