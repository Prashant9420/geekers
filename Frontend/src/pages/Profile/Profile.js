import React, { useEffect, useState, useContext } from "react";
import style from "./Profile.module.css";
import { MenuItem } from "@mui/material";
import Server_URL from "../../utils/ServerURL";
import { AuthContext } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header/Header";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const username = window.localStorage.getItem("username");

  const { googleUser } = useContext(AuthContext);
  const getUserBlogs = async () => {
    const res = await fetch(`${Server_URL}/user/getSavedBlogs`, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: window.localStorage.getItem("userId"),
        googleUser,
      }),
    });
    const data = await res.json();
    setBlogs(data);
  };

  const deleteBlog = async (blogId) => {
    console.log(blogId);
    const res = await fetch(`${Server_URL}/user/deleteBlog`, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: window.localStorage.getItem("userId"),
        blogId: blogId,
        googleUser,
      }),
    });
    getUserBlogs();
  };
  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className={style.container}>
      <Header />
      <h1>Profile</h1>
      <h2>{username}</h2>
      <div className={style.userdata}>
        <div className={style.blogs}>
          <h2>My Blogs</h2>
          <div>
            {blogs?.map((blog, index) => {
              return (
                <MenuItem
                  key={index}
                  value={blog.title}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "25rem",
                    height: "5rem",
                    borderBottom: "2px solid",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {blog.title}
                  <DeleteIcon onClick={() => deleteBlog(blog._id)} />
                </MenuItem>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
