import { Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import style from "./Home.module.css";

const Home = () => {
  return (
    <>
      <Header />
      <Typography
        sx={{ fontSize: "5rem", textAlign: "center", fontWeight: "bold" }}
      >
        Explore Learn Build
      </Typography>
    </>
  );
};

export default Home;
