import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import styles from "./AppLayoutPage.module.css";
import { useEffect } from "react";
import User from "../components/User";

const AppLayoutPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <div className={styles.app}>
      {isAuth && <User />}
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayoutPage;
