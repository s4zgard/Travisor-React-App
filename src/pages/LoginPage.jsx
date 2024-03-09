import Navigation from "../components/Navigations";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, isAuth } = useAuth();
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("boi@example.com");
  const [password, setPassword] = useState("qwerty");

  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <main className={styles.login}>
      <Navigation />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
};
export default LoginPage;
