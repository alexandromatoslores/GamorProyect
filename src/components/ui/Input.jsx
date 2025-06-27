import { forwardRef } from 'react'
import styles from './Input.module.css'

const Input = forwardRef(({ 
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    disabled = false,
    required = false,
    className = '',
    ...props 
}, ref) => {
    const inputClasses = [
        styles.input,
        error && styles.error,
        disabled && styles.disabled,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                className={inputClasses}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
                required={required}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    )
})

Input.displayName = 'Input'

export default Input 