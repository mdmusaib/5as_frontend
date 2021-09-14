import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import TaskListExpandable from '../routes/Dashboards/Intranet/TaskListExpandable';

export default {
  title: 'Intranet Tasklist Expandable',
  component: TaskListExpandable,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <TaskListExpandable />;
