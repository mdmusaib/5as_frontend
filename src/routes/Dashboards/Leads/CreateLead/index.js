import React, { useState, useEffect, useRef } from 'react';
import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
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
import Paper from '@material-ui/core/Paper';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Autocomplete } from '@material-ui/lab';
import AddEvents from './events';
import { baseURL, urls } from '../../../../services/auth/jwt/config';
import { leads } from '@fake-db';
import { reject } from 'lodash';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import Axios from 'axios';
import axios from 'axios';
import moment from 'moment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CommunicationList from '../Communications/list';
import { NavLink } from 'react-router-dom';
import { BorderAll } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

//  import { jsPDF } from 'jspdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

let pdfImages = async (url, callback) => {
  // if (unmounted) return;
  
  
  // https://fas-images-assets.s3.ap-south-1.amazonaws.com/pdfimages/${url}

  await Axios.get(`/images/5as/${url}`, {
    responseType: 'arraybuffer',
  })
    .then(response => {
      console.log(response.data, 'url-' + url);
      callback(Buffer.from(response.data, 'binary').toString('base64'));
    })
    .catch(console.error);
};

let splitAmountValue = (price)=>{
  let stringPrice = String(price);
  if(stringPrice.length>3){
    let count =0;
    let totalCount = 0;
    let dub_price = Number(price);
    let returnString = '';
    let enterFirstThree = false;
    while(dub_price!==0){
      returnString =Number(dub_price%10)+returnString;
      dub_price = Math.floor(dub_price/10);
      let convertPrice = String(dub_price).split(".")[0];
      dub_price = Number(convertPrice);
      // console.log(dub_price)
      count = count+1;
      totalCount = totalCount +1;
      if(count===3){
        returnString = ','+returnString;
        count=0;
        enterFirstThree= true;
      }
      if(count===2 && enterFirstThree && totalCount!==stringPrice.length){
        count=0;
        returnString = ','+returnString;

      }
      
    }
    return returnString;
  }
  else{
    return price;
  }
}

