import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import DailyFeed from '../routes/Dashboards/News/DailyFeed';

export default {
  title: 'News Daily Feed',
  component: DailyFeed,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <DailyFeed />;
