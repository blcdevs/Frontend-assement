import React from 'react';

//INTERNAL IMPORT 
import styles from './Button.module.css';

const Button = ({btnName, type="button", icon, classStyle}) => {
  return (
    <div className={styles.box}>
        <button className={`${styles.button} ${{classStyle}}`} type={type}>
        {icon} {btnName}
          
        </button>
    </div>
  )
}

export default Button