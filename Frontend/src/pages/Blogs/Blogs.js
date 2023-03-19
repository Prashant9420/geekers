import style from "./Blogs.module.css";
import Blog from "./Blog/Blog";
import Header from "../../components/Header/Header";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Blogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await fetch("http://localhost:8000/api/blog/");
      const data = await res.json();
      setBlogs(data);
      console.log(data);
    };
    getBlogs();
  }, []);
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.blogs}>
          {blogs?.map((blog) => {
            return <Blog key={blog._id} blog={blog} />;
          })}
        </div>
        <div className={style.right}>
          <div className={style.writeBlog}>
            <Button
              variant="contained"
              startIcon={<ModeEditIcon />}
              onClick={() => {
                navigate("/blogs/createBlog");
              }}
            >
              Write a Blog
            </Button>
          </div>
          <div className={style.recentBlogs}>
            <h2>Recent Blogs</h2>

            {blogs?.map((blog) => {
              return <Link to={`/blog/${blog._id}`}>{blog.title}</Link>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
