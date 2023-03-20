import React, { useState } from "react";
import style from "./CreateBlog.module.css";
import Header from "../../../components/Header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ServerURL from "../../../utils/ServerURL";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  const handleChangeimgUrl = (e) => {
    setimgUrl(e.target.value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleAddCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddClick = () => {
    category !== "" && setCategories([...categories, category]);
    setCategory("");
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((category, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = async () => {
      try {
        const result = await fetch(`${ServerURL}/blog/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            imgUrl,
            categories,
          }),
        });
        if (result.status === 200) {
          setTitle("");
          setContent("");
          setimgUrl("");
          setCategories([]);
          alert("Blog Created Successfully");
          navigate("/blogs");
        }
      } catch (err) {
        console.log(err);
      }
    };
    response();
  };
  return (
    <div>
      <Header />
      <form className={style.form}>
        <input
          type="text"
          className={style.title}
          placeholder="Enter a title"
          value={title}
          onChange={handleChangeTitle}
        ></input>

        <ReactQuill
          className={style.textArea}
          theme="snow"
          value={content}
          onChange={handleChangeContent}
        />
        <div className={style.uploadFile}>
          {/* <Upload.Dragger
            style={{
              width: "70vw",
            }}
          >
            Drag files here <br /> OR <br />
            <Button>Click to Upload</Button>
          </Upload.Dragger> */}
          <input
            className={style.imageURL}
            type="url"
            placeholder="Enter Image Url"
            onChange={handleChangeimgUrl}
            value={imgUrl}
            required
          ></input>
        </div>

        <div className={style.tag}>
          <div className={style.category}>
            <TextField
              outline="none"
              border="none"
              label="Enter a category"
              value={category}
              onChange={handleAddCategory}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddClick();
                }
              }}
            />
          </div>

          <button
            className={style.button}
            variant="contained"
            component="label"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div className={style.categories}>
          {categories.map((category, index) => {
            return (
              <Chip
                className={style.chip}
                key={index}
                color="info"
                label={category}
                variant="outlined"
                onDelete={() => handleDelete(index)}
              />
            );
          })}
        </div>
        <div className={style.publish}>
          <button
            className={style.button}
            // color="danger"
            // variant="contained"
            // component="label"
            onClick={handleSubmit}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
