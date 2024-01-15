import React, { createContext, useContext, useEffect, useState, } from 'react';

/**
 * Контекст для работы с общей информацией: адрес.
 *
 */
const GlobalContext = createContext();


export const GlobalContextProvider = ({ children }) => {

    const [address, setAddress] = useState({ id: '1', country: 'Russia', street: 'Street', city: 'city', building: 'building', apartment: '1' });

    return (
        <GlobalContext.Provider value={{ address }}>
            {children}
        </GlobalContext.Provider>
    )

}


export const useGlobal = () => {
    return useContext(GlobalContext);
};