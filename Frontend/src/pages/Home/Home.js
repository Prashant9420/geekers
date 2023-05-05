import { Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import style from "./Home.module.css";
import videoFile from "./video.mp4";

const Home = () => {
  return (
    <>
      <Header />
      <div className="videoContainer">
        <video autoPlay muted loop className={style.myVideo}>
          <source src={videoFile} type="video/mp4" />
        </video>
      </div>
      <Typography
        sx={{ fontSize: "5rem", textAlign: "center", fontWeight: "bold" }}
      >
        Explore Learn Build
      </Typography>
    </>
  );
};

export default Home;
