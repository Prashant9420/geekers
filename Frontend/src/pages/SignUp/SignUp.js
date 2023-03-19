import React, { useState } from "react";
import style from "./SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSignUp =() =>{
    navigate(`${"/signin"}`);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(name);
    console.log(password);
  };
  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>SignUp</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
          onChange={handleChangeName}
          startAdornment={
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
          onChange={handleChangePassword}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          }
        />
         <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Re-Enter your password"
          required
          onChange={handleChangePassword}
          startAdornment={
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <LockIcon />
            </InputAdornment>
          }
        />
        <button className={style.button} type="submit">
          Sign Up
        </button>
        <p>
          Already a User <button onClick={handleSignUp}>Sign In</button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

