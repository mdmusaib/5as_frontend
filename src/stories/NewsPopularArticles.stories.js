import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PopularArticles from '../routes/Dashboards/News/PopularArticles';

export default {
  title: 'News Popular Articles',
  component: PopularArticles,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PopularArticles />;
