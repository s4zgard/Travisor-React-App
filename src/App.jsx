import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductPage from "./pages/ProductPage";
import HomePage from "./pages/HomePage";
import PricingPage from "./pages/PricingPage";
import LoginPage from "./pages/LoginPage";
import AppLayoutPage from "./pages/AppLayoutPage";
import Page404 from "./pages/Page404";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

const BASE_URL = "http://localhost:3001";

const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
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
    };
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="app" element={<AppLayoutPage />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:id" element={<City cities={cities} />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
