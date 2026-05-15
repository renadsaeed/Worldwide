import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlposition";
import Button from "./Button";
export default function Map() {
  const { lat, lng } = useUrlPosition();
  const Navegation = useNavigate();
  const [position, setPosition] = useState([40, 0]);
  const {
    isLoading: loadingPostion,
    postion: geoPostion,
    getPostion,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]);
    }
  }, [lat, lng]);
  useEffect(() => {
    if (geoPostion) {
      setPosition([geoPostion.lat, geoPostion.lng]);
      Navegation(`form?lat=${geoPostion.lat}&lng=${geoPostion.lng}`);
    }
  }, [geoPostion]);
  const { cities } = useCities();
  return (
    <>
      <div className={styles.mapContainer}>
        {!geoPostion && (
          <Button type="position" onClick={getPostion}>
            {loadingPostion ? "getting position" : "get current position"}
          </Button>
        )}
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => {
            return (
              <Marker
                position={[city.position.lat, city.position.lng]}
                key={city.id}
              >
                <Popup>
                  <span className={city.emoji}></span> {city.cityName}
                </Popup>
              </Marker>
            );
          })}
          <ChangeLocation position={position} />
          <DetectClick />
        </MapContainer>
      </div>
    </>
  );
}
function ChangeLocation({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
