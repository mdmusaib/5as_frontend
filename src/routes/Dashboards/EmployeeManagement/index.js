import React, { useState, useEffect } from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import LeadsTable from './LeadsTable';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box, Grid, TablePagination } from '@material-ui/core';
import axios, { baseURL, urls } from '../../../services/auth/jwt/config';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import { reject } from 'lodash';
import TransitionsModal from '../../../routes/Components/MuiComponents/Modal/demo/TransitionsModal';

const role = JSON.parse(localStorage.getItem("user")||"{}");

const useStyles = makeStyles(theme => ({
  cardContentRoot: {
    padding: '0 !important',
    marginTop: '2%',
  },
  titleRoot: {
    letterSpacing: 0.15,
  },
  scrollbarRoot: {
    height: 470,
  },
  reminderTable: {
    height: 530,
  },
}));
const updateStatus = async ({ current_status, id }) => {
  let updatestatus = await Axios.post(`${baseURL}/${urls.updateStatus}/${id}`, {
    current_status,
  });
  //debugger;
  if (updatestatus.data.success) {
    toast.success('You have updated Lead status successfully.');
  }
};

const updateFollowupDate = async ({ next_follow_up, id }) => {
  let updatefollowupdate = await Axios.post(`${baseURL}/${urls.updateFollowupDate}/${id}`, {
    next_follow_up,
  });
  if (updatefollowupdate.data.success) {
    toast.success('You have updated Lead Follow up date successfully.');
  }
};

const Employee = props => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
  const [delayed, setdelayed] = useState([]);
  const [followup, setfollowup] = useState([]);
  const [quotefinal, setquotefinal] = useState([]);
  const [onhold, setonhold] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const handleOkClick = async () => {
    setShowModal(false);
  };
  useEffect(() => {
    const getLeads = async () => {
      try {
        let leads = await Axios.get(`${baseURL}/${urls.getAllUsers}`);
        if (leads.status === 200) {
          setTableData(leads.data);
        }
        let remainders = await Axios.get(`${baseURL}/${urls.getAllReminders}`);
        // debugger;
        if (remainders.data.code === 200) {
          let { data } = remainders.data;
          setfollowup(data['FOLLOWUP'] ? data['FOLLOWUP'] : []);
          setdelayed(data['DELAYED'] ? data['DELAYED'] : []);
          setquotefinal(data['QUOTEFINAL'] ? data['QUOTEFINAL'] : []);
          setonhold(data['ONHOLD'] ? data['ONHOLD'] : []);
        }
      } catch (e) {
        console.log(e);
        reject(e);
      }
    };
    getLeads();
  }, []);
  const TextFieldCompoent = () => {
    return <>
      <TextField
        variant="outlined"
        label="Name"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
      
        disabled={true}
      />
      <TextField
        variant="outlined"
        label="Email"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
      />
      <TextField
        variant="outlined"
        label="Password"
        margin="normal"
        required
        type="password"
        size="small"
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Role"
        margin="normal"
        required
        type="text"
        size="small"
        fullWidth
        type="number"
        inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
      />
    </>
  }
  function handleButtonClick(){
    
    setShowModal(true)
    }
  function handleCloseClick(){
    
    setShowModal(false)
    }
  useEffect(() => {
    let filtered = tableData.filter(e => {
      if (
        (e.Customer && e.Customer.includes(props.search)) ||
        (e['Contact Number'] && e['Contact Number'].includes(props.search)) ||
        (e.id && e.id == parseInt(props.search))
      ) {
        return e;
      }
    });
    if (filtered) setFilteredData(filtered);
  }, [props.search]);
  return (
    <PageContainer>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Button style={{float:"right",marginBottom:"10px"}} onClick={()=>handleButtonClick()}>Add Employee</Button>
      {showModal && (
              <TransitionsModal active={showModal} onClose={handleCloseClick} onOk={handleOkClick}  component={TextFieldCompoent} />
            )}
      <GridContainer>
        <Grid item xs={12}>
          <CmtCard>
            <CmtCardContent className={classes.cardContentRoot}>
              <PerfectScrollbar className={classes.scrollbarRoot}>
                <LeadsTable
                  tableData={filteredData.length > 0 ? filteredData : tableData}
                  updateStatus={updateStatus}
                  updateFollowupDate={updateFollowupDate}
                />
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Employee;
