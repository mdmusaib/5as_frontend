import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import React from 'react';
import UserDetail from '../routes/Widgets/Classic/UserDetail';
import CafeBasilico from '../routes/Widgets/Classic/CafeBasilico';
import CitiesBgCard from '../routes/Widgets/Classic/CitiesBgCard';
import WordOfTheDay from '../routes/Widgets/Classic/WordOfTheDay';
import UserStatstics from '../routes/Widgets/Classic/UserStatstics';

export default {
  title: 'Classic Widget User Details',
  component: UserDetail,
  decorators: [withKnobs, withA11y],
};
export const Default = () => <UserDetail />;

export const CoffeeCard = () => <CafeBasilico />;

export const CitiesBg = () => <CitiesBgCard />;
export const WidgetWordOfTheDay = () => <WordOfTheDay />;
export const WidgetUserStatstics = () => <UserStatstics />;
