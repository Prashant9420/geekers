import style from "./Blogs.module.css";
import Blog from "./Blog/Blog";
import Header from "../../components/Header/Header";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SERVER_URL from "../../utils/ServerURL";

const Blogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(5);
  const [countAllBlogs, setCountAllBlogs] = useState(0);

  const getBlogs = async () => {
    const res = await fetch(`${SERVER_URL}/blog/recentBlogs?limit=${limit}`);
    const data = await res.json();
    setBlogs(data.blogs);
  };
  const getCountAllBlogs = async () => {
    const res = await fetch(`${SERVER_URL}/blog/countAllBlogs`);
    const data = await res.json();
    setCountAllBlogs(data.count);
    console.log(countAllBlogs);
  };

  useEffect(() => {
    getCountAllBlogs();
    getBlogs();
  }, [limit]);

  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.top}>
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
          {/* <div className={style.recentBlogs}>
            <h2>Recent Blogs</h2>

            {blogs?.map((blog, index) => {
              return (
                <Link key={index} to={`/blog/${blog._id}`}>
                  {blog.title}
                </Link>
              );
            })}
          </div> */}
        </div>
      </div>
      <div className={style.blogs}>
        {blogs?.map((blog) => {
          return <Blog key={blog._id} blog={blog} />;
        })}
      </div>
      <div className={style.loadMore}>
        <button
          disabled={countAllBlogs <= limit}
          className={style.loadMoreButton}
          onClick={() => {
            setLimit(limit + 5);
          }}
        >
          Load more...
        </button>
      </div>
    </div>
  );
};

export default Blogs;
