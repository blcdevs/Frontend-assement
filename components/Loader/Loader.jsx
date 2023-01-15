import React, { useState, useEffect } from 'react';

import Style from "./Loader.module.css"

const Loader = () => {

    const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
   
        <div className={Style.loader_container}>
            <div className={Style.spinner}></div>

    </div> 
  )
}

export default Loader