import React from "react";
import style from "./Profile.module.css";

const Profile = () => {
  const username = window.localStorage.getItem("username");
  return (
    <div className={style.container}>
      <h1>Profile</h1>
      <h2>{username}</h2>
      <div className={style.userdata}>
        <div className={style.blogs}>
          <h2>My Blogs</h2>
        </div>
        <div className={style.codes}>
          <h2>Saved Codes</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
