import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCitiesContext from "../hooks/use-cities-context";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, removeCity } = useCitiesContext();

  const isCurrent = currentCity.id === city.id;

  const { cityName, emoji, date, id, position } = city;

  const handleRemove = (e) => {
    e.preventDefault();
    removeCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${isCurrent && styles.cActive} `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleRemove}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
