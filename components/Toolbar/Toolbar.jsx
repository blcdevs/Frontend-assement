import React, { useState, useEffect } from "react";
import styles from './Toolbar.module.css'
import { Button, Title } from "../componentsindex";
import { useForm, Controller } from 'react-hook-form';
import * as api from '../../api';
import io from "socket.io-client";

const Toolbar = ({currencies, symbols, exchanges, setLastSave}) => {
    const [currency, setCurrency] = useState();
    const [symbol, setSymbol] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);


    const {handleSubmit, setValue, control, formState: { errors } } = useForm({
        defaultValues: {
            amount: 0,
            rate: 0,
        }
    });

    const onSubmit = async (data) => {
        await api.saveExchange(data);
        setLastSave(new Date());
        setIsSubmitted("Exchange submitted successfully");
        setTimeout(()=>{ setIsSubmitted(false) },6000)
    };

    const calculateRate = (value) => {
        const exchange = exchanges.find(item => item.currency === currency && item.symbol === symbol && item.exchangeType === "live");
        if(!exchange || !exchange.rate) {
            return;
        }
        const {rate} = exchange;
        const amount = value * rate;
        setValue('rate', amount);
    }
    

    return (
        <div className={styles.toolbar_form_container}>
            <div className={styles.toolbar_form_group}>
                <Title
                    heading="Exchange"
                    />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.toolbar_form_input_group}>
                        <Controller
                            name="symbol"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <label className={styles.label}>Symbol:</label>
                                    <select
                                        className={styles.select}
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value);
                                            setSymbol(value.target.value)
                                        }}
                                    >
                                        <option>Select Symbol</option>
                                        {
                                            symbols.map(
                                                ({label}, index) => (<option key={index} value={label}>{label}</option>)
                                            )
                                        }
                                    </select>
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.toolbar_form_input_group}>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <label className={styles.label}>Amount 1:</label>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            calculateRate(value.target.value)
                                        }}
                                    />
                                </>
                           )}
                        />
                    </div>

                    <div className={styles.toolbar_form_input_group_space_between}>
                        <span>=</span>
                    </div>

                    <div className={styles.toolbar_form_input_group}>
                        <Controller
                            name="currency"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <label className={styles.label}>Currency:</label>
                                    <select
                                        className={styles.select}
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value); setCurrency(value.target.value)
                                        }}
                                    >
                                        <option>Select Currency</option>
                                        {
                                            currencies.map(
                                                ({label}, index) => (<option key={index} value={label}>{label}</option>)
                                            )
                                        }
                                    </select>
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.toolbar_form_input_group}>
                        <Controller
                            name="rate"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <label className={styles.label}>Amount 2:</label>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        {...field}
                                        readOnly
                                    />
                                </>
                            )}
                        />
                    </div>

                    <div className={styles.toolbar_input_button}>
                        <Button btnName="Save" type="submit" classStyles={styles.toolbar_input_btn_style} />
                    </div>
                </form>

                {isSubmitted &&  
                <div className={styles.form_is_success}>
                    <label >
                      {isSubmitted}
                    </label>
                </div>
              }

            </div>

        </div>

        
    );
};

export default Toolbar;
