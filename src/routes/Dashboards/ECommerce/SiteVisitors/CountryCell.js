import React from 'react';
import { Box, fade } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  countryCellItem: {
    cursor: 'pointer',
    padding: 12,
    transition: 'all .2s',
    borderRadius: 4,
    '&:hover, &.active': {
      backgroundColor: fade(theme.palette.common.dark, 0.04),
      '& .text-hover': {
        color: theme.palette.text.primary,
      },
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${fade(theme.palette.common.dark, 0.2)}`,
    },
  },
}));

const CountryListItem = ({ country }) => {
  const { flagCode, name, visitors, badgeColor } = country;
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" className={classes.countryCellItem}>
      <Box display="flex" alignItems="center">
        <i className={`flag flag-24 flag-${flagCode}`} />
        <Box color="text.disabled" className="text-hover" px={3}>
          {name}
        </Box>
      </Box>
      <Box px={2} display="flex" alignItems="center">
        <Box mx={3}>{visitors}</Box>
        <Box component="span" ml={3} height={10} width={10} bgcolor={badgeColor} borderRadius="50%" />
      </Box>
    </Box>
  );
};

export default CountryListItem;
