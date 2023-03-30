import style from "./Blogs.module.css";
import Blog from "./Blog/Blog";
import Header from "../../components/Header/Header";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SERVER_URL from "../../utils/ServerURL";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";

const Blogs = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(6);
  const [countAllBlogs, setCountAllBlogs] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const getBlogs = async () => {
    const res = await fetch(`${SERVER_URL}/blog/recentBlogs?limit=${limit}`);
    const data = await res.json();
    setBlogs(data.blogs);
  };
  const getAllCategories = async () => {
    const res = await fetch(`${SERVER_URL}/blog/getAllCategories`);
    const data = await res.json();
    setAllCategories(data.categories);
  };
  const getCountAllBlogs = async () => {
    const res = await fetch(`${SERVER_URL}/blog/countAllBlogs`);
    const data = await res.json();
    setCountAllBlogs(data.count);
  };
  const searchByCategory = async () => {
    try {
      const result = await fetch(`${SERVER_URL}/blog/searchByCategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categories: selectedCategory,
        }),
      });
      const data = await result.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectCategory = async (categoryName) => {
    if (!selectedCategory.includes(categoryName)) {
      setSelectedCategory(() => [...selectedCategory, categoryName]);
    } else {
      const newArray = selectedCategory.filter(
        (category) => category !== categoryName
      );
      setSelectedCategory(() => [...newArray]);
    }
    searchByCategory();
  };

  useEffect(() => {
    getCountAllBlogs();
    getBlogs();
    getAllCategories();
  }, [limit]);
  useEffect(() => {
    selectedCategory.length === 0 ? getBlogs() : searchByCategory();
  }, [selectedCategory]);

  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.top}>
          <div className={style.writeBlog}>
            <Button
              color="info"
              variant="contained"
              startIcon={<ModeEditIcon />}
              onClick={() => {
                if (window.localStorage.getItem("username") === null) {
                  toast("Please Login First", {
                    type: "error",
                    position: "top-center",
                  });
                  navigate("/signIn");
                } else {
                  navigate("/blogs/createBlog");
                }
              }}
            >
              Write a Blog
            </Button>
          </div>
        </div>
        <div className={style.allCategories}>
          <div className={style.categories}>
            <h3>Tags</h3>
            <div className={style.allCategoriesChip}>
              {allCategories?.map((category, index) => {
                return (
                  <Chip
                    key={index}
                    color="info"
                    variant={
                      selectedCategory.includes(category.categoryName)
                        ? "filled"
                        : "outlined"
                    }
                    label={category.categoryName}
                    cursor="pointer"
                    onClick={() => handleSelectCategory(category.categoryName)}
                  />
                );
              })}
            </div>
          </div>
          <div className={style.selectedCategoriesChip}>
            {selectedCategory?.map((selectedCategory, index) => {
              return (
                <Chip
                  key={index}
                  color="info"
                  variant="filled"
                  label={selectedCategory}
                  cursor="pointer"
                  onDelete={() => handleSelectCategory(selectedCategory)}
                />
              );
            })}
          </div>
        </div>

        <div className={style.content}>
          <div className={style.blogs}>
            {blogs?.map((blog) => {
              return <Blog key={blog._id} blog={blog} />;
            })}
          </div>
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
    </div>
  );
};

export default Blogs;
