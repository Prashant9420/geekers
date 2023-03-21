import style from "./Blogs.module.css";
import Blog from "./Blog/Blog";
import Header from "../../components/Header/Header";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SERVER_URL from "../../utils/ServerURL";
import Chip from "@mui/material/Chip";

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

  // const toggleSelectedCategoryState = (categoryName) => {
  //   const index = selectedCategoryNames.indexOf(categoryName);
  //   const newSelectedCategoryStates = [...selectedCategoryStates];
  //   newSelectedCategoryStates[index] = !newSelectedCategoryStates[index];
  //   setSelectedCategoryStates(newSelectedCategoryStates);
  // };

  const handleSelectCategory = (categoryName) => {
    if (selectedCategory.includes(categoryName)) {
      setSelectedCategory([
        ...selectedCategory,
        { categoryName, selected: false },
      ]);
    } else {
      setSelectedCategory([
        ...selectedCategory,
        { categoryName, selected: true },
      ]);
      console.log(selectedCategory);
    }

    // const categoryName = e.target.innerText;
    // const index = selectedCategoryNames.indexOf(categoryName);
    // if (index === -1) {
    //   setSelectedCategoryNames([...selectedCategoryNames, categoryName]);
    //   setSelectedCategoryStates([...selectedCategoryStates, true]);
    // } else {
    //   toggleSelectedCategoryState(categoryName);
    // }
    // console.log(selectedCategoryNames);
    // console.log(selectedCategoryStates);
  };

  // const handleDeleteSelectedCategory = (index) => {
  //   const newSelectedCategoryNames = selectedCategoryNames.filter(
  //     (selectedCategoryNames, i) => i !== index
  //   );
  //   const newSelectedCategoryStates = selectedCategoryStates.filter(
  //     (selectedCategoryStates, i) => i !== index
  //   );
  //   setSelectedCategoryNames(newSelectedCategoryNames);
  //   setSelectedCategoryStates(newSelectedCategoryStates);
  // };
  // console.log(selectedCategoryNames);
  // console.log(selectedCategoryStates);

  useEffect(() => {
    getCountAllBlogs();
    getBlogs();
    getAllCategories();
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
        </div>
        <div className={style.content}>
          <div className={style.left}>
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
          <div className={style.right}>
            <div className={style.allCategories}>
              <h3>Categories</h3>
              <div className={style.categories}>
                {allCategories?.map((category, index) => {
                  return (
                    <Chip
                      key={index}
                      color="info"
                      variant="outlined"
                      label={category.categoryName}
                      cursor="pointer"
                      onClick={() =>
                        handleSelectCategory(category.categoryName)
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className={style.selectedCategories}>
              <h3>Selected Categories</h3>
              {/* {selectedCategory?.map((selectedCategory, index) => {
                return (
                  <Chip
                    key={index}
                    color="info"
                    variant="outlined"
                    label={selectedCategory}
                    cursor="pointer"
                    // onDelete={() => handleDeleteSelectedCategory(index)}
                  />
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
