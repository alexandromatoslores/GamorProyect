import { useUser } from "../../context/UserContext";
import styles from './styles.module.css'
import { FaUserPlus } from "react-icons/fa";

export default function UserBall({ added = false }) {
    const { user } = useUser();

    if (user && user.username) {
        if (added) {
            return (
                <img className={styles.userBall} src={user.avatar} width={100} height={100} alt={user.username} />
            )
        } else {
            return (
                <div className={styles.genericUserBall}>
                    <FaUserPlus color="white" size={16} />
                </div>
            )
        }
    }

    return null;
}