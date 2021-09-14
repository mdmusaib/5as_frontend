import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TeamsCounterCard from '../routes/Dashboards/Crm/TeamsCounterCard';

export default {
  title: 'Crm Teams Counter Card',
  component: TeamsCounterCard,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TeamsCounterCard />;
