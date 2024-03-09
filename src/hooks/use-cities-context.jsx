import { useContext } from "react";
import CitiesContext from "../contexts/CitiesContext";

const useCitiesContext = () => {
  return useContext(CitiesContext);
};

export default useCitiesContext;
