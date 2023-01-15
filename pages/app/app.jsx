import React, { useState, useEffect } from "react";
import * as api from '../../api';
import io from "socket.io-client";
import {TableWidget, Toolbar} from "../../components/componentsindex";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [currencies, setCurrencies] = useState([]);
    const [symbols, setSymbols] = useState([])
    const [exchanges, setExchanges] = useState([])

    const [lastSave, setLastSave] = useState([])

    const fetchData = async () => {
        const [symbolData, currencyData, exchangeData] = await Promise.all([
            api.getSymbols(),
            api.getCurrencies(),
            api.getExchanges()
        ]);

        const _symbols = await symbolData.json();
        const _currencies = await currencyData.json();
        const _exchanges = await exchangeData.json();

        setSymbols(_symbols.data);
        setCurrencies(_currencies.data);
        setExchanges(_exchanges.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [lastSave]);

    if (isLoading) {
        return (<>
            <p>Loading</p>
        </>);
    }

    return (
        <>
            <Toolbar
                currencies={currencies}
                symbols={symbols}
                exchanges={exchanges}
                setLastSave={setLastSave}
            />
            <TableWidget exchanges={exchanges}/>
        </>
    );
};

export default App;