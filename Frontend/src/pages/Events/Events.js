import style from "./Events.module.css";
import Header from "../../components/Header/Header";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Tooltip from "@mui/material/Tooltip";
import GoogleCalendar from "react-google-calendar-api";
import { useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);

  // const addEvent = (event) => {
  // const { calendarId } = useGoogleCalendar();

  // const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     Content-Type: 'application/json',
  //   },
  //   body: JSON.stringify(event),
  // });

  //   if (response.status === 200) {
  //     const event = await response.json();
  //     setEvents([...events, event]);
  //   }
  // };

  return (
    <div className={style.events}>
      <Header />
      <div className={style.header}>
        <h1>Contest</h1>
      </div>
      <div className={style.contest}>
        <div className={style.contestCard}>
          <div className={style.contestCard__title}>
            <h3>Weekly Contest</h3>
            <div>
              <Tooltip title="Add To Calender">
                <CalendarMonthRoundedIcon
                  onClick={() =>
                    (window.location.href = "https://calendar.google.com/")
                  }
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
              {/* <GoogleCalendar
                calenderId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                events={events}
                // onEventAdded={addEvent}
              /> */}
              <button
              // onClick={() =>
              //   addEvent({
              //     title: "My Event",
              //     start: new Date("2023-06-01T10:00:00"),
              //     end: new Date("2023-06-01T11:00:00"),
              //   })
              // }
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
