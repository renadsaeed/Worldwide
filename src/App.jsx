import Home from "./Pages/Homepage";
import Proudect from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Pagenotfound from "./Pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import City from "../src/components/City";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import { CitiesProvider } from "./Contexts/CitiesContext";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import ProtectRoute from "./pages/ProtectRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Proudect" element={<Proudect />} />
            <Route path="/Pricing" element={<Pricing />} />
            {/* Nested Routes */}
            <Route
              path="app"
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
