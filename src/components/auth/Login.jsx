import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./auth.module.css";
import { usersList } from '../../data/users';

/**
 * Login component for user authentication.
 * Displays a login form and handles user sign-in.
 * @returns {JSX.Element}
 */
export default function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Busca el usuario en la lista para mostrar el avatar si coincide el nombre
  const userFound = usersList.find(u => u.username === username.toLowerCase());

  /**
   * Maneja el envío del formulario de login.
   * Si las credenciales son correctas, redirige al home.
   * Si no, muestra un mensaje de error.
   * @param {React.FormEvent} e
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/");
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formTitle}>Sign in</div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
          />
          {userFound && (
            <img src={userFound.avatar} alt="avatar" className={styles.avatarPreview} />
          )}
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button className={styles.button} type="submit">Sign in</button>
        <Link className={styles.link} to="/sign-up">Don't have an account? Register</Link>
      </form>
    </div>
  );
}
