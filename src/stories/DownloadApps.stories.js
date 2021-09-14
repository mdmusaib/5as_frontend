import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import { DownloadApps } from '../@jumbo/components/Common';

export default {
  title: 'Download Apps',
  component: DownloadApps,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <DownloadApps />;
