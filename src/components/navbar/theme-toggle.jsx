import { FaSun, FaMoon } from "react-icons/fa";
import styles from "./theme-toggle.module.css";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.toggleContainer}>
            <span className={theme === "light" ? styles.active : styles.inactive}>
                <FaSun size={20} />
            </span>
            <label className={styles.switch}>
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                />
                <span className={styles.slider}></span>
            </label>
            <span className={theme === "dark" ? styles.active : styles.inactive}>
                <FaMoon size={20} />
            </span>
        </div>
    );
}