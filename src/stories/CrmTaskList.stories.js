import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TasksList from '../routes/Dashboards/Crm/TasksList';

export default {
  title: 'Crm Tasks List',
  component: TasksList,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TasksList />;
