import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import TransitionsModal from "../../../routes/Components/MuiComponents/Modal/demo/TransitionsModal";
import { baseURL, urls } from '../../../services/auth/jwt/config';
import axios from 'axios';
const localizer = momentLocalizer(moment);
const DateComponent = (props) => {
    if (props.data.selectedDate){
        return <h1>{props.data.selectedDate.toDateString()}</h1>
    } 
       return null
    
}

export default function MyCalendar() {
    const [events, setEvent] = React.useState([]);
    const [modalStatus, setModalStatus] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    React.useEffect(() => {
        const getCalendarData = async () => {
            try {
                const response = await axios.get(`${baseURL}/${urls.getThisMonth}`);
                const events = response.data.map(res => {
                    return {
                        title: "Un available",
                        start: new Date(res.unavailable_date),
                        allDay: false,
                        end: new Date(res.unavailable_date)
                    }
                })
                setEvent(events)
            } catch (e) {
                console.log(e);
            }
        };
        getCalendarData();
    }, []);
    function eventStyleGetter() {
        const backgroundColor = '#' + "FFFF00";
        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }
    async function handleOnOk() {
        // this.setState({showModal:false})
        setModalStatus(false)
        const user=JSON.parse(localStorage.getItem("user"));
	let dateString=new Date(Date.parse(modalData.selectedDate));

        const body = {
            employee_id: user.id,
            unavailable_date:new Date(dateString.setDate(dateString.getDate()+1))
        }
        await axios.post(`${baseURL}/${urls.setDate}`, body);
        const getThisMonthRes = await axios.get(`${baseURL}/${urls.getThisMonth}`);
        const events = getThisMonthRes.data.map(res => {
            return {
                title: "Un Available",
                start: new Date(res.unavailable_date),
                allDay: false,
                end: new Date(res.unavailable_date)
            }
        })
        setEvent(events)
        
    }
    function handleCancel() {
        setModalStatus(false)
        console.log("onCancel");
    }
    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                selectable={true}
                events={events}
                onSelectSlot={data => {
		console.log('start_date',data);
                    // this.setState({ showModal: true, modalData: { selectedDate: data.start } });
                    setModalStatus(true);
                    setModalData({ selectedDate: data.start});
                }}
                step={60}
                view='month'
                views={['month']}
                // min={new Date(2018, 0, 1, 8, 0)}
                // max={new Date(2018, 0, 1, 17, 0)}
                // date={new Date(2018, 0, 1)}
                eventPropGetter={(eventStyleGetter)}
            />
            {modalStatus && (
                <TransitionsModal active={modalStatus} onClose={handleCancel} onOk={handleOnOk} formValues={modalData} component={DateComponent} />
            )}
        </div>
    )
}

