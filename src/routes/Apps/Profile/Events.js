import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import CmtImage from '../../../@coremat/CmtImageCutom';
import CmtMediaObject from '../../../@coremat/CmtMediaObject';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../@coremat/CmtList';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { object } from '@storybook/addon-knobs';
import axios from 'axios';
import { baseURL, urls } from "../../../services/auth/jwt/config";
import MenuButton from './MenuButton';
// import AccountCircle from '@material-ui-icons/AccountCircle';
// import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  subTitleRoot: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    marginBottom: 0,
    marginTop: 6,
  },
  eventItem: {
    padding: 0,
    '&:not(:last-child)': {
      marginBottom: 18,
      paddingBottom: 15,
      borderBottom: `1px solid ${theme.palette.borderColor.main}`,
    },
    '& .Cmt-media-object': {
      width: '100%',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    '& .Cmt-media-image': {
      marginBottom: 12,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginRight: 16,
        maxWidth: 150,
        marginBottom: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginRight: 24,
        maxWidth: 200,
      },
      '& img': {
        width: '100%',
        borderRadius: 6,
        marginRight: 0,
        display: 'block',
        objectFit: 'cover',
      },
    },
    '& .Cmt-media-footer': {
      '@media screen and (max-width: 700px)': {
        width: '100%',
        marginLeft: 0,
      },
    },
  },
  badgeRoot: {
    padding: '5px 12px',
    backgroundColor: '#00bcd4',
    // backgroundColor:  fade(theme.palette.primary.main, 0.1),
    // color: theme.palette.primary.main,
    color: '#FFF',
    borderRadius: 5,
    fontSize: 8,
    display: 'inline-block',
    marginBottom: 10,
  },
  linkRoot: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    cursor: 'pointer',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
      display: 'block',
    },
  },
  dropdownStyle: {
    borderRadius: '5em',
    border: '1px solid grey',
    height: '40px',
    input: {
      display: 'none',
    },
  },
  serviewDropdown: {
    pointerEvents: "none",
    background: "#808080",
    cursor: "no-drop",
  }
}));

const EventItem = ({ item, serviceDropdown }) => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([])
  const obj = {};

  item &&
    item.services.forEach(i => {
      if (serviceDropdown) {
        obj[`${item.name}_${i.id}`] = `${serviceDropdown.service.name}- ${serviceDropdown.employee.name}`
      } else {
        obj[`${item.name}_${i.id}`] = i.name;
      }
    });
  const [event, setEvent] = React.useState(obj);
  const [defaultOption, setOption] = React.useState(obj);
  React.useEffect(() => {
    const getUsers = async () => {
      try {
        let res = await axios.get(`${baseURL}/${urls.getAllUsers}`);
        if (res.status === 200) {
          setUsers(res.data);
        }
      } catch (e) {
        console.log(e);
        // reject(e);
      }
    };
    getUsers();
  }, []);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleChange = async (id, value, serviceId, userId) => {
    // setAnchorEl(null);
    const service = item.services.find(service => service.service_id === serviceId);
    console.log(service);
    const obj = {
      "employee_id": userId,
      "event_id": item.id,
      "service_id": service.service_id,
      "project_id": service.project_id,
      "available_date": new Date()
    }
    const response = await axios.post(`${baseURL}/${urls.assignEmployee}`, obj);
    console.log(response)
    setEvent({ ...event, [id]: value });
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    setAnchorEl(null);
  };
  const getTitle = () => (
    <Box mb={4}>
      <Box component="span" className={classes.badgeRoot} bgcolor="#00bcd4">
        {item.name}
      </Box>
      <Typography className="pointer" component="div" variant="h3" mb={1}>
        {`${item.title}`}
      </Typography>
    </Box>
  );

  const getSubTitle = () => (
    <Box color="text.disabled" display="flex" alignItems="center">
      {/* <LocationOnIcon /> */}
      <Box component="p">{item.location}</Box>
    </Box>
  );

  const getFooter = () => (
    <Box style={{ marginLeft: '-10px' }} mt={{ xs: 2, md: 2 }}>
      <Box color="error.main" display="flex" alignItems="center" fontSize={{ xs: 15, lg: 20 }}>
        <Box component="span" style={{ color: 'blue' }} ml={2}>
          {item.date}
        </Box>
      </Box>

      <Box className={classes.root} mt={{ xs: 2, md: 2 }}>
        {item &&
          item.services.map(i => {
            const userWithEvent = []
            users.forEach(user => {
              if ([7, 8, 9, 10].includes(user.role)) {
                userWithEvent.push({
                  display: user.name,
                  value: `${defaultOption[`${item.name}_${i.id}`]}-${user.name}`,
                  userId: user.id
                })
              }
            })
            // userWithEvent.unshift({ display: defaultOption[`${item.name}_${i.id}`], value: defaultOption[`${item.name}_${i.id}`] });
            return (
              <>
                <MenuButton
                  className={serviceDropdown ? "dropdown-hidden" : ""}
                  items={userWithEvent}
                  data={{
                    id: `${item.name}_${i.id}`,
                    value: event[`${item.name}_${i.id}`],
                    classes: `${classes.dropdownStyle} ${serviceDropdown ? classes.serviewDropdown : " "}`,
                    serviceId: i.service_id
                  }}
                  handlers={{
                    handleClick: handleClick,
                    handleChange: handleChange,
                  }}
                />
              </>
            );
          })}
      </Box>

      <Box
        className={classes.linkRoot}
        display="flex"
        alignItems="center"
        ml={{ md: 2 }}
        mt={{ xs: 1, md: 1 }}
        fontSize={{ xs: 12, lg: 14 }}>
        {/* <Box>Check In Detail</Box> */}
        <Box ml={2}>{/* <ArrowForwardIcon /> */}</Box>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <CmtMediaObject
        // avatar={<CmtImage className="pointer" src={item.thumb} alt={item.title} />}
        avatarPos="center"
        title={getTitle()}
        subTitle={getSubTitle()}
        footerComponent={getFooter()}
      />
    </React.Fragment>
  );
};
function getEventItem(item, serviceDropdown, index) {
  if (serviceDropdown.length > 0) {
    return <EventItem item={item} serviceDropdown={serviceDropdown[index]} />
  }
  return <EventItem item={item} />
}
const Events = ({ events, serviceDropdown }) => {
  const classes = useStyles();
  return (
    <CmtCard>
      <CmtCardHeader
        separator={object('Separator', {
          color: '#CCC',
        })}
        className="pt-4 pb-4"
        title="Events List"
      />
      <CmtCardContent>
        <CmtList
          data={events}
          renderRow={(item, index) => (
            <ListItem className={classes.eventItem} component="div" key={index}>
              {getEventItem(item, serviceDropdown, index)}
            </ListItem>
          )}
        />
      </CmtCardContent>
    </CmtCard>
  );
};

export default Events;

Events.prototype = {
  events: PropTypes.array.isRequired,
};
