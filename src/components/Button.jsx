import React from 'react'

import styles from "./Button.module.css"

const Button = ({variant, size, children, onClick}) => {
    return <button onClick={onClick} className={`${styles.button} ${styles[variant]} ${styles[size]}`}>{children}</button>
}

export default Button;
