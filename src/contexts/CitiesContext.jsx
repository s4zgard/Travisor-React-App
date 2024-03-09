import { useCallback, useEffect, useState } from "react";
import { createContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3001";

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const fetchCities = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`);
      const data = await response.json();
      setCities(data);
    } catch (error) {
      alert("Error fetching cities");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addCity = async (city) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities([...cities, data]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3001/cities/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      const updated = cities.filter((city) => city.id !== id);
      setCities(updated);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        fetchCities,
        cities,
        isLoading,
        getCity,
        currentCity,
        addCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider };

export default CitiesContext;
