import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayoutPage.module.css";

const AppLayoutPage = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayoutPage;
