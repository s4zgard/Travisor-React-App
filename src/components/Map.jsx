import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLatLng } from "../hooks/useLatLng";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import styles from "./Map.module.css";
import Button from "./Button";
import useCitiesContext from "../hooks/use-cities-context";
import { useEffect, useState } from "react";
const Map = () => {
  const [lat, lng] = useLatLng();
  const [position, setPosition] = useState([40, 0]);
  const { cities, isLoading } = useCitiesContext();
  const {
    isLoading: isLoadingPos,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (geoPosition) setPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  const renderedLocations = cities.map((city) => (
    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span> <span>{city.cityName}</span>
      </Popup>
    </Marker>
  ));

  if (isLoading || !Array.isArray(cities)) return <Spinner />;
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPos ? "Loading..." : "Goto Location"}
        </Button>
      )}
      <MapContainer
        className={styles.mapContainer}
        center={position}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {renderedLocations}
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};
export default Map;
