import { Link } from "react-router-dom";
import styles from "./auth.module.css";

/**
 * Register component for user sign-up.
 * Displays a registration form for new users.
 * @returns {JSX.Element}
 */
export default function Register() {
  return (
    <div className={styles.overlay}>
      <form className={styles.formContainer} onSubmit={e => e.preventDefault()}>
        <div className={styles.formTitle}>Sign up</div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder="Username"
            autoFocus
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Repeat password"
          />
        </div>
        <button className={styles.button} type="submit" disabled>Sign up</button>
        <Link className={styles.link} to="/sign-in">Already have an account? Sign in</Link>
      </form>
    </div>
  );
}
