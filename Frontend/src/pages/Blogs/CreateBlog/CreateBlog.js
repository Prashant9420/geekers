import React, { useState } from "react";
import style from "./CreateBlog.module.css";
import Header from "../../../components/Header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import ServerURL from "../../../utils/ServerURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input } from "@mui/material";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [imgUrl, setimgUrl] = useState("");

  const handleAddClick = () => {
    category !== "" && setCategories([...categories, category]);
    setCategory("");
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((category, i) => i !== index));
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch(`${ServerURL}/blog/`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          imgUrl,
          categories,
          username: window.localStorage.getItem("username"),
        }),
      });
      if (result.status === 200) {
        setTitle("");
        setContent("");
        setimgUrl("");
        setCategories([]);
        toast("Blog Created Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success",
          theme: "colored",
        });
        navigate("/blogs");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      <form className={style.form}>
        <Input
          sx={{ fontSize: "2.5rem", fontWeight: "bold" }}
          type="text"
          className={style.title}
          placeholder="Enter a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>

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
          <Input
            className={style.imageURL}
            type="url"
            placeholder="Enter Image Url"
            onChange={(e) => setimgUrl(e.target.value)}
            value={imgUrl}
            required
          ></Input>
        </div>

        <div className={style.tag}>
          <div className={style.category}>
            <TextField
              required
              outline="none"
              border="none"
              label="Enter a category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddClick();
                }
              }}
            />
          </div>

          <Button
            className={style.button}
            variant="contained"
            component="label"
            onClick={handleAddClick}
          >
            Add
          </Button>
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
          <Button
            variant="contained"
            className={style.button}
            onClick={handleSubmit}
          >
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
