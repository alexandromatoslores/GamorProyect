import styles from './styles.module.css'
import { FaArrowRight } from "react-icons/fa"

export default function ViewAllBlock() {
    return (
        <div className={styles.categoryBlock + ' ' + styles.viewAllBlock}>
            <div className={styles.clean}>
                <p className={styles.id} style={{ color: 'var(--hover)' }}>VIEW ALL</p>
                <p className={styles.name} style={{ color: 'var(--dark)' }}>All Categories</p>
                <button><FaArrowRight size={16} style={{ color: 'var(--dark)' }} /></button>
            </div>
        </div>
    )
} 