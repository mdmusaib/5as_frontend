import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import Comments from '../routes/Dashboards/News/Comments';

export default {
  title: 'News Comments',
  component: Comments,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <Comments />;
