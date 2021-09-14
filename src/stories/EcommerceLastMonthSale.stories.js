import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import LastMonthSale from '../routes/Dashboards/ECommerce/LastMonthSale';

export default {
  title: 'ECommerce LastMonthSale',
  component: LastMonthSale,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <LastMonthSale />;
