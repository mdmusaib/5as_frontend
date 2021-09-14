import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewSubscribers from '../routes/Dashboards/News/NewSubscibers';

export default {
  title: 'News New Subscribers',
  component: NewSubscribers,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <NewSubscribers />;
