import React from "react";
import style from "./CompleteBlog.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import dateFormatter from "../../../utils/dateFormatter";
import ServerURL from "../../../utils/ServerURL";
import Header from "../../../components/Bar";

const CompleteBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch(`${ServerURL}/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      });
  }, []);

  const { title, content, imgUrl, createdAt, categories } = blog;
  return (
    <div className={style.completeBlog}>
      <Header />
      <img src={imgUrl} alt="Not Found!" />
      <div className={style.title}>{title}</div>
      <div className={style.time}>
        Published On : {dateFormatter(createdAt)}
      </div>
      <div className={style.description}>{parse(`${content}`)}</div>
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
  );
};

export default CompleteBlog;
