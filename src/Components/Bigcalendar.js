import React, {useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

export default function Bigcalendar(props) {

    const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => {
        setEvents(
            data.map(event => ({
              start: new Date(event.date),
              end: new Date(moment(event.date).add(event.duration, "minutes")),
              firstname: event.customer.firstname,
              lastname: event.customer.lastname,
              title: event.activity}))
            )
        })
  }

   
        
        return (
            <div>
        <Calendar
          popup
          events={events}
          defaultView='month'
          showMultiDayTimes
          style={{ height: "700px" }}
          defaultDate={new Date()}
          onSelectEvent={event => alert("Activity: " + event.title + "\n" + "Starts: "  + moment(event.start).format('LLL') + "\n" + "Ends: " + moment(event.end).format('LLL') + "\n" + "Customer: " +  event.firstname + " " + event.lastname )}
          localizer={localizer}
        />
          </div>
        );
      
    
};
