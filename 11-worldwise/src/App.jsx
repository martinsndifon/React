import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Product from './pages/Product/Product';
import HomePage from './pages/HomePage/Homepage';
import Pricing from './pages/Pricing/Pricing';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';
import { CitiesProvider } from './contexts/CitiesContext';

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
