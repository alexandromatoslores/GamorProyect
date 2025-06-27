import CategoryBlock from "./category-block"
import styles from './styles.module.css'
import { FaArrowRight } from "react-icons/fa"

/**
 * Componente de listado de categorías principales y acceso a todas las categorías.
 * @param {object} props
 * @param {Array} props.categories - Lista de categorías a mostrar
 * @returns {JSX.Element}
 */
export default function Categories({ categories }) {
    const mainCategories = categories.slice(0, 7)

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.title}><strong>Trending</strong> Categories</h2>
            <div className={styles.categories}>
                {mainCategories.map(
                    (category, idx) => <CategoryBlock key={category.id} category={{...category, id: (idx+1).toString().padStart(2, '0')}} />
                )}
                <div className={styles.categoryBlock + ' ' + styles.viewAllBlock}>
                    <div className={styles.clean}>
                        <p className={styles.id} style={{ color: 'var(--hover)' }}>VIEW ALL</p>
                        <p className={styles.name} style={{ color: 'var(--dark)' }}>All Categories</p>
                        <button><FaArrowRight size={16} style={{ color: 'var(--dark)' }} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
