import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import InviteFriend from '../routes/Dashboards/Crypto/InviteFriend';

export default {
  title: 'Crypto Invite Friend',
  component: InviteFriend,
  decorators: [withKnobs, withA11y],
};

export const Default = () => <InviteFriend />;
