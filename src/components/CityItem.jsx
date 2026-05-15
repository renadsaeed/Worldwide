import { useCities } from "../Contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
export default function CityItem({ city, key }) {
  console.log(city);
  console.log("lat ", city.position.lat);
  const { cityName, emoji, date, position, id } = city;
  const { removeCity, currentCity } = useCities();
  return (
    <li key={key}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles[`cityItem--active`] : ""}`}
      >
        <span className={`${styles.emoji} ${emoji}`}></span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => removeCity(id, e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}
