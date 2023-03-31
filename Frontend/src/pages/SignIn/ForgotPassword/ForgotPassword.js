import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import style from "./ForgotPassword.module.css";
import ServerURL from "../../../utils/ServerURL";
import { toast } from "react-toastify";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/user/forgotPassword`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (result.status === 200) {
        setResetForm(true);
        toast("Please check your email for the OTP!", {
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
        toast("Please enter a valid email address!", {
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
    <>
      {!resetForm ? (
        <>
          <Button
            onClick={() => navigate("/signIn")}
            variant="outlined"
            sx={{ margin: "1rem" }}
          >
            Back
          </Button>
          <form onSubmit={handleSubmit} className={style.form}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Enter Your Email
            </Typography>
            <TextField
              id="outlined-password-input"
              sx={{ width: "20rem", margin: "1rem" }}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Send OTP
            </Button>
          </form>
        </>
      ) : (
        <ResetPassword email={email} />
      )}
    </>
  );
};

export default ForgotPassword;
