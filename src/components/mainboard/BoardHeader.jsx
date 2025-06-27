import styles from './styles.module.css';
import { Link } from 'react-router-dom';

/**
 * Header principal del tablero de la aplicación.
 * Muestra el lema, aviso y accesos rápidos para usuarios no autenticados.
 * @param {object} props
 * @param {object|null} props.user - Usuario autenticado o null
 * @returns {JSX.Element}
 */
export default function BoardHeader({ user }) {
  return (
    <>
      <div className={styles.lemma}>
        <div className={styles.lemmaContainer}>
          <span>start</span>
          <span className={styles.resalted}>streaming</span>
          <span>games</span>
          <span>differently</span>
          <div className={styles.oval3}></div>
        </div>
      </div>
      <div className={styles.notice}>
        <p>gamor now has <span className={styles.underlined}>stream party</span> platform</p>
      </div>
      {
        !user && <div className={styles.access}>
          <button className={styles.btnRoundWhite}>
            <Link to='/sign-up'>Sign up</Link>
          </button>
          <button className={styles.btnSignIn}>
            <Link to='/sign-in'>Sign in</Link>
          </button>
        </div>
      }
    </>
  );
}
