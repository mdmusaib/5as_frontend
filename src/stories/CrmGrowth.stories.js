import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import CrmGrowth from '../routes/Dashboards/Crm/Growth';
export default {
  title: 'Crm Growth',
  component: CrmGrowth,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <CrmGrowth />;
