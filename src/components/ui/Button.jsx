import styles from './Button.module.css'

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    onClick, 
    disabled = false,
    type = 'button',
    className = '',
    ...props 
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button 