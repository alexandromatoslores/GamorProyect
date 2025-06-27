import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = 'medium',
    closeOnOverlayClick = true,
    showCloseButton = true 
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleOverlayClick = (e) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose()
        }
    }

    const modalContent = (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={`${styles.modal} ${styles[size]}`}>
                {(title || showCloseButton) && (
                    <div className={styles.header}>
                        {title && <h2 className={styles.title}>{title}</h2>}
                        {showCloseButton && (
                            <button 
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        )}
                    </div>
                )}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

export default Modal 