const generate_pdf = async (project, heading, loader) => {
  var doc = new jsPDF();
  let count = 0;
  let quoteid = project.id;

  loader(true);
  
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

  doc.addImage(strip, 'JPEG', 0, 150, 210, 30);
  doc.addImage(pdfbaseImage1, 'JPEG', 10, 40, 100, 120);
  doc.addImage(pdfbaseImage4, 'JPEG', 40, 165, 70, 95);
  doc.addImage(pdfbaseImage3, 'JPEG', 130, 40, 40, 40);
  doc.addImage(pdfbaseImage2, 'JPEG', 115, 90, 85, 100);

  // doc.addImage(pdfbaseImage5,"JPEG",115,165,85,115);
  doc.addPage(); // 1
  let pdfbaseImage6;
  let pdfbaseImage7;
  let pdfbaseImage8;
  let pdfbaseImage9;
  await pdfImages('Invoice+Images-12.png', base64Data => {
    pdfbaseImage6 = base64Data;
  });
  await pdfImages('Invoice+Images-05.jpg', base64Data => {
    pdfbaseImage7 = base64Data;
  });
  await pdfImages('Invoice+Images-06.jpg', base64Data => {
    pdfbaseImage8 = base64Data;
  });
  await pdfImages('Invoice+Images-08.png', base64Data => {
    pdfbaseImage9 = base64Data;
  });
  doc.addImage(strip, 'JPEG', 10, 30, 20, 240);
  doc.addImage(pdfbaseImage6, 'JPEG', 150, 5, 50, 30);
  doc.addImage(pdfbaseImage5, 'JPEG', 20, 40, 110, 100);
  // doc.addImage(pdfbaseImage5, 'JPEG', 135, 60, 65, 90);
  // doc.addImage(pdfbaseImage5, 'JPEG', 40, 150, 70, 30);
  doc.addImage(pdfbaseImage7, 'JPEG', 135, 60, 65, 90);
  doc.addImage(pdfbaseImage9, 'JPEG', 40, 150, 70, 30);

  doc.text(
    `Established in the year 2015 by Manoj Nagarajan, Fifth Angle Studios\n continues to be striving, for one thing, i.e., making sure that every\n single moment of a wedding is captured beautifully and delivered to\n you with the very soul of it.\n\n
We shoot and treat a lot of weddings a year, but for us, every single\n wedding is as significant as it is to you. Just because of that, we have\n been able to come where we are now and have a great record of client\n satisfaction. We cater to not just weddings but any event that asks for\n aesthetically captured memories. 
      `,
    50,
    180,
  );
  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);
  doc.addPage(); // 2
  let pdfbaseImage10;
  // let pdfbaseImage11;
  await pdfImages('Invoice+Images-09.png', base64Data => {
    pdfbaseImage10 = base64Data;
  });
  // await this.pdfImages("Invoice+Images-07.jpg",(base64Data)=>{
  //   pdfbaseImage11 =base64Data;
  // });
  doc.addImage(strip, 'JPEG', 0, 80, 60, 20);
  doc.addImage(pdfbaseImage6, 'JPEG', 150, 5, 50, 30);
  doc.addImage(pdfbaseImage10, 'JPEG', 75, 40, 60, 30);
  doc.addImage(pdfbaseImage8, 'JPEG', 20, 75, 170, 175);
  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);
  doc.text(`Engagement · Wedding · Birthday · Portfolio · Outdoor · Events`, 50, 70);
  doc.addPage(); // 3

  let pdfbaseImage14;
  await pdfImages('Invoice+Images-10.png', base64Data => {
    pdfbaseImage14 = base64Data;
  });
  doc.addImage(pdfbaseImage6, 'JPEG', 150, 5, 50, 30);
  doc.addImage(pdfbaseImage14, 'JPEG', 20, 5, 60, 30);
  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);

  /*** Dynamic Data ***/
  let deliverables = [];
  
  await Axios.get(`${baseURL}/${urls.downloadquote}/${quoteid}`)
    .then(servicesData => {
      if (servicesData) {
        let serviceData = servicesData.data.data;
        let leadData = JSON.parse(serviceData.lead);
        doc.text(`Client Name: ${serviceData.customerName}`, 20, 50);
        // doc.fromHTML(`<b>Quote Date: ${moment(new Date()).format('Do MMMM YYYY')}</b>`, 20, 40)
        let events = leadData;
        events.map(eventValue => {
          // doc.text(`${eventValue?.masterEventByEventId?.eventName} | Location: ${eventValue?.location} | Date: ${moment(eventValue?.eventStartDate).format('Do MMMM YYYY')}`,20,100);

          let serviceDatas = []; 
          eventValue.services.map(service => {
            if(service.service?.is_deliverable){
              deliverables.push([service.name,service.unit, service.service?.description]);
            }else{
              serviceDatas.push([service.name,service.unit, 1]);

            }
            // totalAmount = totalAmount + (Number(serviceData?.quantity)*Number(serviceData?.servicePrice));
            return serviceData;
          })
          doc.autoTable({
            head: [[`${eventValue?.event_name?.name} | Location: ${eventValue?.location} | Event Date: ${moment(eventValue?.event_date).format('Do MMMM YYYY')}`]],
            theme: "plain",
            headStyles: {
              valign: "middle", halign: "center",
              fillColor: [255, 255, 255],
              // font:"courier"

            },
            styles: {
              fontSize: 11
            },
            margin: { top: 55, right: 20, bottom: 40, left: 20 }
          })
          doc.autoTable({
            body: serviceDatas,
            head: [
              [`Time Slot: ${moment(eventValue?.event_date).format('a') === "pm" ? "Evening" : "Morning"}`, "Crew"]
            ],
            headStyles: {
              valign: "middle", halign: "left",
              fontStyle:"bold",
              textColor:"black"
              // fillColor: [255, 255, 255],
              // font:"courier"


            },
            alternateRowStyles: {
              borderBottomStyle: "5px solid red",
            },
            styles: {
              fontSize: 11,
              // font:"courier"
            },
            columnStyles: {
              0: { cellWidth: 120, halign: "left" },
              1: { cellWidth: 50, halign: "left" },
            },
            theme: "plain",
            margin: { top: 55, right: 20, bottom: 40, left: 20 },
            didDrawPage: () => {
              // doc.setFillColor(232, 225, 225);
              // doc.rect(0, 0 , 210,300, "F");
              doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
              doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
              doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);

            },
            didDrawCell: data => {
              if (data.section === 'body') {

                // doc.setFont('avenirfont');
              }
            },
            // willDrawCell: data => {
            //   doc.line(20, 25, 60, 25);
            // }
          });
          return eventValue;
        })
        if(deliverables?.length>0){
          doc.autoTable({
          head: [['Deliverables', "Qty", "Duration"]],
          // body: [
          //   [`Processed Candid Photos for sharing on social media`, "40-50", "7 - 10 days"],
          //   [`Soft Copy of Raw Photo jpegs`, "", "5 - 7 days"],
          //   ["Premium Albums with 200 - 220 photos in 40 sheets (each)", "2", "30 - 40 days after selection of photos"],
          //   [`A documentary HD video of the entire event edited in 20 - 45 minutes & delivered in pen-drive (length of the video depends on the duration of the event)`, "1", "60 - 70 days"]
          // ],
          body:deliverables,
          columnStyles: {
            0: { cellWidth: 80, halign: "left" },
            1: { cellWidth: 40, halign: "left" },
            2: { cellWidth: 50, halign: "left" },
            // etc
          },
          headStyles: {
            valign: "middle", halign: "left",
            fillColor: [255, 255, 255],
            // font:"courier"


          },
          styles: {
            fontSize: 11,
            // font:"courier"
          },
          didDrawPage: () => {
            doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
            doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
            doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
          },
          didDrawCell: data => {
            if (data.section === 'body') {

              // doc.setFont('avenirfont');
            }
          },
          theme: "plain",
          margin: { top: 55, right: 20, bottom: 40, left: 20 }
        })
        }
        // doc.setFontType("bold");
        // doc.setFontSize(13);
        // doc.text(`Price: Rs ${this.splitAmountValue(totalAmount)} + GST`, 140, 75);
        // let discount = serviceData?.data?.data?.projectQuoteById?.discount ? Number(serviceData?.data?.data?.projectQuoteById?.discount) : 0;
        // let adjestmentamt = serviceData?.data?.data?.projectQuoteById?.adjustmentAmt ? Number(serviceData?.data?.data?.projectQuoteById?.adjustmentAmt) : 0;
        // totalAmount = totalAmount - discount - adjestmentamt;
        doc.autoTable({
          head:[[`Price: Rs ${serviceData.total_price}`]],
          headStyles: {
            valign: "middle", halign: "center",
            fontStyle:"bold",
            fontSize:12,
            textColor:"black",

            fillColor: [255, 255, 255],
            // // font:"courier"


          },
          margin: { top: 55, right: 20, bottom: 40, left: 20 },

          didDrawPage: () => {
            doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
            doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
            doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
          },
          theme: "plain"
        })
        doc.addPage();
        doc.autoTable({
          head: [['Optionals', "Qty", "Price"]],
          body: [
            [`Candid Cinematography: Teaser & Film`, "2 Sessions", "Rs.1,00,000"],
            [`Live projection PlasmaTV Screens`, "1 Unit per session", "Rs.2,000 + Transport"],
            [`LED Wall 8 × 6 + Engineer`, "1 Session", "Rs.22,000 + Transport"],
            ["Online HD Mixer + Technicians", "1 Session", "Rs.15,000"],
            ["Helicam / Drone", "1 Session", "Rs.20,000"],
            ["Live Internet Webcasting: Per hour Ask for quote Domain Name + Designer + Server", "Per hour", "Ask for quote"]
          ],
          columnStyles: {
            0: { cellWidth: 70, halign: "left" },
            1: { cellWidth: 50, halign: "left" },
            2: { cellWidth: 50, halign: "left" },
            // etc
          },
          headStyles: {
            valign: "middle", halign: "left",
            fillColor: [255, 255, 255],
            // font:"courier"


          },
          styles: {
            fontSize: 11,
            // font:"courier"
          },
          theme: "plain",
          didDrawPage: () => {
            doc.addImage(pdfbaseImage14, "JPEG", 20, 5, 60, 30);
            doc.addImage(pdfbaseImage6, "JPEG", 150, 5, 50, 30);
            doc.addImage(pdfbaseImage3, "JPEG", 90, 260, 30, 30);
          },
          didDrawCell: data => {
            if (data.section === 'body') {

              // doc.setFont('avenirfont');
            }
          },
          margin: { top: 55, right: 20, bottom: 40, left: 20 }
        })
      }
    })
  /*** End of Dynamic Data ***/

  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);

  doc.addPage();
  let pdfbaseImage12;
  await pdfImages('Invoice+Images-11.png', base64Data => {
    pdfbaseImage12 = base64Data;
  });
  doc.addImage(pdfbaseImage6, 'JPEG', 150, 5, 50, 30);
  doc.addImage(pdfbaseImage12, 'JPEG', 20, 5, 60, 30);
  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);
  doc.text(
    `
1. Travel to and fro to the venue outside Chennai with Accommodation and Food for the crew should\n be provided/reimbursed by the client.\n
2. 50% of amount payable on confirmation, 40% due before the event and 10% due before the\n delivery of raw photographs.\n
3. Copyrights of all the images and video remains to Fifth Angle Studios and will be used for\n promotional purposes.\n
4. Pictures for the album should be selected within 3 months after receiving the raw files.\n
5. Additional copies of album will be charged extra. (approx 25,000/- for a 40 sheet album)\n
6. Additional sheets of the album will be charged extra.\n
7. Only on receipt of final payment, all original high res photos will be delivered.\n
8. One revision of album design is free, while no revision of album after printing. Customer shall\n request for additional changes in album design at an extra cost.\n
9. Booking to be confirmed by signing a Letter of Contract and payment of advance. No refund of \nadvance at any situation.\n
10. Services listed in the package above can be customized based upon client requirements.\n
11. Traditional video or documentary video of the event will be edited only in our format/style. No\n changes can be made by the client.\n
12. Preferences and song choices for the candid teaser and wedding film should be told at the\n initial stage by the client. Only one free revision is allowed after this and further more revisions\n can be made at an extra cost.\n
13. To include any optionals to the package, notification before 15 days from the date of event is\n mandatory.\n
14. Outstation travel cost to be covered by clients. Mode of travel will be our preference.\n
15. Candid pictures for the retouch to be selected only by our team.\n
16. After closing the pending payment, client should collect the raw files within 7 days in their own\n hard disk.
          `,
    20,
    40,
  );
  doc.addPage();
  doc.setFillColor(255, 253, 252);
  doc.rect(0, 0, 210, 300, 'F');
  let pdfbaseImage13;
  let icon1;
  let icon2;
  let icon3;
  await pdfImages('Thank+you.png', base64Data => {
    pdfbaseImage13 = base64Data;
  });
  await pdfImages('insta.png', base64Data => {
    icon1 = base64Data;
  });
  await pdfImages('fb.png', base64Data => {
    icon2 = base64Data;
  });
  await pdfImages('yt.png', base64Data => {
    icon3 = base64Data;
  });
  doc.addImage(pdfbaseImage6, 'JPEG', 150, 5, 50, 30);
  doc.addImage(strip, 'JPEG', 0, 70, 125, 30);
  doc.addImage(pdfbaseImage13, 'JPEG', 65, 70, 60, 30);
  doc.addImage(icon1, 'JPEG', 40, 125, 8, 8);
  doc.addImage(icon2, 'JPEG', 85, 125, 8, 8);
  doc.addImage(icon3, 'JPEG', 130, 125, 8, 8);
  doc.text(`fifth_angle_studios`, 50, 130);
  doc.text(`FifthAngleStudios`, 95, 130);
  doc.text(`FifthAngleStudios`, 140, 130);

  doc.text(`info@fifthanglestudios.com | www.fifthanglestudios.com`, 50, 140);
  doc.text(`No. 49/13, Habibullah Road, T.Nagar, Chennai-17`, 55, 160);
  doc.text(`+91 8870042555, 9884789497`, 65, 170);
  doc.addImage(pdfbaseImage3, 'JPEG', 90, 260, 30, 30);

  /*** Save  ***/
  doc.save(`${heading}.pdf`);

  loader(false);
};

