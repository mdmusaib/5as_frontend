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
import AddServices from './services';
import moment from 'moment';
import { baseURL, urls } from 'services/auth/jwt/config';
import Axios from 'axios';

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

const AddEvents = props => {
  const classes = useStyles();
  const [startdate, setstartdate] = React.useState(new Date());
  const [enddate, setenddate] = React.useState(new Date());
  const [brideName, setbrideName] = useState(props.event.bride_name);
  const [groomName, setgroomName] = useState(props.event.groom_name);
  const [typeofwedding, settypeofwedding] = useState(props.event.type_of_wedding);
  const [venue, setvenue] = useState(props.event.venue);
  const [location, setlocation] = useState(props.event.location);
  const [noofPeople, setnoofPeople] = useState(props.event.number_of_people);
  const [otherdetails, setotherdetails] = useState(props.event.other_details);
  const [selectedServices, setselectedServices] = useState(props.event.services);
  const [services, setServices] = useState([]);

  const handleDates = (date, key) => {
    if (key === 'event_start_datetime') {
      setstartdate(date);
    } else {
      setenddate(date);
    }
    let { selectedEvents } = props;
    let filteredEvent = selectedEvents.find(e => {
      return e.name === props.event.name;
    });
    filteredEvent[key] = moment(date).format('YYYY-MM-DD h:mm:ss');
    props.setSelectedEvents(selectedEvents);
  };
  const editValues = (value, key) => {
    // debugger;
    let { selectedEvents } = props;
    let filteredEvent = selectedEvents.find(e => {
      return e.name === props.event.name;
    });
    filteredEvent[key] = value;
    props.setSelectedEvents(selectedEvents);
  };
  const ChangeServices = values => {
    setselectedServices(values);
    let { selectedEvents } = props;
    let filteredEvent = selectedEvents.find(e => {
      return e.name === props.event.name;
    });
    filteredEvent['services'] = values;
    props.setSelectedEvents(selectedEvents);
  };
  useEffect(() => {
    // debugger;
  }, [props.selectedEvents]);
  useEffect(() => {
    getAllServices();
  }, []);
  const getAllServices = async () => {
    let servicetypes = await Axios.get(`${baseURL}/${urls.getAllServices}`);
    // debugger;
    let servicetype = servicetypes.data.data.map(e => {
      return {
        service_id: e.service_id,
        project_id: props.project_id,
        description: e.description,
        unit: 1,
        price: e.base_unit_price,
        total_price: e.base_unit_price,
        name: e.name,
      };
    });
    setServices(servicetype);
  };
  const handleServices = async (list, reason, element) => {
    let currentEvents = selectedServices;
    if (reason === 'select-option') {
      if (!currentEvents.find(e => e.name === element.option.name)) {
        setselectedServices(list);
      }
    } else {
      setselectedServices(list);
    }
  };
  const [weddingtype, setweddingtype] = useState(events.weddingtype);
  const [selectedEvents, setSelectedEvents] = useState([]);
  return (
    <Box
      pb={{ xs: 6, md: 10, xl: 16, mt: 4 }}
      borderRadius={16}
      border={1}
      padding={3}
      marginBottom={2}
      borderColor="#dcd5d5">
      <GridContainer>
        <Grid item xs={12} sm={12}>
          {props.event.name}
        </Grid>{' '}
      </GridContainer>
      <GridContainer>
        <Grid item xs={12} sm={3}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              variant="outlined"
              label="Bride Name"
              margin="normal"
              type="text"
              //   fullWidth
              required
              disabled={props.edit && !props.editexist}
              size="small"
              value={brideName}
              onChange={e => {
                setbrideName(e.target.value);
                editValues(e.target.value, 'bride_name');
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              variant="outlined"
              label="Groom Name"
              margin="normal"
              type="text"
              required
              //   fullWidth
              size="small"
              disabled={props.edit && !props.editexist}
              value={groomName}
              onChange={e => {
                editValues(e.target.value, 'groom_name');
                setgroomName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <KeyboardDateTimePicker
            id="datetime-local"
            label="Start Date & Time"
            // format="MM/dd/yyyy"
            // value={props.event.event_start_datetime}
            disabled={props.edit && !props.editexist}
            onChange={e => handleDates(e, 'event_start_datetime')}
            value={startdate}
            // onChange={setstartdate}
            required
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <KeyboardDateTimePicker
            id="datetime-local"
            label="End Date & Time"
            // format="MM/dd/yyyy"
            // value={props.event.event_end_datetime}
            onChange={e => handleDates(e, 'event_end_datetime')}
            value={enddate}
            disabled={props.edit && !props.editexist}
            required
            // onChange={setenddate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </GridContainer>
      <GridContainer>
        <Grid item xs={12} sm={3}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              select
              label="Type of Wedding"
              required
              variant="outlined"
              size="small"
              disabled={props.edit && !props.editexist}
              margin="normal"
              value={typeofwedding}
              onChange={e => {
                settypeofwedding(e.target.value);
                editValues(e.target.value, 'type_of_wedding');
              }}>
              {weddingtype.map((option, index) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            label="Venue"
            margin="normal"
            required
            type="text"
            size="small"
            disabled={props.edit && !props.editexist}
            fullWidth
            value={venue}
            onChange={e => {
              editValues(e.target.value, 'venue');
              setvenue(e.target.value);
            }}
            //   value={amount}
            //   onChange={e => setAmount(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            label="Location"
            margin="normal"
            required
            type="text"
            size="small"
            fullWidth
            disabled={props.edit && !props.editexist}
            value={location}
            onChange={e => {
              editValues(e.target.value, 'location');
              setlocation(e.target.value);
            }}
            //   value={amount}
            //   onChange={e => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            label="# of People"
            margin="normal"
            required
            type="text"
            disabled={props.edit && !props.editexist}
            size="small"
            fullWidth
            value={noofPeople}
            onChange={e => {
              editValues(e.target.value, 'number_of_people');
              setnoofPeople(e.target.value);
            }}
            //   value={amount}
            //   onChange={e => setAmount(e.target.value)}
          />
        </Grid>
      </GridContainer>
      <GridContainer>
        <Grid item xs={12} sm={12}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              variant="outlined"
              label="Other details"
              margin="normal"
              required
              type="text"
              multiline
              rows={4}
              disabled={props.edit && !props.editexist}
              //   fullWidth
              size="small"
              value={otherdetails}
              onChange={e => {
                editValues(e.target.value, 'other_details');
                setotherdetails(e.target.value);
              }}
              //   value={amount}
              //   onChange={e => setAmount(e.target.value)}
            />
          </FormControl>
        </Grid>
      </GridContainer>
      {props.edit && (
        <Box
          pb={{ xs: 6, md: 10, xl: 16, mt: 4 }}
          borderRadius={16}
          border={1}
          padding={3}
          marginBottom={2}
          borderColor="#dcd5d5">
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <FormControl style={{ width: '100%' }} variant="outlined">
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  required
                  options={services}
                  value={selectedServices}
                  disableClearable
                  disabled={props.edit && !props.editexist}
                  onChange={(event, list, reason, detail) => {
                    handleServices(list, reason, detail);
                    // setselectedServices(newValue);
                  }}
                  getOptionLabel={option => option.name}
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField {...params} variant="outlined" label="Services" placeholder="Services" size="small" />
                  )}
                />
              </FormControl>
            </Grid>
          </GridContainer>
          {selectedServices &&
            selectedServices.map(services => {
              return <AddServices services={services} setServices={ChangeServices} selectedServices={selectedServices} />;
            })}
        </Box>
      )}{' '}
    </Box>
  );
};

export default AddEvents;
