import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TicketsStatus from '../routes/Dashboards/Crm/TicketsStatus';

export default {
  title: 'TicketsStatus',
  component: TicketsStatus,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TicketsStatus />;
