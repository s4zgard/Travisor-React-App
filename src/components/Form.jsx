import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useLatLng } from "../hooks/useLatLng";
import Message from "./Message";
import Spinner from "./Spinner";
import useCitiesContext from "../hooks/use-cities-context";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const { addCity, isLoading } = useCitiesContext();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [locError, setLocError] = useState("");
  const [lat, lng] = useLatLng();
  const [locLoading, setLocLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;
    const fetchCityName = async () => {
      try {
        setLocLoading(true);
        setLocError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error("This is not city, please click somewhere else. 😊");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setLocError(error.message);
      } finally {
        setLocLoading(false);
      }
    };
    fetchCityName();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await addCity(newCity);
    navigate("/app");
  };

  if (locLoading) return <Spinner />;

  if (locError) return <Message message={locError} />;

  return (
    <form
      className={`${styles.form} ${isLoading && `${styles.loading}`}`}
      onSubmit={handleSubmit}
    >
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
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyy"
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
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
