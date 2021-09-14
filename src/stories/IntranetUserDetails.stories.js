import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import UserDetail from '../routes/Dashboards/Intranet/UserDetail';

export default {
  title: 'Intranet User Details',
  component: UserDetail,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <UserDetail />;
