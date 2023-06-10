import React, { useEffect, useState, useContext } from "react";
import style from "./Profile.module.css";
import { Button, MenuItem } from "@mui/material";
import Server_URL from "../../utils/ServerURL";
import { AuthContext } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
  const username = window.localStorage.getItem("username");

  const navigate = useNavigate();
  const { googleUser } = useContext(AuthContext);

  const getUserBlogs = async () => {
    try {
      const response = await fetch(`${Server_URL}/user/getSavedBlogs`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: window.localStorage.getItem("email"),
          googleUser: `${googleUser}`,
        }),
      });
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (blogId) => {
    const res = await fetch(`${Server_URL}/user/deleteBlog`, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
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
      <h2>{`Welcome to your profile : ${username}`}</h2>
      <div className={style.userdata}>
        <div className={style.blogs}>
          <h2
            style={{
              textAlign: "center",
            }}
          >
            My Blogs
          </h2>
          <div>
            {blogs?.map((blog) => {
              return (
                <div className={style.myBlogs}>
                  <MenuItem
                    key={blog._id}
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
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    S
                  >
                    {blog.title}
                  </MenuItem>
                  <DeleteIcon
                    onClick={() => {
                      deleteBlog(blog._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
