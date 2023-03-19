import React from "react";
import style from "./CompleteBlog.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import parse from 'html-react-parser';
import dateFormatter from "../../../utils/dateFormatter";
import ServerURL from "../../../utils/ServerURL";


const CompleteBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    fetch(`${ServerURL}/blog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
      });
  },);

  const { title, content, imgUrl, createdAt, categories } = blog;
  return (
    <div className={style.completeBlog}>
      {" "}
      <img src={imgUrl} alt="Not Found!" />
      <div className={style.title}>{title}</div>
      <div className={style.time}>{dateFormatter(createdAt)}</div>
      <div className={style.description}>{parse(`${content}`)}</div>
      <div className={style.categories}>
        {categories?.map((category) => {
          return <div className={style.category}>{category}</div>
        })}
      </div>
    </div>
  );
};

export default CompleteBlog;
