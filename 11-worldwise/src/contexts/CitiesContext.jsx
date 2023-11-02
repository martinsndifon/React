import { useCallback } from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  /* const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); */
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    dispatch({ type: 'loading' });
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'cities/loaded', payload: data }))
      .catch(() =>
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading the cities...',
        })
      );
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });
      fetch(`${BASE_URL}/cities/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: 'city/loaded', payload: data }))
        .catch(() =>
          dispatch({
            type: 'rejected',
            payload: 'There was an error loading the city...',
          })
        );
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    fetch(`${BASE_URL}/cities`, {
      method: 'POST',
      body: JSON.stringify(newCity),
      headers: { 'content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'city/created', payload: data }))
      .catch(() =>
        dispatch({
          type: 'rejected',
          payload: 'There was an error adding city...',
        })
      );
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    fetch(`${BASE_URL}/cities/${id}`, {
      method: 'DELETE',
    })
      .then(dispatch({ type: 'city/deleted', payload: id }))
      .catch(() =>
        dispatch({
          type: 'rejected',
          payload: 'There was an error deleting city...',
        })
      );
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
