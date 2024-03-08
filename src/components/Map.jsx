import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
  const [searchParams, SetSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Postion: {lat}, {lng}
      </h1>
    </div>
  );
};

export default Map;
