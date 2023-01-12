import React from 'react';

//INTERNAL IMPORT 
import styles from './Button.module.css';

const Button = ({btnName, handleClick, icon, classStyle}) => {
  return (
    <div className={styles.box}>
        <button className={`${styles.button} ${{classStyle}}`} onClick={() => handleClick()}>
        {icon} {btnName}
          
        </button>
    </div>
  )
}

export default Button