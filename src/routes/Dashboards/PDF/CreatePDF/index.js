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
import UserPhotos from '../../../Dashboards/Intranet/UserPhotos';
import { array, boolean, color, object, select, text, withKnobs } from '@storybook/addon-knobs';
import * as axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { green, purple, orange } from '@material-ui/core/colors';

//  import { jsPDF } from 'jspdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const useStyles = makeStyles(() => ({
  mutedText: {
    color: '#b5b5b5',
    fontSize: '12px',
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
}));

let pdfImages = async (url, callback) => {
  if (this.state.unmounted) return;

  await axios
    .get(`https://fas-images-assets.s3.ap-south-1.amazonaws.com/pdfimages/${url}`, {
      responseType: 'arraybuffer',
    })
    .then(response => {
      callback(Buffer.from(response.data, 'binary').toString('base64'));
    })
    .catch(console.error);
};

const generate_pdf = async (quoteid, heading) => {
  // this.props.circularProcess(true);
  var doc = new jsPDF();
  let count = 0;
  doc.internal.events.subscribe('addPage', function() {
    count = count + 1;
    if (count > 2) {
      doc.setFillColor(232, 225, 225);
      doc.rect(0, 0, 210, 300, 'F');
    }
  });
  doc.setFontSize(11);
  let strip;

  await pdfImages('Background.jpg', base64Data => {
    strip = base64Data;
  });
  let pdfbaseImage1;
  let pdfbaseImage2;
  let pdfbaseImage3;
  let pdfbaseImage4;
  let pdfbaseImage5;
  await pdfImages('Invoice+Images-01.jpg', base64Data => {
    pdfbaseImage1 = base64Data;
  });
  await pdfImages('Invoice+Images-02.jpg', base64Data => {
    pdfbaseImage2 = base64Data;
  });
  await pdfImages('fifthanglestudios.png', base64Data => {
    pdfbaseImage3 = base64Data;
  });
  await pdfImages('Invoice+Images-03.jpg', base64Data => {
    pdfbaseImage4 = base64Data;
  });
  await pdfImages('Invoice+Images-04.jpg', base64Data => {
    pdfbaseImage5 = base64Data;
  });

  console.log('strip', strip);
  doc.addImage(strip, 'JPEG', 0, 150, 210, 30);
  doc.addImage(pdfbaseImage1, 'JPEG', 10, 40, 100, 120);
  doc.addImage(pdfbaseImage4, 'JPEG', 40, 165, 70, 95);
  doc.addImage(pdfbaseImage3, 'JPEG', 130, 40, 40, 40);
  doc.addImage(pdfbaseImage2, 'JPEG', 115, 90, 85, 100);

  doc.save(`${heading}.pdf`);
};
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
    <GreenButton variant="contained" color="primary">
      Completed
    </GreenButton>,
  ),
  createData(
    'Photo Grapher... ',
    'Oct 20 2021',
    <ColorButton variant="contained" color="primary">
      On Hold
    </ColorButton>,
  ),
  createData(
    'Video Grapher...',
    'Jan 20 2021',
    <GreenButton variant="contained" color="primary">
      Completed
    </GreenButton>,
  ),
];

const ProjectDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState('about');
  const [unmounted, setunmounted] = useState(false);
  const { userDetail } = useSelector(({ profileApp }) => profileApp);

  useEffect(() => {
    dispatch(getUserDetail());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  pdfImages = async (url, callback) => {
    if (unmounted) return;

    await axios
      .get(`https://fas-images-assets.s3.ap-south-1.amazonaws.com/pdfimages/${url}`, {
        responseType: 'arraybuffer',
      })
      .then(response => {
        callback(Buffer.from(response.data, 'binary').toString('base64'));
      })
      .catch(console.error);
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
                  <Button
                    type="submit"
                    variant="outlined"
                    className="jr-btn bg-success text-white btn-format"
                    onClick={() => generate_pdf('1', 'generatePDF')}
                    style={{ marginRight: '0' }}>
                    {' '}
                    Generate Quote{' '}
                  </Button>

                  {/* <GreenButton variant="contained" color="primary">
                    {' '}
                    Download PDF{' '}
                  </GreenButton> */}
                </Box>
              </PerfectScrollbar>
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default ProjectDashboard;
