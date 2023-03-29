import React, { useState } from "react";
import style from "./SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ServerURL from "../../utils/ServerURL";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });
      // const data = await result.json();
      // console.log(data);
      if (result.status === 200) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/signIn");
        alert(
          "User created successfully! Now Please Login to access your account"
        );
      }
      if (result.status === 500) {
        alert("User Already Exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>SignUp</h1>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          name="text"
          id="userName"
          value={username}
          placeholder="Enter your username"
          required
          onChange={(e) => setUsername(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          }
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          placeholder="Re-Enter your password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={style.button} type="submit">
          Sign Up
        </button>
        <button className={style.button}>Sign In with Google</button>
        <Link to="/signIn" className={style.link}>
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
