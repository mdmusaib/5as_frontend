import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import NewRequests from '../routes/Dashboards/Intranet/NewRequests';

export default {
  title: 'Intranet New Requests',
  component: NewRequests,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <NewRequests />;
