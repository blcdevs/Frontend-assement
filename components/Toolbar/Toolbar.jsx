import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from './Toolbar.module.css'
import { Button } from "../componentsindex";
import { useForm } from 'react-hook-form';

const Toolbar = () => {
  const [currencies, setCurrencies] = useState([]);
  const [totalData, setTotalData] = useState([])
  const [currencyFrom, setCurrencyFrom] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [currencyToList, setCurrencyToList] = useState([]);
  const [currencyTo, setCurrencyTo] = useState();
  const [amount2, setAmount2] = useState(0);


const {saveForm, handleSubmit, watch, formState: { errors } } = useForm();
const onSubmit = data => console.log(data);


  const fetchExchangeRates = async () => {
    try {
      const {data:{data}}  = await axios.get("http://localhost:3232/exchange-rates");
      setTotalData(data)
      setCurrencies(data?.map(item=> item.symbol));
      setCurrencyToList(data?.map(item=> item.currency));
      console.log('here is exchange rates =>', data)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchExchangeRates();
  }, []);


  const onAmountChange = (e)=>{
    const currentAmount = e.target.value ;
    console.log(currencyFrom,'currenty to =>', currencyTo)
    const exchangeRate = totalData.find(item => item.currency == currencyTo && item.rate);
    if(exchangeRate) {
        setAmount2(currentAmount*exchangeRate.rate)
    } else {
        setAmount2(0)
    }
    console.log('here is exchange rate =>', exchangeRate)

}



  return (
    <div className={styles.toolbar_form_container}>
        <div className={styles.toolbar_form_group}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Currency From:
                    </label>

                    <select className={styles.select} onChange={(e) => setCurrencyFrom(e.target.value)} {...saveForm("currencyFrom")}>
                      <option>select currency</option>
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
                        onChange={(e) => {setAmount1(e.target.value); onAmountChange(e)}}  {...saveForm("setAmount1")}
                    />  
                </div>


                <div className={styles.toolbar_form_input_group_space_between}>
                    <span>=</span>
                </div>


                <div className={styles.toolbar_form_input_group}>
                    <label className={styles.label}>
                    Currency To:
                    </label>
                    <select className={styles.select} onChange={(e) => setCurrencyTo(e.target.value)} {...saveForm("currencyTo")}>
                    <option>select currency</option>
                        {currencyToList.map((currency, index) => (
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
                        onChange={(e) => setAmount2(e.target.value)} {...saveForm("amount2")}
                        disabled
                    />
                </div>

                <div className={styles.toolbar_input_button}>
                <Button
                  btnName="Save"
                  type="submit"
                  classStyles={styles.toolbar_input_btn_style}
                 />
                    </div>
            </form>
        </div>

    </div>
  );
};

export default Toolbar;
