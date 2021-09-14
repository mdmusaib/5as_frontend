import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import WelcomeSummary from '../routes/Dashboards/Crm/WelcomeSummary';

export default {
  title: 'Crm Welcome Summary',
  component: WelcomeSummary,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <WelcomeSummary />;
