import { produce } from "immer";
import { useCallback, useEffect, useReducer, useState } from "react";
import { createContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3001";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const LOADING = "loading";
const ERROR = "error";
const CITY_LOADED = "city/loaded";
const DATA_LOADED = "data/loaded";
const DATA_POSTED = "data/posted";
const DATA_REMOVED = "data/removed";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      state.isLoading = true;
      return;

    case ERROR:
      state.isLoading = false;
      return;

    case CITY_LOADED:
      state.currentCity = action.payload;
      state.isLoading = false;
      return;

    case DATA_LOADED:
      state.cities = action.payload;
      state.isLoading = false;
      return;
    case DATA_POSTED:
      state.cities = [...state.cities, action.payload];
      state.isLoading = false;
      return;
    case DATA_REMOVED:
      state.cities = state.cities.filter((city) => city.id !== action.payload);
      state.isLoading = false;
      return;
    default:
      throw new ERROR("Unknown Method");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    produce(reducer),
    initialState
  );

  const fetchCities = useCallback(async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${BASE_URL}/cities`);
      const data = await response.json();
      dispatch({ type: DATA_LOADED, payload: data });
    } catch (error) {
      alert("Error fetching cities");
      dispatch({ type: ERROR });
    }
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: LOADING });
    try {
      const res = await fetch(`http://localhost:3001/cities/${id}`);
      const data = await res.json();
      dispatch({ type: CITY_LOADED, payload: data });
    } catch (error) {
      alert("Error getting city");
      dispatch({ type: ERROR });
    }
  };

  const addCity = async (city) => {
    dispatch({ type: LOADING });
    try {
      const res = await fetch(`http://localhost:3001/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: DATA_POSTED, payload: data });
    } catch (error) {
      alert("Error adding city");
      dispatch({ type: ERROR });
    }
  };

  const removeCity = async (id) => {
    dispatch({ type: LOADING });
    try {
      const res = await fetch(`http://localhost:3001/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: DATA_REMOVED, payload: id });
    } catch (error) {
      alert("Error getting city");
      dispatch({ type: ERROR });
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
