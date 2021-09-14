import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RevenueHistory from '../routes/Dashboards/Crm/RevenueHistory';

export default {
  title: 'Crm Revenue History',
  component: RevenueHistory,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RevenueHistory />;
