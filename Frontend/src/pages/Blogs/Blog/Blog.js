import style from "./Blog.module.css";
import { Link, useNavigate } from "react-router-dom";
import dateFormatter from "../../../utils/dateFormatter";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  var { _id, categories, title, content, imgUrl, createdAt } = blog;
  let read = "";
  const stringHtml = (content) => {
    for (let i = 0; i < content.length; ) {
      if (content[i] === "<") {
        while (content[i] !== ">") {
          i++;
        }
      }
      i++;
      if (content.charAt(i) !== "<") read += content.charAt(i);
    }
    return read;
  };
  read = stringHtml(content);
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className={style.blog}>
      <div className={style.left}>
        <div className={style.title}>{title}</div>
        <div className={style.time}>
          Published on - {dateFormatter(createdAt)}
        </div>
        <div className={style.contributor}>
          {/* User Image */}
          {/* <img src={imgUrl} alt="" /> */}
          {/* Add Contributor Name */}
          {/* <div className={style.name}></div> */}
        </div>

        <div className={style.description}>{read.slice(0, 150)}...</div>
        <div className={style.categories}>
          {categories?.map((category, index) => {
            return (
              <button key={index} className={style.category}>
                {category}
              </button>
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
