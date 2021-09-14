import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import StoryOfTheDay from '../routes/Dashboards/News/StoryOfTheDay';

export default {
  title: 'News Story of the day',
  component: StoryOfTheDay,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <StoryOfTheDay />;
