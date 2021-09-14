import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import QueriesStatistics from '../routes/Dashboards/Listing/QueriesStatistics';

export default {
  title: 'Listing Queries Statistics',
  component: QueriesStatistics,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <QueriesStatistics />;
