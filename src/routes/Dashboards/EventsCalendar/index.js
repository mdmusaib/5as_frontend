import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { baseURL, urls } from '../../../services/auth/jwt/config';
import axios from 'axios';
const localizer = momentLocalizer(moment);

export default function TaskCalendarComponent() {
    const [events, setEvent] = React.useState([]);
    
    React.useEffect(() => {
        const getCalendarData = async () => {
            try {
                const response = await axios.get(`${baseURL}/${urls.fetchEachEmployeeTask}`);
                const events = response.data.map(res => {
                    return {
                        title: `${res.employee?.name}-${res.service?.name}-${res.event?.name}`,
                        start: new Date(res.available_date),
                        allDay: false,
                        end: new Date(res.available_date)
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
    
    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                selectable={true}
                events={events}
               
                step={60}
                view='month'
                views={['month']}
                // min={new Date(2018, 0, 1, 8, 0)}
                // max={new Date(2018, 0, 1, 17, 0)}
                // date={new Date(2018, 0, 1)}
                eventPropGetter={(eventStyleGetter)}
            />
          
        </div>
    )
}

