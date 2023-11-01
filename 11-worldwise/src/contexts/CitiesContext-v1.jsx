import { createContext, useContext, useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => alert('There was an error loading data...'))
      .finally(() => setIsLoading(false));
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentCity(data))
      .catch(() => alert('There was an error loading data...'))
      .finally(() => setIsLoading(false));
  }
  async function createCity(newCity) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`, {
      method: 'POST',
      body: JSON.stringify(newCity),
      headers: { 'content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setCities((cities) => [...cities, data]))
      .catch(() => alert('There was an error adding city...'))
      .finally(() => setIsLoading(false));
  }

  async function deleteCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`, {
      method: 'DELETE',
    })
      .then(setCities((cities) => cities.filter((city) => city.id !== id)))
      .catch(() => alert('There was an error deleting city...'))
      .finally(() => setIsLoading(false));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      'You may have used the CitiesContext outside of the CitiesProvider'
    );
  return context;
}

export { CitiesProvider, useCities };
