import React, { useState, useContext } from "react";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../App";
import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import { Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { googleLogout } from "@react-oauth/google";
import { useMediaQuery, useTheme } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(AuthContext);
  const pages = ["Practice", "Contests", "Events", "Compiler", "Blogs"];
  const settings = ["Profile", "Account", "Dashboard"];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (index) => {
    navigate(`/${pages[index].toLowerCase()}`);
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSignIn = () => {
    navigate(`/${"signin"}`);
  };

  const handleLogout = async () => {
    googleLogout();
    navigate("/");
    window.localStorage.removeItem("avatar");
    window.localStorage.removeItem("username");
    window.location.reload();
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <img src={logo} alt="Not Found" /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            GEEKERS
          </Typography>
          <HomeIcon
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 5,
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          />
          {isMobile ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    onClick={(handleCloseNavMenu, () => handleClick(index))}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={(handleCloseNavMenu, () => handleClick(index))}
                  sx={{ mx: 2, my: 2, display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            className="headerName"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Montserrat",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GEEKERS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={(handleCloseNavMenu, () => handleClick(index))}
                sx={{ mx: 2, my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div className={style.mode}>
            {darkMode ? (
              <LightModeIcon fontSize="small" onClick={handleDarkMode} />
            ) : (
              <DarkModeIcon fontSize="small" onClick={handleDarkMode} />
            )}
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                className={style.avatar}
                onClick={handleOpenUserMenu}
                sx={{ p: 0, mx: 2 }}
              >
                {window.localStorage?.getItem("username") ? (
                  window.localStorage?.getItem("avatar") ? (
                    <Avatar
                      className={style.avatar}
                      onClick={handleOpenUserMenu}
                      src={window.localStorage?.getItem("avatar").toString()}
                      alt="G"
                    />
                  ) : (
                    <Avatar>
                      {window.localStorage
                        ?.getItem("username")
                        .charAt(0)
                        .toUpperCase()}
                    </Avatar>
                  )
                ) : (
                  <Avatar>
                    <AccountCircleIcon color="info" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            {!window.localStorage?.getItem("username") ? (
              <Button variant="contained" color="info" onClick={handleSignIn}>
                Sign In
              </Button>
            ) : (
              <Button variant="contained" color="info" onClick={handleLogout}>
                Logout
              </Button>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
