import React, { useState } from "react";
import style from "./SignIn.module.css";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@mui/material";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import ServerURL from "../../utils/ServerURL";

const SignIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/user/getAllUsers`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        if (user.email === name && user.password === password) {
          alert("User Logged In Successfully");
          navigate("/");
          break;
        }
        if (i === data.length - 1) {
          alert("Invalid Credentials");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <h1 className={style.title}>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={handleChangeName}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={handleChangePassword}
          />
          <button className={style.button} type="submit">
            Login
          </button>
          <a href="/forgotPasssword">Forgot Password</a>
          <Link to={"/signUp"}> Don't have an account? Sign Up </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
