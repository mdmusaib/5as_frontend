import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import PopularAgents from '../routes/Dashboards/Listing/PopularAgents';

export default {
  title: 'Listing Popular Agents',
  component: PopularAgents,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <PopularAgents />;
