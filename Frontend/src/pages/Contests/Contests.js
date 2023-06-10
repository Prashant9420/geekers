import style from "./Contests.module.css";
import Header from "../../components/Header/Header";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const Contests = () => {
  const handleAddEvent = () => {
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      "Weekly Contest"
    )}&dates=${encodeURIComponent(
      "20221010T010000Z/20221010T020000Z"
    )}&details=${encodeURIComponent(
      "Weekly Contest"
    )}&location=${encodeURIComponent(
      "https://geekers.vercel.app/contests"
    )}&sf=true&output=xml`;
    window.open(calendarUrl, "_blank");
  };

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
                  onClick={handleAddEvent}
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;
