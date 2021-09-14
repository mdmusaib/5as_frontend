import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import DealsAnalytics from '../routes/Dashboards/Listing/DealsAnalytics';

export default {
  title: 'Listing Deals Analytics',
  component: DealsAnalytics,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <DealsAnalytics />;
