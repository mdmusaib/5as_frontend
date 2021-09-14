import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import VisitsStatistics from '../routes/Dashboards/Listing/VisitsStatistics';

export default {
  title: 'Listing Visits Statistics',
  component: VisitsStatistics,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <VisitsStatistics />;
