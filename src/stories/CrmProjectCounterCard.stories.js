import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import ProjectCounterCard from '../routes/Dashboards/Crm/ProjectCounterCard';

export default {
  title: 'Crm Project Counter Card',
  component: ProjectCounterCard,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <ProjectCounterCard />;
