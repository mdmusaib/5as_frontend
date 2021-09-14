import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PopularAuthors from '../routes/Dashboards/News/PopularAuthors';

export default {
  title: 'News Popular Authors',
  component: PopularAuthors,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PopularAuthors />;
