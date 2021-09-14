import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import AvgDailyTraffic from '../routes/Dashboards/News/AvgDailyTraffic';

export default {
  title: 'News Avg Daily Traffic',
  component: AvgDailyTraffic,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <AvgDailyTraffic />;
