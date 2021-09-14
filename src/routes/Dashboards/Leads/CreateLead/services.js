import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { events } from '../../../../../src/@fake-db/index';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const AddServices = props => {
  const classes = useStyles();
  const [counter, setCounter] = useState(props.services.unit);
  const [totalPrice, setTotalPrice] = useState(props.services.total_price);
  const handleChange = type => {
    let { selectedServices } = props;
    let filteredEvent = selectedServices.find(e => {
      return e.name === props.services.name;
    });
    if (type == 'add') {
      filteredEvent['total_price'] = filteredEvent['price'] * (filteredEvent.unit + 1);
      filteredEvent['unit'] = filteredEvent.unit + 1;
    } else {
      filteredEvent['total_price'] = filteredEvent['price'] * (filteredEvent.unit - 1);
      filteredEvent['unit'] = filteredEvent.unit - 1;
    }
    setCounter(filteredEvent.unit);
    setTotalPrice(filteredEvent['total_price']);
    console.log('services987', selectedServices);
    props.setServices(selectedServices);
  };
  useEffect(() => {
    // props.setServices(props.selectedServices);
  }, [props.selectedServices]);
  const displayCounter = props.services.unit > 0;

  return (
    <GridContainer>
      <Grid item xs={12} sm={3}>
        <FormControl style={{ width: '100%' }} variant="outlined">
          <TextField disabled value={props.services.name} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3} align="center">
        <ButtonGroup size="small" aria-label="small outlined button group">
          {
            <Button disabled={!displayCounter} onClick={e => handleChange('sub')}>
              -
            </Button>
          }
          {<Button disabled>{props.services.unit}</Button>}
          <Button onClick={e => handleChange('add')}>+</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12} sm={3} align="center">
        <FormControl style={{ width: '100%' }} variant="outlined">
          <TextField disabled value={props.services.description} />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3} align="center">
        <FormControl style={{ width: '100%' }} variant="outlined">
          <TextField disabled value={totalPrice} />
        </FormControl>
      </Grid>
    </GridContainer>
  );
};

export default AddServices;
