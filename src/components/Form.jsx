// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import Backbutton from "./Backbutton";
import { useUrlPosition } from "../hooks/useUrlposition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function Form() {
  const { lat, lng } = useUrlPosition();
  const [location, setLocation] = useState({});
  const [errorGeo, setErrorGeo] = useState("");
  const [date, setDate] = useState(new Date());
  const [loadingCityData, setLoadingCityData] = useState(false);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  let emoji = "";
  if (location.city || location.locality) {
    emoji = `fi fi-${location.countryCode.toLowerCase()}`;
    // emoji = convertToEmoji(location.countryCode);
  }
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setLoadingCityData(true);
        setErrorGeo("");
        // Simulate an API call
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            "No country found for the given coordinates click again !!!",
          );

        console.log(data);
        setLocation(data);

        // setCountry(data.countryName || "Unknown country");
      } catch (error) {
        setErrorGeo(error.message);
      } finally {
        setLoadingCityData(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  const { createCity, loading } = useCities();
  async function handelSubmit(e) {
    e.preventDefault();
    if (!location.city && !location.locality)
      return setErrorGeo("City name is required");
    const newCity = {
      cityName: location.city,
      country: location.countryName,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  if (errorGeo) return <Message message={errorGeo} />;
  if (loadingCityData) return <Spinner />;
  if (!lat && !lng) return <Message message={"Start by clicking on the map"} />;
  return (
    <form
      className={`${styles.form} ${loading ? styles.loading : ""}`}
      onSubmit={handelSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <span className={` ${emoji}`}></span>
        <input
          id="cityName"
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
          value={location.city || location.locality || "Unknown city"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">
          When did you go to{" "}
          {location.city || location.locality || "Unknown city"}?
        </label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to{" "}
          {location.city || location.locality || "Unknown city"}
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary"> Add</Button>
        <Backbutton />
      </div>
    </form>
  );
}

export default Form;
