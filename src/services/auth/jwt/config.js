import axios from 'axios';

export default axios.create({
  baseURL: `https://fifthanglestudio.herokuapp.com`, //YOUR_API_URL HERE
  // baseURL: `http://localhost:8000`, //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urls = {
  getLeads: 'api/lead/fetchAllLead',
  createLead: 'api/lead/create-lead',
  getAllEvents: 'api/events/getAllEvents',
  getAllReminders: 'api/lead/remainder',
  getLeadDetails: 'api/lead/edit',
  updateLeadDetails: 'api/lead/update',
  getAllUsers: 'api/user/getAllUser',
  updateStatus: 'api/lead/update-status',
  updateFollowupDate: 'api/lead/update_follow_up_date',
  getAllServices: 'api/services/getAllServices',
  downloadquote: 'api/lead/generateQuotes',
  updateExternalCommunication: 'api/communication',
  getExternalCommunication: 'api/communication',
  getLeadDashboard: 'api/lead_dashboard',
  assignEmployee: 'api/employee/assingEmp',
  updatePayment: 'api/updatePayment',
  getThisMonth: 'api/employee/getThisMonth',
  setDate: 'api/employee/setDate',
  fetchProject: 'api/project/fetchAllProject',
  fetchEmployee: 'api/task/fetchEmployeeTask',
  fetchEachEmployeeTask: 'api/task/fetchEachEmployeeTask',
  startEndTimer: "api/startEndTimer",
  projectDetails:'api/project/edit'
};

// export const baseURL = 'http://localhost:8000';
export const baseURL = 'https://fifthanglestudio.herokuapp.com';
