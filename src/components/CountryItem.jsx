import styles from "./CountryItem.module.css";

function CountryItem({ country, removeCity, key }) {
  return (
    <li className={styles.countryItem} key={key}>
      <span className={`${styles.emoji} ${country.emoji}`}></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
