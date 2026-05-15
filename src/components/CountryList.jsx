import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import PageNotFound from "../pages/PageNotFound";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

export default function CountryList() {
  const { cities, loading, error, removeCity } = useCities();
  if (!cities.length) return <Message message="add your frist city" />;
  // const list = cities.map((city) => city.country);
  const countrylist = cities.reduce((array, city) => {
    if (!array.map((el) => el.country).includes(city.country)) {
      return [...array, { country: city.country, emoji: city.emoji }];
    } else {
      return array;
    }
  }, []);
  // console.log("list ", ...countrylist);

  return (
    <>
      {loading && <Spinner />}
      {error && <PageNotFound />}
      {!loading && !error && (
        <ul className={styles.countryList}>
          {countrylist.map((country, index) => (
            <CountryItem
              country={country}
              key={index}
              removeCity={removeCity}
            />
          ))}
        </ul>
      )}
    </>
  );
}
