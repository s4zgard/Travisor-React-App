import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useCitiesContext from "./hooks/use-cities-context";

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
import { useEffect } from "react";

const App = () => {
  const { fetchCities } = useCitiesContext();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="app" element={<AppLayoutPage />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
