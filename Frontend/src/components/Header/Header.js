import React, { useState } from "react";
import style from "./Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import logo from "./logo2.jpg";

const Header = () => {
  const navigate = useNavigate();
  const links = ["Practice", "Contests", "Events", "Compiler", "Blogs"];
  const [mode, setMode] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleClick = (index) => {
    navigate(`/${links[index].toLowerCase()}`);
  };

  const handleMode = () => {
    console.log("mode");
    setMode(!mode);
    setTheme(theme === "light" ? setTheme("dark") : setTheme("light"));
  };

  const handleSignIn = () => {
    navigate(`/${"signin"}`);
  };

  return (
    <>
      <div className={style.header} id={style.theme}>
        <div className={style.topLeft}>
          <div className={style.logo}>
            <h3>Geekers</h3>
            <img src={logo} alt="" />
          </div>
          <HomeIcon cursor="pointer" />
        </div>
        <div className={style.topCenter}>
          <ul className={style.pages}>
            {links.map((link, index) => {
              return (
                <li key={index} onClick={() => handleClick(index)}>
                  {link}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.topRight}>
          <div className={style.mode}>
            {mode ? (
              <LightModeIcon fontSize="small" onClick={handleMode} />
            ) : (
              <DarkModeIcon fontSize="small" onClick={handleMode} />
            )}
          </div>
          <div className={style.searchBar}>
            <Input
              type="text"
              placeholder="Search..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className={style.searchIcon} />
                </InputAdornment>
              }
            />
          </div>
          <div className={style.buttons}>
            <button onClick={handleSignIn} className={style.button}>
              SignIn
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
