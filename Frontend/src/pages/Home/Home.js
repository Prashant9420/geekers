import Header from "../../components/Header/Header";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import ServerURL from "../../utils/ServerURL";

async function getGoogleUserData() {
  try {
    const res = await fetch(`${ServerURL}/user/googleLogin/success`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Failed to retrieve user data");
    }
    const data = await res.json();
    window.localStorage.setItem("username", data?.user?.name);
    window.localStorage.setItem("imageUrl", data?.user?.avatar);
    return data;
  } catch (err) {
    console.error(err);
  }
}

const Home = () => {
  const [googleUserData, setGoogleUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await getGoogleUserData();
      setGoogleUserData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <h1 className={style.header}>Geekers</h1>
      <h2>Explore Learn Build</h2>
    </div>
  );
};

export default Home;
