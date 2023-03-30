import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import { Typography, TextField, Button } from "@mui/material";
import ServerURL from "../../../utils/ServerURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/user/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: props.email,
          password,
          otp,
        }),
      });
      if (result.status === 200) {
        navigate("/signIn");
        toast("Password reset successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success",
          theme: "colored",
        });
      } else {
        toast("Password reset failed!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Typography sx={{ fontSize: "3rem", fontWeight: "bold" }}>
        Reset Password
      </Typography>
      <TextField
        label="OTP"
        type="text"
        value={otp}
        maxLength="6"
        onChange={(e) => setOtp(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPassword;
