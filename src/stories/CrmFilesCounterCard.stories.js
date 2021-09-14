import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import FilesCounterCard from '../routes/Dashboards/Crm/FilesCounterCard';

export default {
  title: 'Crm Files Counter Card',
  component: FilesCounterCard,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <FilesCounterCard />;
