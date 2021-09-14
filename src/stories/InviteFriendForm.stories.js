import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import InviteFriendForm from '../@jumbo/components/Common/InviteFriendForm';

export default {
  title: 'Invite your friend',
  component: InviteFriendForm,
  decorators: [withKnobs, withA11y],
};

export const Default = () => (
  // <CurrencyCalculator title={text('Header Title', 'Currency Calculator')} onCalculate={convertorFunction} />
  <InviteFriendForm />
);
