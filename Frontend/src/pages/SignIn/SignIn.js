import React, { useState, useContext } from "react";
import style from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import ServerURL from "../../utils/ServerURL";
import { AuthContext } from "../../App";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const SignIn = () => {
  const { username, setUsername } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, sub, email } = decoded;
    const googleUser = {
      name,
      email,
      avatar: picture,
      googleId: sub,
    };

    const result = await fetch(`${ServerURL}/user/googleLogin`, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleUser),
    });
    if (result.status === 200) {
      const data = await result.json();
      window.localStorage.setItem("userId", data._id);
      window.localStorage.setItem("username", data.name);
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("avatar", data.avatar);
      navigate("/");
      toast("You are successfully logged in!", {
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
      toast("Invalid Credentials!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
  };

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
        window.localStorage.setItem("userId", data.details._id);
        window.localStorage.setItem("username", data.details.username);
        window.localStorage.setItem("email", data.details.email);
        navigate("/");
        toast("You are successfully logged in!", {
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
        toast("Invalid Credentials!", {
          position: "top-center",
          autoClose: 3000,
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
      <Button onClick={() => navigate("/")} variant="outlined">
        Home
      </Button>
      <div className={style.container}>
        <form className={style.form} onSubmit={handleSubmit}>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
            marginBottom="2rem"
            variant="h3"
          >
            SignIn
          </Typography>
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            pattern="^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              width: "13.8rem",
              border: "1px solid  ",
            }}
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
              sx={{
                width: "13.8rem",
                marginBottom: "2rem",
                border: "1px solid  ",
              }}
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
          <Button
            variant="contained"
            className={style.button}
            onClick={handleSubmit}
            type="submit"
            sx={{ width: "13.8rem" }}
          >
            Login
          </Button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              createOrGetUser(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <Link to={"/forgotPassword"} className={style.link}>
            Forgot Password
          </Link>
          <Link to={"/signUp"} className={style.link}>
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
