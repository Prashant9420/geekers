import style from "./Blog.module.css";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import dateFormatter from "../../../utils/dateFormatter";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  let { _id, categories, title, content, imgUrl, createdAt } = blog;

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className={style.blog}>
      <div className={style.left}>
        <div className={style.contributor}>
          {/* User Image */}
          {/* <img src={imgUrl} alt="" /> */}
          {/* Add Contributor Name */}
          {/* <div className={style.name}></div> */}
        </div>
        <div className={style.title}>{title}</div>
        <h5 className={style.time}>
          Published on : {dateFormatter(createdAt)}
        </h5>
        <div className={style.description}>{parse(`${content}`)}</div>
        <div className={style.categories}>
          {categories?.map((category, index) => {
            return (
              <div key={index} className={style.category}>
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.right}>
        <img src={imgUrl} alt="Not Found!" />
      </div>
    </div>
  );
};

export default Blog;
