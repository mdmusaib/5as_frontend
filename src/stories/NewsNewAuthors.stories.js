import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewAuthors from '../routes/Dashboards/News/NewAuthors';

export default {
  title: 'News New Authors',
  component: NewAuthors,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <NewAuthors />;
