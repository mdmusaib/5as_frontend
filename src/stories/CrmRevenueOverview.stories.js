import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RevenueOverview from '../routes/Dashboards/Crm/RevenueOverview';

export default {
  title: 'Crm Revenue Overview',
  component: RevenueOverview,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RevenueOverview />;
