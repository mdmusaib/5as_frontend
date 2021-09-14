import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RecentActivities from '../routes/Dashboards/Intranet/RecentActivities';

export default {
  title: 'Intranet Recent Activities',
  component: RecentActivities,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <RecentActivities />;
