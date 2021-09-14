import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import Calculator from '../routes/Dashboards/Crypto/Calculator';

export default {
  title: 'Currency Calculator',
  component: Calculator,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <Calculator />;
