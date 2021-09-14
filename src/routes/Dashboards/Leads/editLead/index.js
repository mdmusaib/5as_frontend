import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MockAdapter from 'axios-mock-adapter';
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
import axios, { urls, baseURL } from '../../../../services/auth/jwt/config';
import { leads } from '@fake-db';
import { reject } from 'lodash';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { useParams } from 'react-router';
import AddLead from '../CreateLead';
import Axios from 'axios';

const mock = new MockAdapter(axios);

mock.onGet('/getValues').reply(200, {
  leadsources: [
    {
      value: 'None',
      label: 'None',
    },
    {
      value: 'Webform',
      label: 'webform',
    },
  ],
  salespersons: [
    {
      value: '0',
      label: 'None',
    },
    {
      value: '1',
      label: 'Manoj',
    },
  ],
});

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

const EditLead = props => {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
  const [leaddetails, setleaddetails] = useState({});
  const [leadid, setleadid] = useState(useParams());
  const getleadDetails = async () => {
    try {
      let getleaddetails = await Axios.get(`${baseURL}/${urls.getLeadDetails}/${leadid.id}`);
      setleaddetails(getleaddetails.data.data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  };
  useEffect(() => {
    getleadDetails();
  }, []);
  return <AddLead edit={true} details={leaddetails} />;
};

export default EditLead;
