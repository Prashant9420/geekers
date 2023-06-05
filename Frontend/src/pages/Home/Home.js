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
      <div className={style.container}>
        <header>Explore Learn Build</header>
      </div>
    </>
  );
};

export default Home;
