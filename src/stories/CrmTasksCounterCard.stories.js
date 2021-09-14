import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TasksCounterCard from '../routes/Dashboards/Crm/TasksCounterCard';

export default {
  title: 'Crm Tasks Counter Card',
  component: TasksCounterCard,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TasksCounterCard />;
