import style from "./Events.module.css";
import Header from "../../components/Header/Header";

const Events = () => {
  return (
    <div className={style.events}>
      <Header />
      <div className={style.events}>
        <h1>Events</h1>
      </div>
    </div>
  );
};

export default Events;
