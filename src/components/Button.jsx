import styles from "./Button.module.css";

const Button = ({ children, type, ...rest }) => {
  return (
    <button {...rest} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
