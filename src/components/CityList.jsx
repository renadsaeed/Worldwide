import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import PageNotFound from "../Pages/PageNotFound";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";

export default function CityList() {
  const { cities, loading, error, removeCity } = useCities();
  if (!cities.length) return <Message message="add your frist city" />;
  return (
    <>
      {loading && <Spinner />}
      {error && <PageNotFound />}
      {!loading && !error && (
        <ul className={styles.cityList}>
          {cities.map((city, index) => (
            <CityItem city={city} key={index} removeCity={removeCity} />
          ))}
        </ul>
      )}
    </>
  );
}
