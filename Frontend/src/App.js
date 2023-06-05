import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Blogs from "./pages/Blogs/Blogs";
import Compiler from "./pages/Compiler/Compiler";
import Events from "./pages/Events/Events";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CreateBlog from "./pages/Blogs/CreateBlog/CreateBlog";
import Practice from "./pages/Practice/Practice";
import Contests from "./pages/Contests/Contests";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { createContext, useState } from "react";
import CompleteBlog from "./pages/Blogs/CompleteBlog/CompleteBlog";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ForgotPassword from "./pages/SignIn/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/SignIn/ResetPassword/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DarkTheme, LightTheme } from "./utils/theme.js";
import Profile from "./pages/Profile/Profile";

export const AuthContext = createContext(null);

function App() {
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [googleUser, setGoogleUser] = useState(false);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
        <CssBaseline />
        <AuthContext.Provider
          value={{
            username,
            setUsername,
            darkMode,
            setDarkMode,
            googleUser,
            setGoogleUser,
          }}
        >
          <ToastContainer />
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/practice" element={<Practice />} />
              <Route exact path="/contests" element={<Contests />} />
              <Route exact path="/blogs" element={<Blogs />} />
              <Route exact path="/blogs/createBlog" element={<CreateBlog />} />
              <Route exact path="/blog/:id" element={<CompleteBlog />} />
              <Route exact path="/compiler" element={<Compiler />} />
              <Route exact path="/events" element={<Events />} />
              <Route exact path="*" element={<PageNotFound />} />
              <Route exact path="/signIn" element={<SignIn />} />
              <Route
                exact
                path="/forgotPassword"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/resetPassword/:id/:token"
                element={<ResetPassword />}
              />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
