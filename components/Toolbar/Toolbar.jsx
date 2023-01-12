import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from './Toolbar.module.css'
import { Button } from "../componentsindex";
const Toolbar = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [amount1, setAmount1] = useState(0);
  const [currencyTo, setCurrencyTo] = useState("");
  const [amount2, setAmount2] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:3232");
    socket.on("exchange rate", (data) => {
      setCurrencyFrom(data.currencyFrom);
      setAmount1(data.amount1);
      setCurrencyTo(data.currencyTo);
      setAmount2(data.amount2);
    });
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const { data } = await axios.get("http://localhost:3232/exchange-rates");
      setCurrencies(data.currencies);
      setCurrencyFrom(data.currencyFrom);
      setAmount1(data.amount1);
      setCurrencyTo(data.currencyTo);
      setAmount2(data.amount2);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const handleExchange = async () => {
    try {
      const { data } = await axios.post("http://localhost:3232/exchange-rates", {
        currencyFrom,
        amount1,
        currencyTo,
        amount2,
      });
      setCurrencyFrom(data.currencyFrom);
      setAmount1(data.amount1);
      setCurrencyTo(data.currencyTo);
      setAmount2(data.amount2);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.toolbar_form_container}>
        <div className={styles.toolbar_form_group}>
            <form className={styles.form}>
                <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Currency From:
                    </label>
                    <select className={styles.select} onChange={(e) => setCurrencyFrom(e.target.value)}>
                        {currencies.map((currency, index) => (
                        <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Amount 1:
                    </label>
                    <input
                        className={styles.input}
                        type="number"
                        value={amount1}
                        onChange={(e) => setAmount1(e.target.value)}
                    />  
                </div>


                <div className={styles.toolbar_form_input_group_space_between}>
                    <span>=</span>
                </div>


                <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Currency To:
                    </label>
                    <select className={styles.select} onChange={(e) => setCurrencyTo(e.target.value)}>
                        {currencies.map((currency, index) => (
                        <option key={index} value={currency}>{currency}</option>
                        ))}
                    </select>
               </div>
               <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Amount 2:
                    </label>

                    <input
                        className={styles.input}
                        type="number"
                        value={amount2}
                        onChange={(e) => setAmount2(e.target.value)}
                    />
                </div>

                <div className={styles.toolbar_input_button}>
                    <Button
                        btnName="Save"
                        onClick={handleExchange}
                        classStyles={styles.toolbar_input_btn_style}
                    />
                    </div>
                    
                {/* <button className={styles.toolbar_form_button} onClick={handleExchange}>Exchange</button> */}
            </form>
        </div>

    </div>
  );
};

export default Toolbar;
