import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import UserPhotos from '../routes/Dashboards/Intranet/UserPhotos';

export default {
  title: 'Intranet User Photos',
  component: UserPhotos,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <UserPhotos />;
