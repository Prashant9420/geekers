import React from "react";
import style from './Contests.module.css';
import Header from "../../components/Header/Header";

const Contests = () => {
  return (
    <div className={style.contests}>
      <Header />
      <h1>Contests</h1>
    </div>
  );
};

export default Contests;
