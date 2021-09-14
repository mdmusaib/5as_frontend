import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CalendarEvents from '../routes/Dashboards/Intranet/CalendarEvents';

export default {
  title: 'Intranet Calendar Events',
  component: CalendarEvents,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <CalendarEvents />;
