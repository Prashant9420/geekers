import Header from "../../components/Header/Header";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <Header />
      <h1 className={style.header}>Geekers</h1>
      <h2>Explore Learn Build</h2>
    </div>
  );
};

export default Home;
