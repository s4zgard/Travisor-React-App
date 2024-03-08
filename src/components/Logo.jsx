import styles from "./Logo.module.css";

function Logo() {
  return (
    <div className={styles.logo}>
      <img src="/react.svg" alt="React logo" />

      <h1>Travisor</h1>
    </div>
  );
}

export default Logo;
