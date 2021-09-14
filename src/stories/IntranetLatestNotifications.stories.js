import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import LatestNotifications from '../routes/Dashboards/Intranet/LatestNotifications';

export default {
  title: 'Intranet LatestNotifications',
  component: LatestNotifications,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <LatestNotifications />;
