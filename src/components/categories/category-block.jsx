import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa"

/**
 * Componente visual para mostrar una categoría individual.
 * Cambia de estilo al enfocar o en móvil.
 * @param {object} props
 * @param {object} props.category - Objeto de categoría a mostrar
 * @returns {JSX.Element}
 */
export default function CategoryBlock({ category }) {
    const solidBgStyle = {
        backgroundColor: `var(--block)`,
        backgroundSize: `cover`,
        backgroundRepeat: `none`
    }
    const imageBgStyle = {
        backgroundImage: `url('${category.imgPath}')`,
        backgroundSize: `cover`,
        backgroundRepeat: `none`
    }
    const [mobile, setMobile] = useState(false)
    const [focused, setFocused] = useState(false)
    const [imgStyle, setImgStyle] = useState(solidBgStyle)
    const [isLightMode, setIsLightMode] = useState(false)

    /**
     * Maneja el evento de mouse enter para aplicar el fondo de imagen.
     */
    function handleMouseEnter() {
        if (!mobile) {
            setImgStyle(imageBgStyle)
        }
        setFocused(true)
    }
    /**
     * Maneja el evento de mouse leave para restaurar el fondo sólido.
     */
    function handleMouseLeave() {
        if (!mobile) {
            setImgStyle(solidBgStyle)
        }
        setFocused(false)
    }
    useEffect(() => {
        if (window.innerWidth <= 540) {
            setMobile(true)
            setImgStyle(imageBgStyle)
        } else {
            setMobile(false)
            setImgStyle(solidBgStyle)
        }
    }, []);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
        setIsLightMode(mediaQuery.matches)
        const handleChange = (e) => setIsLightMode(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, []);

    return (
        <div
            className={`${focused || mobile ? styles.categoryBlockFocused : styles.categoryBlock} ${isLightMode ? styles.light : ''}`}
            style={imgStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="listitem"
            aria-label={`Categoría: ${category.name}`}
        >
            <div className={focused || mobile ? styles.overlay : styles.clean}>
                <p className={styles.id} style={
                    focused || mobile ? { color: "white" } : { color: "var(--darkgrey)" }
                }>{category.id}</p>
                <p className={styles.name} style={
                    focused || mobile ? { color: "white" } : { color: "var(--dark)" }
                }>{category.name}</p>
                <button aria-label={`Ver más de ${category.name}`} tabIndex={0}>
                    <FaArrowRight
                        size={16}
                        style={
                            focused || mobile ? { color: "white" } : { color: "var(--dark)" }
                        }
                    />
                </button>
            </div>
        </div>
    )
}