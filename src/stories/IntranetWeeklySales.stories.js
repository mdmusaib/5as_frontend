import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import WeeklySales from '../routes/Dashboards/Intranet/WeeklySales';

export default {
  title: 'Intranet Weekly Sales',
  component: WeeklySales,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <WeeklySales />;
