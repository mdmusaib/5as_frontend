import React from 'react';
import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IntlMessages from '../../../../utils/IntlMessages';

import {
  AccountCircle,
  ArrowForward,
  Category,
  Chat,
  CheckCircle,
  CloudUpload,
  Colorize,
  ContactMail,
  Contacts,
  Domain,
  DonutSmall,
  DragIndicator,
  Edit,
  EditAttributes,
  Email,
  Error,
  Group,
  ImportContacts,
  InsertChart,
  LibraryBooks,
  LocalGroceryStore,
  LockOutlined,
  Map,
  MonetizationOn,
  NotificationImportant,
  Notifications,
  ShowChart,
  Widgets,
} from '@material-ui/icons';
import SidebarButtons from './SIdebarButtons';

const useStyles = makeStyles(theme => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 72px)',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();
  const navigationMenus = [
    {
      type: 'section',
      children: [
        {
          name: 'Dashboard',
          roles: "1,2,3,4,6,13",
          icon: <Domain />,
          type: 'item',
          link: '/app/dashboard',
        },
        {
          name: 'Add Lead',
          roles: "1,2,3,4,5,6",
          icon: <Domain />,
          type: 'item',
          link: '/app/lead/create',
        },
        {
          name: 'Leads',
          roles: "1,2,3",
          icon: <DonutSmall />,
          type: 'item',
          link: '/app/leads',
        },
        {
          name: 'Projects',
          roles: "1,2,3,4,5,6,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/project/projectLeads',
        },
        {
          name: 'Calendar',
          roles: "1,2,3,4,5,6,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/calendar',
        },
        {
          name: 'Task Calendar',
          roles: "1,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/taskCalendar',
        },
        {
          name: 'Employee',
          roles: "1,4,5,6,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/employee',
        },
        {
          name: 'Employee Management',
          roles: "1,4,5,6,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/employeeManagement',
        },
      ],
    },
    {
      name: <IntlMessages id={'sidebar.Apps'} />,
      type: 'section',
      children: [
        {
          name: <IntlMessages id={'sidebar.appModule.mail'} />,
          type: 'item',
          roles: "1,2,3,4,5,6,7,8,9,10",
          icon: <Email />,
          link: '/apps/mail',
        },

        {
          name: 'PDF',
          roles: "1,2,3,4,5,6,7,8,9,10",
          icon: <CheckCircle />,
          type: 'item',
          link: '/app/PDF/create',
        },
      ],
    },

  ];
  const users = JSON.parse(localStorage.getItem("user")||"{}");
  console.log(users.role);
  const nav = navigationMenus.map(menu => {
    return {
      ...menu,
      children: menu.children.filter(menu => menu.roles.includes(users.role))
    }
  });
  

  return (
    <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
      <CmtVertical menuItems={nav} />
      <SidebarButtons />
    </PerfectScrollbar>
  );
};

export default SideBar;
