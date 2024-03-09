import useCitiesContex from "../hooks/use-cities-context";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

const CityList = () => {
  const { cities, isLoading } = useCitiesContex();
  const renderedCities = cities.map((city) => {
    return <CityItem key={city.id} city={city} />;
  });

  if (!cities.length) {
    return <Message message="Add City to show here" />;
  }
  return (
    <ul className={styles.cityList}>
      {isLoading ? <Spinner /> : renderedCities}
    </ul>
  );
};

export default CityList;
