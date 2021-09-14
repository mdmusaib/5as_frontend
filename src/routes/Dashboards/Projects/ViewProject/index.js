import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import GridContainer from '@jumbo/components/GridContainer';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CallIcon from '@material-ui/icons/Call';
import IconButton from '@material-ui/core/IconButton';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CmtGridView from '@coremat/CmtGridView';
import Events from '../../../Apps/Profile/Events';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../../redux/actions/ProfileApp';
import StackedBarChart from '../../../../routes/Charts/Bar/demo/StackedBarChart';
import UserPhotos from '../../../Dashboards/Intranet/UserPhotos';
import { array, boolean, color, object, select, text, withKnobs } from '@storybook/addon-knobs';
import ValueImage from './finance_value.png';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TransitionsModal from '../../../../routes/Components/MuiComponents/Modal/demo/TransitionsModal';
import { green, purple, orange } from '@material-ui/core/colors';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { useParams } from 'react-router';
import { urls, baseURL } from '../../../../services/auth/jwt/config';
import { reject } from 'lodash';

const useStyles = makeStyles(theme => ({
  mutedText: {
    color: '#b5b5b5',
    fontSize: '12px',
  },
  finance_root_container: {
    display: 'flex',
  },
  finance_balance: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  section_1: {
    width: '100%',
  },
  finance_title: {
    fontSize: '12px',
  },
  finance_value: {
    fontSize: '25px',
    lineHeight: 3,
  },
  finance_status: {
    border: '1px solid green',
    background: 'green',
    width: '50%',
    textAlign: 'center',
    color: 'white',
  },
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  dropdownStyle: {
    borderRadius: '5em',
    height: '40px',
    input: {
      display: 'none',
    },
  },
}));

const breadcrumbs = [
  { label: 'Home', link: '/' },
  // { label: 'Dashboard', link: '/dashboard' },
  { label: 'Project View', isActive: true },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    fontSize: '10px',
    color: '#FFF',
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  },
}))(Button);

const GreenButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    fontSize: '10px',
    color: '#FFF',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const rows = [
  createData(
    'Events details',
    'Oct 20 2021',
    <Select
      labelId="select-label"
      variant="outlined"
      // className={classes.dropdownStyle}
      style={{ height: '40px', borderRadius: '5em' }}
      id="select-label"
      value={'Completed'}
    // onChange={handleChange}
    >
      <MenuItem value={'Completed'}>Completed</MenuItem>
      <MenuItem value={'onHold'}>On Hold</MenuItem>
      <MenuItem value={'cancelled'}>Cancelled</MenuItem>
    </Select>,
  ),
  createData(
    'Photo Grapher... ',
    'Oct 20 2021',
    <Select
      labelId="select-label"
      id="select-label"
      variant="outlined"
      // className={classes.dropdownStyle}
      style={{ height: '40px', borderRadius: '5em' }}
      value={'On Hold'}
    // onChange={handleChange}
    >
      <MenuItem value={'On Hold'}>On Hold</MenuItem>
      <MenuItem value={'Completed'}>Completed</MenuItem>
      <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
    </Select>,
  ),
  createData(
    'Video Grapher...',
    'Jan 20 2021',
    <Select
      labelId="select-label"
      variant="outlined"
      // className={classes.dropdownStyle}
      style={{ height: '40px', borderRadius: '5em' }}
      id="select-label"
      value={'Completed'}
    // onChange={handleChange}
    >
      <MenuItem value={'Completed'}>Completed</MenuItem>
      <MenuItem value={'On Hold'}>On Hold</MenuItem>
      <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
    </Select>,
  ),
];

const ProjectDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('about');
  const [leadDetails, setLeadDetails] = useState({});
  const { userDetail } = useSelector(({ profileApp }) => profileApp);
  const [formValue, setFormValue] = useState({
    projectValue: 0,
    advancePaid: 0,
    balance: 0,
  });
  const getleadDetails = async () => {
    try {
      const id = window.location.pathname.split('/')[4];
      let getleaddetails = await Axios.get(`${baseURL}/${urls.projectDetails}/${id}`);
      getleaddetails.data.data.events = getleaddetails.data.data.events.map(event => {
        return {
          id: event.id,
          type: event.name,
          title: `${getleaddetails.data.data.bride_name} & ${getleaddetails.data.data.groom_name}`,
          location: event.location,
          date: new Date(event.event_start_datetime).toDateString(),
          name: event.name,
          services: event.services,
        };
      });
      setLeadDetails(getleaddetails.data.data);
      setFormValue({
        projectValue: getleaddetails.data.data.quote.base_price,
        advancePaid: getleaddetails.data.data.quote.adjustment,
        balance: getleaddetails.data.data.quote.total_price,
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  };
  useEffect(() => {
    getleadDetails();
  }, []);
  const [value, setValue] = React.useState({ amount: 0, ...formValue });
  const [showModal, setShowModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePaidAmount = e => {
    setValue({
      ...value,

      amount: e.target.value,
    });
  }
  const TextFieldCompoent = () => {
    return <>
      <TextField
        variant="outlined"
        label="Project Value"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
        value={formValue.projectValue}
        disabled={true}
      />
      <TextField
        variant="outlined"
        label="Advance Paid"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
        value={formValue.advancePaid}
        disabled={true}
      />
      <TextField
        variant="outlined"
        label="Balance Paid"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
        value={formValue.balance}
        disabled={true}
      />
      <TextField
        variant="outlined"
        label="Paid Amount"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        onChange={handlePaidAmount}
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
        value={value.amount}
      />
    </>
  }

  React.useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleTooltipClick = e => {
    e.stopPropagation();
    setShowModal(!showModal);
  };
  const handleCloseClick = () => {
    setShowModal(false);
  };
  const role = JSON.parse(localStorage.getItem("user")||"{}");
  const handleOkClick = async () => {
    const balance = formValue.projectValue - (formValue.advancePaid + parseInt(value.amount));
    const projectFormData = {
      quote_id: leadDetails.quote.id,
      paid_amount: parseInt(value.amount),
      project_id: leadDetails.project_id.id,
    }
    const response = await Axios.post(`${baseURL}/${urls.updatePayment}`, projectFormData);
    setFormValue({
      ...formValue,
      balance: balance,
    });
    setShowModal(false);
  };
  const handleChange = () => {
    setShowModal(false);
  };


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <PageContainer heading="Project View" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={12} md={4} xl={4}>
          <CmtCard className="mb20">
            <CmtCardHeader
              separator={object('Separator', {
                color: '#CCC',
              })}
              className="pt-4 pb-4"
              title="Customer Detail"
              titleProps={{
                variant: 'h4',
                component: 'div',
              }}
            />
            <CmtCardContent>
              <PerfectScrollbar>
                <Box mb={6} style={{ marginBottom: '0px' }}>
                  <Box display="flex" alignItems="center" mb={3} color="text.secondary">
                    <MailOutlineIcon />
                    <Box ml={3} md={3}>
                      <label className={classes.mutedText}> Email </label> <br />
                      {leadDetails.email}
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" mb={3} color="text.secondary">
                    <CallIcon />
                    <Box ml={3} md={3}>
                      <label className={classes.mutedText}> Phone </label> <br />
                      {leadDetails.phone}
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" mb={3} color="text.secondary">
                    <PersonOutlineIcon />
                    <Box ml={3}>
                      <label className={classes.mutedText}> Customer name </label>
                      <br />
                      {leadDetails.name}
                    </Box>
                  </Box>
                </Box>
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>
          {role.role === 1 || role.role === 4 ||role.role === 5||role.role === 10 && <CmtCard className="mb20">
            <CmtCardHeader
              separator={object('Separator', {
                color: '#CCC',
              })}
              className="pt-4 pb-4"
              title="Finance Status"
              titleProps={{
                variant: 'h4',
                component: 'div',
              }}
              actions={[
                { label: 'Record Payment', icon: <AttachMoneyIcon onClick={handleTooltipClick} fontSize="default" /> },
              ]}
            />
            {showModal && (
              <TransitionsModal active={showModal} onClose={handleCloseClick} onOk={handleOkClick} formValues={formValue} component={TextFieldCompoent} />
            )}
            <CmtCardContent>
              <PerfectScrollbar>
                {/* <form className={classes.root} noValidate autoComplete="off"> */}
                <div className={classes.finance_root_container}>
                  <div className={classes.section_1}>
                    <span className={classes.finance_title}>PROJECT VALUE</span>
                    <h1 className={classes.finance_value}>{formValue.projectValue.toLocaleString()}</h1>
                    <span className={classes.finance_title}>ADVANCE PAID</span>
                    <h1 className={classes.finance_value}>{formValue.advancePaid.toLocaleString()}</h1>
                  </div>
                  <div className={classes.finance_balance}>
                    <span className={classes.finance_title} style={{ marginLeft: '20px' }}>
                      BALANCE
                    </span>
                    <h1 className={classes.finance_value}>{formValue.balance.toLocaleString()}</h1>
                    <div className={classes.finance_status}>PAID</div>
                  </div>
                </div>
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>
          }
          <CmtCard className="Views">
            <CmtCardHeader
              separator={object('Separator', {
                color: '#CCC',
              })}
              className="pt-4 pb-4"
              title="Event Coordination Checklist"
              titleProps={{
                variant: 'h4',
                component: 'div',
              }}
            />
            <CmtCardContent>
              <PerfectScrollbar>
                <Table className={classes.table} aria-label="caption table">
                  <TableHead>
                    <TableRow>
                      <TableCell> Task </TableCell>
                      <TableCell align="right"> Date </TableCell>
                      <TableCell align="right"> Status </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(leadDetails).length > 0 &&
                      leadDetails.events.map(row => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{new Date(row.event_start_datetime).toDateString()}</TableCell>
                          <TableCell align="right">
                            {' '}
                            <Select
                              labelId="select-label"
                              id="select-label"
                              variant="outlined"
                              // className={classes.dropdownStyle}
                              style={{ height: '40px', borderRadius: '5em' }}
                              value={'On Hold'}
                            // onChange={handleChange}
                            >
                              <MenuItem value={'On Hold'}>On Hold</MenuItem>
                              <MenuItem value={'Completed'}>Completed</MenuItem>
                              <MenuItem value={'Cancelled'}>Cancelled</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>
        </Grid>

        <Grid item xs={12} sm={12} md={8} xl={8}>
          <CmtCard className="mb20">
            <CmtCardHeader
              separator={object('Separator', {
                color: '#CCC',
              })}
              className="pt-4 pb-4"
              title="Project Details"
              titleProps={{
                variant: 'h4',
                component: 'div',
              }}
            />
            <CmtCardContent>
              <PerfectScrollbar>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} mb={5} spacing={3}>
                    <label className={classes.mutedText}> Customer name </label>
                    <p>{Object.keys(leadDetails).length > 0 && leadDetails.name} </p>
                  </Grid>
                  <Grid item xs={12} md={3} spacing={3}>
                    <label className={classes.mutedText}> Event Date </label>
                    <p> {Object.keys(leadDetails).length > 0 && new Date(leadDetails.created_at).toDateString()}</p>
                  </Grid>
                  <Grid item xs={12} md={3} spacing={3}>
                    <label className={classes.mutedText}> Customer Address </label>
                    <p> {leadDetails.address}</p>
                  </Grid>
                </Grid>
                <CmtGridView
                  itemPadding={24}
                  responsive={{
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 1,
                    xl: 2,
                  }}
                />
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>

          {Object.keys(leadDetails).length > 0 && <Events events={leadDetails.events} serviceDropdown={leadDetails.service_dropdown} />}


        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default ProjectDashboard;
