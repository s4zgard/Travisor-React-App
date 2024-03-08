import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

const CountryList = ({ cities, isLoading }) => {
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  const renderedCountries = countries.map((country, index) => {
    return <CountryItem key={index} country={country} />;
  });

  if (!countries.length) {
    return <Message message="Add City to Country here" />;
  }
  return (
    <ul className={styles.countryList}>
      {isLoading ? <Spinner /> : renderedCountries}
    </ul>
  );
};

export default CountryList;
