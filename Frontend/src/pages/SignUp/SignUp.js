import React, { useState } from "react";
import style from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import ServerURL from "../../utils/ServerURL";
import { toast } from "react-toastify";
import { Button, Input, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Password and Confirm Password must be same", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
      return;
    }

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
      if (result.status === 200) {
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/signIn");
        toast("You are successfully registered!", {
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
        toast("Please Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "info",
          theme: "colored",
        });
      }
      if (result.status === 500) {
        toast("User Already Exists", {
          position: "top-center",
          autoClose: 5000,
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
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "center" }} variant="h2">
          SignUp
        </Typography>
        <TextField
          id="outlined-username-input"
          label="Username"
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          placeholder="Enter Email"
          inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormControl sx={{ m: 1, width: "27ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "27ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-cpassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-cpassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button variant="contained" className={style.button} type="submit">
          Sign Up
        </Button>
        <Button variant="contained" className={style.button}>
          Sign In with Google
        </Button>
        <Link to="/signIn" className={style.link}>
          Already have an account? Sign In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
