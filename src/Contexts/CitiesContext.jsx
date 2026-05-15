import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";
const CitiesContext = createContext();
const initalState = {
  cities: [],
  loading: false,
  error: false,
  currentCity: {},
};
function citiesReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: action.payload };
    case "error":
      return { ...state, error: action.payload };
    case "cities":
      return { ...state, cities: action.payload };
    case "currentCity":
      return { ...state, currentCity: action.payload };
    case "createCity":
      return { ...state, cities: [...state.cities, action.payload] };
    case "removeCity":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error(`Unkown action type ${action.type}`);
  }
}
function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [loading, isLoading] = useState(false);
  // const [error, setError] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, loading, error, currentCity }, dispatch] = useReducer(
    citiesReducer,
    initalState,
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "error", payload: false });
        const response = await fetch("http://localhost:8000/cities");
        if (!response.ok) throw new Error("page not Found");

        const data = await response.json();
        if (!data) throw new Error("undefind data");
        dispatch({ type: "cities", payload: data });
      } catch (e) {
        dispatch({ type: "error", payload: true });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    }

    fetchCities();
  }, []);
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "error", payload: false });
      const response = await fetch(`http://localhost:8000/cities/${id}`);
      if (!response.ok) throw new Error("page not Found");

      const data = await response.json();
      if (!data) throw new Error("undefind data");
      dispatch({ type: "currentCity", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: true });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }
  async function createCity(cityData) {
    try {
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "error", payload: false });

      const response = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityData),
      });
      if (!response.ok) throw new Error("page not Found");

      const data = await response.json();
      if (!data) throw new Error("undefind data");
      dispatch({ type: "createCity", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: true });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }
  async function deletCity(id) {
    try {
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "error", payload: false });
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("page not Found");
    } catch (e) {
      dispatch({ type: "error", payload: true });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }
  function removeCity(id, e) {
    e.preventDefault();

    dispatch({ type: "removeCity", payload: id });
    deletCity(id);
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        loading,
        createCity,
        error,
        removeCity,
        getCity,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCities };
