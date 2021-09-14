import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewsArticles from '../routes/Dashboards/News/NewsArticles';

export default {
  title: 'News News Articles',
  component: NewsArticles,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <NewsArticles />;