const AddLead = props => {
  const classes = useStyles();
  const [currencies, setcurrencies] = useState(leads.code);
  const [leadsources, setleadsources] = useState(leads.leadsource);
  const [salespersons, setsalespersons] = useState([]);
  const [events, setevents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [customerName, setcustomerName] = useState(' ');
  const [phoneCode, setphoneCode] = useState(leads.code[0].value);
  const [phoneNo, setPhoneNo] = useState('');
  const [whatsappPhoneCode, setwhatsappPhoneCode] = useState(leads.code[0].value);
  const [whatsappNo, setwhatsappNo] = useState('');
  const [emailid, setemailId] = useState('');
  const [fbId, setfbId] = useState('');
  const [brideName, setbrideName] = useState('');
  const [groomName, setgroomName] = useState('');
  const [instaId, setInstaID] = useState('');
  const [shootdetails, setshootdetails] = useState('');
  const [leadsource, setleadsource] = useState('');
  const [salesperson, setsalesperson] = useState('');
  const [address, setaddress] = useState('');
  const [editexist, seteditexist] = useState(true);
  const [nextfollowupdate, setnextfollowupdate] = useState(new Date());
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
  const [communicationType, setcommunicationType] = useState('');
  const [externalMessage, setexternalMessage] = useState('');
  const [documentFile, setDocumentFile] = useState();
  const [internalMessage, setinternalMessage] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [adjustment, setAdjustment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loaderOpen, setLoaderOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [externalPrevComm, setexternalPrevComm] = useState([]);
  const [internalPrevComm, setInternalPrevComm] = useState([]);
  const discountRef = useRef(0);
  const adjustmentRef = useRef(0);
  const [enableFileUpload,setEnableFileUpload]= useState(false);
  const [downloadPDFURL, setDownloadPDFURL] = useState(undefined);
  const [unmounted, setunmounted] = useState(false);
  const addLead = async e => {
    let data = {
      name: customerName,
      sales_person: salesperson,
      phone: phoneNo,
      email: emailid,
      address,
      source: leadsource,
      event_type: selectedEvents,
      bride_name:brideName,
      groom_name:groomName
    };
    // console.log('addded is ', data);
    setLoaderOpen(true);
    for (const e of data.event_type) {
      e['event_id'] = Math.floor(Math.random() * 6) + 1;
    }
    let formdata = new FormData();
    for (const key in data) {
      if (key == 'event_type') {
        formdata.append(key, JSON.stringify(data[key]));
      } else {
        formdata.append(key, data[key]);
      }
    }
    let status = await Axios.post(`${baseURL}/${urls.createLead}`, formdata);
    if (status.data.success) {
      window.location.pathname = '/app/leads';
    } else {
      // alert(status.data.message);
      window.location.reload();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const getdefaultValues = async () => {
    try {
      let eventtypes = await Axios.get(`${baseURL}/${urls.getAllEvents}`);
      let evttypes = eventtypes.data.map(e => {
        return {
          event_id: e.id,
          name: e.name,
        };
      });
      setevents(evttypes);
      let salesusers = await Axios.get(`${baseURL}/${urls.getAllUsers}`);
      setsalespersons(salesusers.data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  };
  const setleadValues = () => {
    let { details } = props;
    setDownloadPDFURL(`${baseURL}/${urls.downloadquote}/${props.details.id}`);
    setcustomerName(details['name']);
    setPhoneNo(details['phone']);
    setphoneCode(leads.code[0].value);
    setwhatsappPhoneCode(leads.code[0].value);
    setwhatsappNo(details['phone']);
    setemailId(details['email']);
    setfbId(details['facebook']);
    setInstaID(details['instagram']);
    setshootdetails(details['shoot_details']);
    setaddress(details['address']);
    setsalesperson(details['sales_person']);
    setleadsource(details['source']);
    setbrideName(details['bride_name']);
    setgroomName(details['groom_name']);
    let leadsevents = details['events'] ? details['events'] : [];
    setSelectedEvents(leadsevents);
    // getPreviousCommuncations()
    // setevents([])
  };

  const getPreviousCommuncations = async type => {
    let id = props.details && props.details.project_id ? props.details.project_id.id : '';
    let getCommunications = await Axios.get(`${baseURL}/${urls.updateExternalCommunication}/${id}`);

    if (type) {
      switch (type) {
        case 'internal':
          getCommunications.data.data &&
            getCommunications.data.data.map(msg => {
              let arr = [...internalPrevComm];
              arr.push(msg);
              setInternalPrevComm(arr);
            });
          setinternalMessage('');
          break;
        case 'external':
          getCommunications.data.data &&
            getCommunications.data.data.map(msg => {
              let arr2 = [...externalPrevComm];
              arr2.push(msg);
              setexternalPrevComm(arr2);
            });
          setexternalMessage('');
          break;
        default:
          break;
      }
    } else {
      if (props.details && id) {
        getCommunications.data.data &&
          getCommunications.data.data.map(msg => {
            if (msg.type === 'internal') {
              setInternalPrevComm(oldArray => [...oldArray, msg]);
            } else {
              setexternalPrevComm(oldArray => [...oldArray, msg]);
            }
          });
        // type === 'external'
        //   ? setexternalPrevComm(getCommunications.data.data)
        //   : setInternalPrevComm(getCommunications.data.data);

        // console.log('getCommunications.data.data', getCommunications.data.data);
      }
    }
  };

  const externalCommunicate = async () => {
    if (!communicationType) {
      setOpen(true);
      setAlertMessage('Please select the communication type');
      return;
    }
    if (!externalMessage) {
      setOpen(true);
      setAlertMessage('Please enter the message');
      return;
    }
    setLoaderOpen(true);
    if(communicationType==='email'){
      let { id } = props.details.project_id;
      let data = {
        project_id: id,
        type: 'external',
        medium: communicationType,
        content: externalMessage
      };
      let formdata = new FormData();
      for (const key in data) {
        formdata.append(key, data[key]);
      }
      if(documentFile){
        formdata.append('attachment', documentFile);
      }
      let updateCommunication = await Axios.post(`${baseURL}/${urls.updateExternalCommunication}/${id}`, formdata);
      if (updateCommunication.data.message) {
        getPreviousCommuncations('external');
      }
    }

    let { id } = props.details.project_id;
    let data = {
      project_id: id,
      type: 'external',
      medium: communicationType,
      content: externalMessage,
    };
    let formdata = new FormData();
    for (const key in data) {
      formdata.append(key, data[key]);
    }
    let updateCommunication = await Axios.post(`${baseURL}/${urls.updateExternalCommunication}/${id}`, formdata);
    if (updateCommunication.data.message) {
      // window.location.reload(true);
      getPreviousCommuncations('external');
    }
    if (communicationType == 'whatsapp') {
      let whatsAppLink =
        'https://api.whatsapp.com/send/?phone=91' + whatsappNo + '&text=' + externalMessage + '&app_absent=0';
      //window.location.href = whatsAppLink;
      window.open(whatsAppLink, '_blank');
    }
    setexternalMessage('');
    setcommunicationType('');
    setLoaderOpen(false);
  };
  const internalCommunicate = async () => {
    // if (!communicationType) {
    //   setOpen(true);
    //   setAlertMessage('Please select the communication type');
    //   return;
    // }
    if (!internalMessage) {
      setOpen(true);
      setAlertMessage('Please enter the message');
      return;
    }
    setLoaderOpen(true);

    let { id } = props.details.project_id;
    let data = {
      project_id: id,
      type: 'internal',
      medium: 'message',
      content: internalMessage,
    };
    let formdata = new FormData();
    for (const key in data) {
      formdata.append(key, data[key]);
    }
    let updateCommunication = await Axios.post(`${baseURL}/${urls.updateExternalCommunication}/${id}`, formdata);
    if (updateCommunication.data.message) {
      // window.location.reload(true);
      getPreviousCommuncations('internal');
    }

    setLoaderOpen(false);
  };

  const editLead = async () => {
    let data = {
      name: customerName,
      sales_person: salesperson,
      phone: phoneNo,
      email: emailid,
      address,
      source: leadsource,
      bride_name: brideName,
      groom_name:groomName,
      next_follow_up: moment(nextfollowupdate).format('YYYY-MM-DD h:mm:ss'),
      events: selectedEvents,
      quote: {
        ...props.details.quote,
        base_price: basePrice,
        adjustment: adjustment,
        discount: discount,
        tax: 10,
        total_price: totalAmount,
      },
    };
    let totalevents = JSON.parse(JSON.stringify(selectedEvents));
    for (const event of props.details.events) {
      if (!totalevents.find(e => e.name == event.name)) {
        event.type = 'delete';
        totalevents.push(event);
      }
      let currentEvent = totalevents.find(e => e.name == event.name);
      for (const service of event.services) {
        if (!currentEvent.services && !currentEvent.services.find(e => e.name == service.name)) {
          service.type = 'delete';
          currentEvent.services.push(service);
        }
      }
    }
    data.events = totalevents;
    let formdata = new FormData();
    for (const key in data) {
      if (key === 'events' || key === 'quote') {
        formdata.append(key, JSON.stringify(data[key]));
      } else {
        formdata.append(key, data[key]);
      }
    }

    let updatedetails = await Axios.post(`${baseURL}/${urls.updateLeadDetails}/${props.details.id}`, formdata);
    if (updatedetails.data.success) {
      window.location.pathname = '/app/leads';
    } else {
      // alert(updatedetails.data.message);
      window.location.reload();
    }
  };
  const downloadPdf = async evt => {
    let { id } = props.details.project_id;
    evt.preventDefault();
    let pdfurl = await Axios.get(`${baseURL}/${urls.downloadquote}/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    // debugger;
    Axios.get(pdfurl.data.data, {
      headers: {
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

        'Access-Control-Allow-Origin': '*',
      },
    }).then(response => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quote_project_id-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  const generateQuotes = (type, value) => {
    if (type === 'discount') {
      discountRef.current = value;
    } else {
      adjustmentRef.current = value;
    }
    // console.log('quotes', discountRef.current, adjustmentRef.current);
    let totalPrice = basePrice;
    let total_amount = basePrice;
    // totalPrice = (totalPrice * props.details.quote.tax) / 100;
    // total_amount = basePrice + totalPrice;
    total_amount = total_amount - discountRef.current - adjustmentRef.current;
    setTotalAmount(total_amount);
  };

  const handleEvents = async (list, reason, element) => {
    if (reason === 'remove-option') {
      // console.log('removed', element.option, selectedEvents);
      selectedEvents.filter(sl => {
        if (sl.event_id === element.option.event_id) {
          sl.action = 'DELETED';
        }
      });
      // console.log('selectedEvents', selectedEvents);
      setSelectedEvents(selectedEvents);
    }
    let currentEvents = selectedEvents;
    if (reason === 'select-option') {
      if (!currentEvents.find(e => e.name === element.option.name)) {
        setSelectedEvents(list);
      }
    } else {
      setSelectedEvents(list);
    }
  };

  useEffect(() => {
    getdefaultValues();
  }, []);

  useEffect(() => {
    if(communicationType =='email'){
      console.log(enableFileUpload);
      setEnableFileUpload(true);
    }else{
      setEnableFileUpload(false);
    }

  }, [communicationType]);

  useEffect(() => {
    if (props.details) {
      setleadValues();
      getPreviousCommuncations();
    }
  }, [props && props.details]);

  useEffect(() => {
    console.log('baseprice', basePrice);
    if (props.edit && props.details.quote) {
      // let totalPrice = (basePrice * props.details.quote.tax) / 100;

      // setTotalAmount(basePrice + totalPrice);
      setTotalAmount(basePrice);
      setDiscount(props.details.quote.discount);
      setAdjustment(props.details.quote.adjustment);
    }
  }, [basePrice]);
  const handleSetBasePrice = total => {
    console.log('basePrice', total);
    setBasePrice(total);
  };
  useEffect(() => {
    // console.log('selected', selectedEvents);
    setSelectedEvents(selectedEvents);
  }, [setSelectedEvents]);

  let handleEmailAttachments=(event)=>{
      let file = event.target.files[0];
      // var formData = new FormData(event.target.files[0]);

      setDocumentFile(file);
      /* if (formData) {
          
          setDocumentFile(formData);
        } */
      
  }
  return (
    <PageContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
      <GridContainer>
        <Backdrop className={classes.backdrop} open={loaderOpen} >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid item xs={12} sm={12}>
          <CmtCard>
            <CmtCardContent className={classes.cardContentRoot}>
              <Box pb={{ xs: 6, md: 10, xl: 16, mt: 4 }}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (props.edit) {
                      editLead();
                    } else {
                      addLead();
                    }
                  }}>
                  <GridContainer style={{ margin: 'auto' }}>
                    <Grid item xs={12} sm={3}>
                      {props.edit && (
                        <GridContainer>
                          <Grid sm={4}>Id:</Grid>
                          <Grid sm={8}>{props.details && props.details.id}</Grid>
                          <Grid sm={4}>Created On:</Grid>
                          <Grid sm={8}>{props.details && new Date(props.details.created_at).toLocaleString()}</Grid>
                        </GridContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      {props.edit && (
                        <GridContainer>
                          <Grid sm={4} alignContent="center">
                            Status:
                          </Grid>
                          <Grid sm={8}>
                            {props.details && props.details.project_id && props.details.project_id.current_status}
                          </Grid>
                        </GridContainer>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} justify="flex-end" container>
                      {props.edit && props.details && (
                        // <Button variant="contained" color="primary" target="_blank" href={downloadPDFURL}>
                        //   Download Quote
                        // </Button>
                        <Button variant="contained" disabled={props.details && props.details?.project_id?.current_status!=="QUOTEFINAL"} color="primary" onClick={() => generate_pdf(props.details.project_id, 'Quote-PDF', setLoaderOpen) }>
                          Download Quote
                        </Button>
                      )}
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={4}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="Customer Name"
                          margin="normal"
                          type="text"
                          required
                          error={!customerName}
                          disabled={props.edit && !editexist}
                          size="small"
                          value={customerName}
                          onChange={e => setcustomerName(e.target.value)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={1}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          select
                          label="Code"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          value={phoneCode}
                          disabled={props.edit && !editexist}
                          onChange={e => setphoneCode(e.target.value)}>
                          {currencies.map((option, index) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        variant="outlined"
                        label="Phone Number"
                        margin="normal"
                        type="number"
                        size="small"
                        required
                        disabled={props.edit && !editexist}
                        fullWidth
                        value={phoneNo}
                        onChange={e => setPhoneNo(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          select
                          label="Code"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          disabled={props.edit && !editexist}
                          required
                          value={whatsappPhoneCode}
                          onChange={e => setwhatsappPhoneCode(e.target.value)}>
                          {currencies.map((option, index) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        variant="outlined"
                        label="Whatsapp Number"
                        margin="normal"
                        type="number"
                        size="small"
                        required
                        disabled={props.edit && !editexist}
                        fullWidth
                        value={whatsappNo}
                        onChange={e => setwhatsappNo(e.target.value)}
                      />
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={4}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="Email Id"
                          margin="normal"
                          type="text"
                          //   fullWidth
                          required
                          disabled={props.edit && !editexist}
                          size="small"
                          value={emailid}
                          onChange={e => setemailId(e.target.value)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        variant="outlined"
                        label="FB ID"
                        margin="normal"
                        type="text"
                        size="small"
                        disabled={props.edit && !editexist}
                        fullWidth
                        value={fbId}
                        onChange={e => setfbId(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        variant="outlined"
                        label="Insta ID"
                        margin="normal"
                        type="text"
                        size="small"
                        disabled={props.edit && !editexist}
                        fullWidth
                        value={instaId}
                        onChange={e => setInstaID(e.target.value)}
                      />
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={12}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="Shoot details"
                          margin="normal"
                          type="text"
                          multiline
                          disabled={props.edit && !editexist}
                          rows={4}
                          //   fullWidth
                          size="small"
                          value={shootdetails}
                          onChange={e => setshootdetails(e.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={12}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="Address of the Customer"
                          margin="normal"
                          type="text"
                          disabled={props.edit && !editexist}
                          multiline
                          rows={4}
                          //   fullWidth
                          size="small"
                          value={address}
                          required
                          onChange={e => setaddress(e.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={6}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          select
                          label="Lead Source"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          disabled={props.edit && !editexist}
                          required
                          value={leadsource}
                          onChange={e => {
                            setleadsource(e.target.value);
                          }}>
                          {leadsources.map((option, index) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          select
                          label="Sales Person"
                          variant="outlined"
                          size="small"
                          required
                          margin="normal"
                          value={salesperson}
                          disabled={props.edit && !editexist}
                          onChange={e => {
                            setsalesperson(e.target.value);
                          }}>
                          {salespersons.map((option, index) => (
                            <MenuItem key={option.name} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                  </GridContainer>
                  <GridContainer>
                  <Grid item xs={12} sm={6}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              variant="outlined"
              label="Bride Name"
              margin="normal"
              type="text"
              //   fullWidth
              required
              disabled={props.edit && !editexist}
              size="small"
              value={brideName}
              onChange={e => {
                setbrideName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl style={{ width: '100%' }} variant="outlined">
            <TextField
              variant="outlined"
              label="Groom Name"
              margin="normal"
              type="text"
              required
              //   fullWidth
              size="small"
              disabled={props.edit && !editexist}
              value={groomName}
              onChange={e => {
                setgroomName(e.target.value);
              }}
            />
          </FormControl>
        </Grid>
        </GridContainer>
                  <GridContainer>
                    <Grid item xs={12} sm={12}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          required
                          options={events}
                          value={selectedEvents}
                          disabled={props.edit && !editexist}
                          onChange={(event, newValue, reason, detail) => {
                            handleEvents(newValue, reason, detail);
                            // setSelectedEvents(newValue);
                          }}
                          getOptionLabel={option => option.name}
                          filterSelectedOptions
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="outlined"
                              label="Choose Event Type"
                              placeholder="Events"
                              size="small"
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </GridContainer>
                </form>
              </Box>
              {selectedEvents && selectedEvents.length > 0 ? (
                selectedEvents.map(event => {
                  return (
                    <AddEvents
                      event={event}
                      selectedEvents={selectedEvents}
                      setSelectedEvents={setSelectedEvents}
                      edit={props.edit}
                      editexist={editexist}
                      setBasePrice={handleSetBasePrice}
                      setTax={setTax}
                    />
                  );
                })
              ) : (
                <AddEvents
                  event=""
                  selectedEvents={[]}
                  setSelectedEvents={setSelectedEvents}
                  edit={false}
                  empty={true}
                  editexist={editexist}
                  setBasePrice={handleSetBasePrice}
                  setTax={setTax}
                />
              )}
              {props.edit && editexist && (
                <Box>
                  <GridContainer>
                    <Grid item xs={12} sm={3}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="₹  Base Amount"
                          margin="normal"
                          type="text"
                          required
                          // error={!basePrice}
                          disabled={props.edit && !editexist}
                          size="small"
                          value={basePrice}
                          onChange={e => setBasePrice(e.target.value)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <FormControl style={{ width: '100%' }} variant="outlined">
                        <TextField
                          variant="outlined"
                          label="₹  Discount"
                          margin="normal"
                          type="text"
                          required
                          // error={!discount}
                          disabled={props.edit && !editexist}
                          size="small"
                          fullWidth
                          value={discount}
                          onChange={e => {
                            setDiscount(e.target.value);
                            generateQuotes('discount', e.target.value);
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        variant="outlined"
                        label="₹  Adjustment"
                        margin="normal"
                        type="number"
                        size="small"
                        required
                        disabled={props.edit && !editexist}
                        fullWidth
                        value={adjustment}
                        onChange={e => {
                          setAdjustment(e.target.value);
                          generateQuotes('adjustment', e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        variant="outlined"
                        label="₹  Total Amount"
                        margin="normal"
                        type="number"
                        size="small"
                        required
                        disabled={true}
                        fullWidth
                        value={totalAmount}
                        // onChange={e => setTotalAmount(e.target.value)}
                      />
                    </Grid>
                  </GridContainer>
                  <p>18% GST will be applied</p>
                </Box>
              )}
              <GridContainer>
                <Grid item xs={12} justify="flex-end" container>
                  {props.edit && editexist && (
                    <Button variant="contained" color="primary" onClick={editLead}>
                      Save
                    </Button>
                  )}

                  {!props.edit && (
                    <Button variant="contained" color="primary" type="submit" onClick={addLead}>
                      Create
                    </Button>
                  )}
                  <Button href="/app/leads">Back</Button>
                </Grid>
              </GridContainer>
            </CmtCardContent>
          </CmtCard>
        </Grid>
      </GridContainer>

      {props.edit && (
        <div>
          <GridContainer>
            <Grid item xs={12} sm={12}>
              <CmtCard>
                <CmtCardContent className={classes.cardContentRoot}>
                  <Box pb={{ xs: 6, md: 10, xl: 16, mt: 4 }}>
                    <Box>
                      <GridContainer style={{ margin: 'auto' }}>
                        <Grid items xs={6}>
                          <h4>External Communication</h4>
                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="type"
                              name="type"
                              value={communicationType}
                              onChange={e => {
                                setcommunicationType(e.target.value);
                              }}>
                              <FormControlLabel value="email" control={<Radio />} label="Email" />
                              <FormControlLabel value="whatsapp" control={<Radio />} label="Whatsapp" />
                              {/* <FormControlLabel value="none" control={<Radio />} label="None" /> */}
                            </RadioGroup>
                          </FormControl>
                          {enableFileUpload && 
                          <Grid items md={6} xs={3} sm={3}>
                          <input
                            accept="image/*"
                            id="raised-button-file"
                            type="file"
                            name="document"
                            onChange={handleEmailAttachments}
                          />
                          {/* <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary">
                              Upload
                            </Button>
                          </label>  */}
                          </Grid>}
                          
                          <FormControl style={{ width: '90%' }} variant="outlined">
                            <TextField
                              variant="outlined"
                              label="Message"
                              margin="normal"
                              type="text"
                              multiline
                              disabled={props.edit && !editexist}
                              rows={4}
                              //   fullWidth
                              size="small"
                              value={externalMessage}
                              onChange={e => setexternalMessage(e.target.value)}
                            />
                          </FormControl>
                          <div>
                            <Button variant="contained" color="primary" onClick={externalCommunicate}>
                              Send
                            </Button>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          {/* <h2>Past Communications</h2> internalPrevComm */}
                          <CommunicationList data={externalPrevComm} title="External Communications" />
                        </Grid>
                      </GridContainer>
                    </Box>
                  </Box>
                </CmtCardContent>
              </CmtCard>
            </Grid>
          </GridContainer>

          <GridContainer>
            <Grid item xs={12} sm={12}>
              <CmtCard>
                <CmtCardContent className={classes.cardContentRoot}>
                  <Box pb={{ xs: 6, md: 10, xl: 16, mt: 4 }}>
                    <Box>
                      <GridContainer style={{ margin: 'auto' }}>
                        <Grid item xs={6}>
                          <Grid>
                            <h4>Internal Communication</h4>
                            <FormControl style={{ width: '90%' }} variant="outlined">
                              <TextField
                                variant="outlined"
                                label="Message"
                                margin="normal"
                                type="text"
                                multiline
                                disabled={props.edit && !editexist}
                                rows={4}
                                //   fullWidth
                                size="small"
                                value={internalMessage}
                                onChange={e => setinternalMessage(e.target.value)}
                              />
                            </FormControl>
                            <div>
                              <Button variant="contained" color="primary" onClick={internalCommunicate}>
                                Send
                              </Button>
                            </div>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          {/* externalPrevComm */}
                          <CommunicationList data={internalPrevComm} title="Internal Communications" />
                        </Grid>
                      </GridContainer>
                    </Box>
                  </Box>
                </CmtCardContent>
              </CmtCard>
            </Grid>
          </GridContainer>
        </div>
      )}
    </PageContainer>
  );
};

export default AddLead;
