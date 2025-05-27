// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";

import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import Message from "./Message";
import { useUrlPosition } from "../hook/useUrlPostion";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [errorGeocoding, setErrorGeocoding] = useState("");

  useEffect(
    function () {
      async function fetchGeoPositionData() {
        try {
          setIsLoadingGeocoding(true);
          setErrorGeocoding("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😆"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.country);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          console.log(err);
          setErrorGeocoding(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchGeoPositionData();
    },
    [lat, lng]
  );

  if (isLoadingGeocoding) return <Spinner />;

  console.log(errorGeocoding);
  if (errorGeocoding) return <Message message={errorGeocoding} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
