import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import RecentTickets from '../routes/Dashboards/Crm/RecentTickets';

export default {
  title: 'RecentTickets',
  component: RecentTickets,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <RecentTickets />;
