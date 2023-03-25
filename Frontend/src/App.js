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

export const ThemeContext = createContext(null);

function App() {
  const [mode, setMode] = useState("dark");
  // const toggleMode = () => {
  //   setMode(mode === "light" ? setMode("dark") : setMode("light"));
  // };

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <div id={mode}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/practice" element={<Practice />} />
            <Route exact path="/contests" element={<Contests />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route exact path="/blogs/createBlog" element={<CreateBlog />} />
            <Route exact path="/compiler" element={<Compiler />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="*" element={<PageNotFound />} />
            <Route exact path="/signIn" element={<SignIn />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/blog/:id" element={<CompleteBlog />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
