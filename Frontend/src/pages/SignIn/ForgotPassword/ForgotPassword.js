import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import style from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  return (
    <>
      <h1>Reset Your Password</h1>
      <div className={style.container}>
        <div className={style.reset}>
          <TextField
            id="outlined-password-input"
            label="Please enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>Send Link</Button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
