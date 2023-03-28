import React, { useState, useContext } from "react";
import style from "./SignIn.module.css";
import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment } from "@mui/material";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import ServerURL from "../../utils/ServerURL";
import { AuthContext } from "../../App";

const SignIn = () => {
  const { username, setUsername } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/user/login`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (result.status === 200) {
        const data = await result.json();
        setUsername(data.details.username);
        window.localStorage.setItem("username", data.details.username);
        navigate("/");
      } else {
        alert("Invalid Credentials");
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
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
