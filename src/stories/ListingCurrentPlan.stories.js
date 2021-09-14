import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CurrentPlan from '../routes/Dashboards/Listing/CurrentPlan';

export default {
  title: 'Listing Current Plan',
  component: CurrentPlan,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <CurrentPlan />;
